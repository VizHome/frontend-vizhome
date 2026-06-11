<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
    <!-- Header de page (layout `app` fournit déjà le topbar avec retour + avatar) -->
    <section class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <FolderOpen class="h-5 w-5 text-primary shrink-0" />
        <h1 class="text-xl font-semibold tracking-tight">Mes projets</h1>
        <Badge variant="secondary" class="shrink-0">{{ totalCount }}</Badge>
      </div>
      <Button size="sm" class="gap-1.5 rounded-full" @click="openCreateDialog">
        <Plus class="h-3.5 w-3.5" />
        Nouveau projet
      </Button>
    </section>

    <main class="flex flex-col gap-6">
      <!-- Spinner initial -->
      <div
        v-if="isLoading && projects.length === 0"
        class="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground"
      >
        <div
          class="h-8 w-8 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
        <span class="text-sm">Chargement…</span>
      </div>

      <!-- État vide -->
      <div
        v-else-if="projects.length === 0"
        class="flex flex-col items-center justify-center py-24 gap-4 text-center"
      >
        <div
          class="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center"
        >
          <FolderPlus class="h-8 w-8 text-muted-foreground/50" />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">Aucun projet pour l'instant</p>
          <p class="text-xs text-muted-foreground mt-1">
            Crée ton premier projet pour sauvegarder ta scène 3D.
          </p>
        </div>
        <Button class="gap-1.5" @click="openCreateDialog">
          <Plus class="h-4 w-4" />
          Créer mon premier projet
        </Button>
      </div>

      <!-- Grille -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group relative rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Thumbnail (capture canvas du dernier save). Si absent, juste
               un dégradé subtil sans icône pour laisser la respiration visuelle. -->
          <div
            class="aspect-video overflow-hidden cursor-pointer"
            :class="project.thumbnailUrl
              ? 'bg-muted'
              : 'bg-gradient-to-br from-primary/5 via-muted/30 to-muted/10'"
            @click="openProject(project.id)"
          >
            <img
              v-if="project.thumbnailUrl"
              :src="project.thumbnailUrl"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <!-- Infos -->
          <div class="p-3 flex flex-col gap-1">
            <div class="flex items-start justify-between gap-2">
              <h3
                class="text-sm font-semibold truncate cursor-pointer hover:text-primary transition-colors"
                @click="openProject(project.id)"
              >
                {{ project.title }}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-7 w-7 shrink-0">
                    <MoreVertical class="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openProject(project.id)">
                    <Pencil class="h-3.5 w-3.5 mr-2" /> Éditer
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="onDuplicate(project.id, false)">
                    <Copy class="h-3.5 w-3.5 mr-2" /> Dupliquer (sans modèles)
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="onDuplicate(project.id, true)">
                    <CopyPlus class="h-3.5 w-3.5 mr-2" />
                    Dupliquer (avec modèles)
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="onShare(project.id)">
                    <Share2 class="h-3.5 w-3.5 mr-2" /> Partager
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="text-destructive"
                    @click="askDelete(project)"
                  >
                    <Trash2 class="h-3.5 w-3.5 mr-2" /> Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p
              v-if="project.description"
              class="text-xs text-muted-foreground line-clamp-2"
            >
              {{ project.description }}
            </p>

            <div class="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
              <span class="inline-flex items-center gap-1">
                <Box class="h-3 w-3" />
                {{ project.modelsCount }}
                {{ project.modelsCount > 1 ? 'modèles' : 'modèle' }}
              </span>
              <time>{{ formatDate(project.updatedAt) }}</time>
            </div>
          </div>
        </div>
      </div>

      <!-- Charger plus -->
      <div v-if="hasMore" class="flex justify-center mt-8">
        <Button variant="outline" :disabled="isLoading" @click="loadMore">
          <span v-if="isLoading">Chargement…</span>
          <span v-else
            >Charger plus ({{ totalCount - projects.length }} restants)</span
          >
        </Button>
      </div>
    </main>

    <!-- Dialog création -->
    <Dialog v-model:open="createDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau projet</DialogTitle>
          <DialogDescription>
            Donne un titre et une description à ton projet.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-3 py-2">
          <div class="space-y-1.5">
            <Label for="proj-title">Titre</Label>
            <Input
              id="proj-title"
              v-model="newProjectTitle"
              placeholder="Ex : Salon moderne"
              maxlength="200"
              autofocus
              @keydown.enter="submitCreate"
            />
          </div>
          <div class="space-y-1.5">
            <Label for="proj-desc">Description (optionnel)</Label>
            <textarea
              id="proj-desc"
              v-model="newProjectDescription"
              class="w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Quelques mots sur ce projet…"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" @click="createDialogOpen = false">Annuler</Button>
          <Button :disabled="!newProjectTitle.trim() || isCreating" @click="submitCreate">
            {{ isCreating ? 'Création…' : 'Créer et ouvrir' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Confirmation suppression -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer le projet « {{ projectToDelete?.title }} » ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action supprime définitivement le projet, sa scène, ses
            annotations et tous les modèles 3D associés. Elle est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            @click="confirmDelete"
          >
            Supprimer définitivement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Box,
  Copy,
  CopyPlus,
  FolderOpen,
  FolderPlus,
  MoreVertical,
  Pencil,
  Plus,
  Share2,
  Trash2,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import type { Project } from '~/composables/useProjects'

definePageMeta({ layout: 'app', middleware: 'auth' })

const {
  projects,
  totalCount,
  isLoading,
  hasMore,
  load,
  loadMore,
  create,
  remove,
  duplicate,
  createShareLink,
} = useProjects()

onMounted(() => load())

// ─── Create ──────────────────────────────────────────────────────────────
const createDialogOpen = ref(false)
const newProjectTitle = ref('')
const newProjectDescription = ref('')
const isCreating = ref(false)

function openCreateDialog() {
  newProjectTitle.value = ''
  newProjectDescription.value = ''
  createDialogOpen.value = true
}

async function submitCreate() {
  if (!newProjectTitle.value.trim()) return
  isCreating.value = true
  try {
    const project = await create(
      newProjectTitle.value.trim(),
      newProjectDescription.value.trim()
    )
    createDialogOpen.value = false
    toast.success(`Projet « ${project.title} » créé.`)
    await navigateTo(`/render?project=${project.id}`)
  } catch {
    toast.error('Impossible de créer le projet.')
  } finally {
    isCreating.value = false
  }
}

// ─── Open ────────────────────────────────────────────────────────────────
async function openProject(id: number) {
  await navigateTo(`/render?project=${id}`)
}

// ─── Duplicate ───────────────────────────────────────────────────────────
async function onDuplicate(id: number, copyAssets: boolean) {
  try {
    const project = await duplicate(id, copyAssets)
    toast.success(
      copyAssets
        ? `Projet dupliqué avec ses modèles (« ${project.title} »).`
        : `Projet dupliqué (« ${project.title} »).`
    )
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    if (err?.data?.code === 'storage_exceeded') {
      toast.error('Quota storage insuffisant pour copier les modèles.')
    } else {
      toast.error("Impossible de dupliquer le projet.")
    }
  }
}

// ─── Share ───────────────────────────────────────────────────────────────
async function onShare(id: number) {
  try {
    const { shareUrl } = await createShareLink(id)
    await navigator.clipboard.writeText(shareUrl)
    toast.success('Lien de partage copié dans le presse-papier.')
  } catch {
    toast.error('Impossible de créer le lien de partage.')
  }
}

// ─── Delete ──────────────────────────────────────────────────────────────
const deleteDialogOpen = ref(false)
const projectToDelete = ref<Project | null>(null)

function askDelete(project: Project) {
  projectToDelete.value = project
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  if (!projectToDelete.value) return
  try {
    await remove(projectToDelete.value.id)
    toast.success('Projet supprimé.')
  } catch {
    toast.error('Impossible de supprimer le projet.')
  } finally {
    deleteDialogOpen.value = false
    projectToDelete.value = null
  }
}

// ─── Formatage date ──────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
  if (diffDays === 0) return "aujourd'hui"
  if (diffDays === 1) return 'hier'
  if (diffDays < 7) return `il y a ${diffDays} j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

useSeo({
  title: 'Mes projets',
  description:
    'Gerez vos projets 3D : scenes sauvegardees, modeles importes et rendus associes.',
})
</script>
