/**
 * useProjects — CRUD projets + scènes Three.js + upload modèles 3D.
 *
 * Architecture :
 *  - `projects` : liste paginée (galerie)
 *  - `currentProject` : projet ouvert dans l'éditeur /render
 *  - `serializeSceneState` / `restoreSceneState` : marshalling de l'état
 *    Three.js entre les composables useThree* et le JSONField backend
 *  - `uploadModelToCurrentProject` : pipeline presigned MinIO complet
 */
import { computed, ref } from 'vue'

// ─── Types publics (camelCase) ────────────────────────────────────────────
export interface Project {
  id: number
  title: string
  description: string
  thumbnailUrl: string | null
  isArchived: boolean
  modelsCount: number
  createdAt: string
  updatedAt: string
}

export interface ImportedModelDto {
  id: number
  name: string
  format: 'glb' | 'gltf' | 'obj' | 'fbx' | 'stl'
  fileUrl: string | null
  mtlFileUrl: string | null
  fileSizeBytes: number
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  createdAt: string
}

export interface AnnotationDto {
  id: number
  type: 'note' | 'measure' | 'marker'
  position: { x: number; y: number; z: number }
  content: string
  color: string
  createdAt: string
  updatedAt: string
}

export interface SceneState {
  /** Position de la caméra (orbit/first-person) */
  camera?: {
    position: [number, number, number]
    target: [number, number, number]
  }
  /** Preset d'éclairage utilisé */
  lighting?: { preset?: string; intensity?: number }
  /** Météo simulée */
  weather?: string
  /** Mode de navigation actif */
  navigation?: 'orbit' | 'first_person' | 'top_down' | 'tour'
  /** Champ libre pour les extensions futures */
  [k: string]: unknown
}

export interface ProjectDetail extends Project {
  scene: { data: SceneState; version: number; updatedAt: string }
  importedModels: ImportedModelDto[]
  annotations: AnnotationDto[]
}

// ─── DTOs backend (snake_case) ────────────────────────────────────────────
interface ApiProject {
  id: number
  title: string
  description: string
  thumbnail_url: string | null
  is_archived: boolean
  models_count: number
  created_at: string
  updated_at: string
}

interface ApiProjectDetail extends ApiProject {
  scene: { data: SceneState; version: number; updated_at: string }
  imported_models: Array<{
    id: number
    name: string
    format: ImportedModelDto['format']
    file_url: string | null
    mtl_file_url: string | null
    file_size_bytes: number
    position: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
    scale: { x: number; y: number; z: number }
    created_at: string
  }>
  annotations: Array<{
    id: number
    type: AnnotationDto['type']
    position: { x: number; y: number; z: number }
    content: string
    color: string
    created_at: string
    updated_at: string
  }>
}

interface ApiPaginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

interface PresignedUploadResponse {
  upload_url: string
  key: string
  expires_in: number
  method: 'PUT'
  headers: Record<string, string>
}

// ─── Mappers ──────────────────────────────────────────────────────────────
function toProject(a: ApiProject): Project {
  return {
    id: a.id,
    title: a.title,
    description: a.description,
    thumbnailUrl: a.thumbnail_url,
    isArchived: a.is_archived,
    modelsCount: a.models_count,
    createdAt: a.created_at,
    updatedAt: a.updated_at,
  }
}

function toProjectDetail(a: ApiProjectDetail): ProjectDetail {
  return {
    ...toProject(a),
    scene: {
      data: a.scene.data || {},
      version: a.scene.version,
      updatedAt: a.scene.updated_at,
    },
    importedModels: a.imported_models.map(m => ({
      id: m.id,
      name: m.name,
      format: m.format,
      fileUrl: m.file_url,
      mtlFileUrl: m.mtl_file_url,
      fileSizeBytes: m.file_size_bytes,
      position: m.position,
      rotation: m.rotation,
      scale: m.scale,
      createdAt: m.created_at,
    })),
    annotations: a.annotations.map(an => ({
      id: an.id,
      type: an.type,
      position: an.position,
      content: an.content,
      color: an.color,
      createdAt: an.created_at,
      updatedAt: an.updated_at,
    })),
  }
}

// ─── État singleton ───────────────────────────────────────────────────────
const projects = ref<Project[]>([])
const totalCount = ref(0)
const isLoading = ref(false)
const currentProject = ref<ProjectDetail | null>(null)
const isSaving = ref(false)

const PAGE_SIZE = 12

// ─── Composable ───────────────────────────────────────────────────────────
export function useProjects() {
  const api = useApi()

  const hasMore = computed(() => projects.value.length < totalCount.value)
  const hasCurrentProject = computed(() => currentProject.value !== null)

  // ─── Listing ────────────────────────────────────────────────────────────
  async function load(): Promise<void> {
    isLoading.value = true
    try {
      const data = await api<ApiPaginated<ApiProject>>(
        `/projects/?page=1&page_size=${PAGE_SIZE}`
      )
      projects.value = data.results.map(toProject)
      totalCount.value = data.count
    } finally {
      isLoading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!hasMore.value || isLoading.value) return
    isLoading.value = true
    try {
      const nextPage = Math.floor(projects.value.length / PAGE_SIZE) + 1
      const data = await api<ApiPaginated<ApiProject>>(
        `/projects/?page=${nextPage}&page_size=${PAGE_SIZE}`
      )
      projects.value.push(...data.results.map(toProject))
      totalCount.value = data.count
    } finally {
      isLoading.value = false
    }
  }

  // ─── CRUD ───────────────────────────────────────────────────────────────
  async function create(title: string, description = ''): Promise<ProjectDetail> {
    const data = await api<ApiProjectDetail>('/projects/', {
      method: 'POST',
      body: { title, description },
    })
    const project = toProjectDetail(data)
    projects.value.unshift(toProject(data))
    totalCount.value += 1
    return project
  }

  async function get(id: number): Promise<ProjectDetail> {
    const data = await api<ApiProjectDetail>(`/projects/${id}`)
    return toProjectDetail(data)
  }

  async function update(
    id: number,
    fields: { title?: string; description?: string; isArchived?: boolean }
  ): Promise<void> {
    const body: Record<string, unknown> = {}
    if (fields.title !== undefined) body.title = fields.title
    if (fields.description !== undefined) body.description = fields.description
    if (fields.isArchived !== undefined) body.is_archived = fields.isArchived

    await api(`/projects/${id}`, { method: 'PATCH', body })

    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      projects.value[idx] = { ...projects.value[idx], ...fields }
    }
    if (currentProject.value?.id === id) {
      currentProject.value = { ...currentProject.value, ...fields }
    }
  }

  async function remove(id: number): Promise<void> {
    await api(`/projects/${id}`, { method: 'DELETE' })
    projects.value = projects.value.filter(p => p.id !== id)
    totalCount.value = Math.max(0, totalCount.value - 1)
    if (currentProject.value?.id === id) currentProject.value = null
  }

  async function duplicate(id: number, copyAssets = false): Promise<ProjectDetail> {
    const data = await api<ApiProjectDetail>(
      `/projects/${id}/duplicate${copyAssets ? '?copy_assets=true' : ''}`,
      { method: 'POST' }
    )
    const project = toProjectDetail(data)
    projects.value.unshift(toProject(data))
    totalCount.value += 1
    return project
  }

  // ─── Current project (mode éditeur) ─────────────────────────────────────
  async function openProject(id: number): Promise<ProjectDetail> {
    const project = await get(id)
    currentProject.value = project
    return project
  }

  function closeCurrentProject(): void {
    currentProject.value = null
  }

  // ─── Sauvegarde scène ───────────────────────────────────────────────────
  async function saveSceneState(state: SceneState): Promise<void> {
    if (!currentProject.value) {
      throw new Error("Aucun projet ouvert. Crée d'abord un projet.")
    }
    isSaving.value = true
    try {
      const data = await api<{
        data: SceneState
        version: number
        updated_at: string
      }>(`/projects/${currentProject.value.id}/scene`, {
        method: 'PUT',
        body: { data: state },
      })
      currentProject.value.scene = {
        data: data.data,
        version: data.version,
        updatedAt: data.updated_at,
      }
    } finally {
      isSaving.value = false
    }
  }

  // ─── Upload modèle 3D (presigned MinIO) ─────────────────────────────────
  async function uploadModelToCurrentProject(
    name: string,
    file: File,
    mtlFile?: File
  ): Promise<ImportedModelDto> {
    if (!currentProject.value) {
      throw new Error("Aucun projet ouvert pour enregistrer ce modèle.")
    }
    const projectId = currentProject.value.id

    // 1. Upload du fichier principal
    const fileKey = await _uploadOne(projectId, file)

    // 2. Upload du MTL (optionnel, pour OBJ)
    let mtlKey: string | undefined
    if (mtlFile) {
      mtlKey = await _uploadOne(projectId, mtlFile)
    }

    // 3. Confirme côté backend → crée l'ImportedModel
    const confirmed = await api<ApiProjectDetail['imported_models'][number]>(
      `/projects/${projectId}/models/confirm`,
      {
        method: 'POST',
        body: { name, key: fileKey, mtl_key: mtlKey || '' },
      }
    )

    const dto: ImportedModelDto = {
      id: confirmed.id,
      name: confirmed.name,
      format: confirmed.format,
      fileUrl: confirmed.file_url,
      mtlFileUrl: confirmed.mtl_file_url,
      fileSizeBytes: confirmed.file_size_bytes,
      position: confirmed.position,
      rotation: confirmed.rotation,
      scale: confirmed.scale,
      createdAt: confirmed.created_at,
    }
    currentProject.value.importedModels.push(dto)
    return dto
  }

  async function _uploadOne(projectId: number, file: File): Promise<string> {
    // a. Demande une presigned URL
    const presigned = await api<PresignedUploadResponse>(
      `/projects/${projectId}/models/upload-url`,
      {
        method: 'POST',
        body: {
          name: file.name,
          file_name: file.name,
          file_size_bytes: file.size,
          content_type: file.type || 'application/octet-stream',
        },
      }
    )

    // b. PUT direct vers MinIO (pas via Django)
    const putResp = await fetch(presigned.upload_url, {
      method: 'PUT',
      headers: presigned.headers,
      body: file,
    })
    if (!putResp.ok) {
      throw new Error(
        `Upload MinIO échoué (${putResp.status}) — vérif clé/quotas`
      )
    }

    return presigned.key
  }

  /** Met à jour la transform (position/rotation/scale) d'un modèle existant. */
  async function updateImportedModelTransform(
    modelId: number,
    transform: {
      position?: { x: number; y: number; z: number }
      rotation?: { x: number; y: number; z: number }
      scale?: { x: number; y: number; z: number }
    }
  ): Promise<void> {
    if (!currentProject.value) return
    await api(`/projects/${currentProject.value.id}/models/${modelId}`, {
      method: 'PATCH',
      body: transform,
    })
  }

  async function deleteImportedModel(modelId: number): Promise<void> {
    if (!currentProject.value) return
    await api(`/projects/${currentProject.value.id}/models/${modelId}`, {
      method: 'DELETE',
    })
    currentProject.value.importedModels =
      currentProject.value.importedModels.filter(m => m.id !== modelId)
  }

  // ─── Annotations ────────────────────────────────────────────────────────
  async function addAnnotation(payload: {
    type: AnnotationDto['type']
    position: { x: number; y: number; z: number }
    content?: string
    color?: string
  }): Promise<AnnotationDto> {
    if (!currentProject.value)
      throw new Error("Aucun projet ouvert pour cette annotation.")
    const data = await api<ApiProjectDetail['annotations'][number]>(
      `/projects/${currentProject.value.id}/annotations`,
      {
        method: 'POST',
        body: {
          type: payload.type,
          position: payload.position,
          content: payload.content || '',
          color: payload.color || '',
        },
      }
    )
    const dto: AnnotationDto = {
      id: data.id,
      type: data.type,
      position: data.position,
      content: data.content,
      color: data.color,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
    currentProject.value.annotations.push(dto)
    return dto
  }

  async function deleteAnnotation(annotationId: number): Promise<void> {
    if (!currentProject.value) return
    await api(
      `/projects/${currentProject.value.id}/annotations/${annotationId}`,
      { method: 'DELETE' }
    )
    currentProject.value.annotations =
      currentProject.value.annotations.filter(a => a.id !== annotationId)
  }

  // ─── Partage ────────────────────────────────────────────────────────────
  async function createShareLink(
    projectId: number,
    permission: 'view' = 'view',
    expiresAt?: string
  ): Promise<{ shareUrl: string; token: string }> {
    const data = await api<{
      id: number
      token: string
      share_url: string
      permission: string
      expires_at: string | null
      last_used_at: string | null
      created_at: string
      is_expired: boolean
    }>(`/projects/${projectId}/share`, {
      method: 'POST',
      body: { permission, expires_at: expiresAt },
    })
    return { shareUrl: data.share_url, token: data.token }
  }

  return {
    // état
    projects,
    totalCount,
    isLoading,
    hasMore,
    currentProject,
    hasCurrentProject,
    isSaving,
    // CRUD
    load,
    loadMore,
    create,
    get,
    update,
    remove,
    duplicate,
    // current project
    openProject,
    closeCurrentProject,
    // scene
    saveSceneState,
    // modèles 3D
    uploadModelToCurrentProject,
    updateImportedModelTransform,
    deleteImportedModel,
    // annotations
    addAnnotation,
    deleteAnnotation,
    // partage
    createShareLink,
  }
}
