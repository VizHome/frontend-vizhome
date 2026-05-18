<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {{
            currentProject ? 'Sauvegarder le projet' : 'Créer un nouveau projet'
          }}
        </DialogTitle>
        <DialogDescription>
          {{
            currentProject
              ? `Cette action mettra à jour la scène de « ${currentProject.title} ».`
              : 'Donne un titre à ton projet pour le sauvegarder.'
          }}
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-3 py-2">
        <div v-if="!currentProject" class="space-y-1.5">
          <Label for="save-title">Titre</Label>
          <Input
            id="save-title"
            v-model="title"
            placeholder="Mon projet"
            maxlength="200"
            autofocus
            @keydown.enter="submit"
          />
        </div>
        <div v-if="!currentProject" class="space-y-1.5">
          <Label for="save-desc">Description (optionnel)</Label>
          <textarea
            id="save-desc"
            v-model="description"
            class="w-full min-h-[60px] rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Quelques mots sur ce projet…"
          />
        </div>

        <div
          v-if="currentProject"
          class="rounded-md bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground"
        >
          <p class="font-medium text-foreground mb-1">
            État sauvegardé :
          </p>
          <ul class="space-y-0.5">
            <li>• Position caméra + cible</li>
            <li>• Éclairage et météo</li>
            <li>• Mode de navigation</li>
            <li>• Transform des {{ currentProject.importedModels.length }} modèle(s)</li>
          </ul>
        </div>

        <div
          v-if="error"
          class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-xs text-destructive"
        >
          {{ error }}
        </div>
      </div>

      <DialogFooter>
        <Button variant="ghost" @click="open = false">Annuler</Button>
        <Button
          :disabled="isSubmitting || (!currentProject && !title.trim())"
          @click="submit"
        >
          <Save class="h-4 w-4 mr-1.5" />
          {{ isSubmitting ? '…' : currentProject ? 'Sauvegarder' : 'Créer et sauvegarder' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Save } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const open = defineModel<boolean>('open', { default: false })

const projects = useProjects()
const { serialize } = useSceneSerializer()

const title = ref('')
const description = ref('')
const isSubmitting = ref(false)
const error = ref('')

const currentProject = projects.currentProject

// Reset les champs à l'ouverture
watch(open, val => {
  if (val) {
    title.value = ''
    description.value = ''
    error.value = ''
  }
})

async function submit() {
  error.value = ''
  isSubmitting.value = true
  try {
    const isFirstSave = !currentProject.value

    // 1. Si pas de projet courant, on en crée un nouveau
    if (isFirstSave) {
      if (!title.value.trim()) {
        error.value = 'Le titre est requis.'
        return
      }
      const project = await projects.create(
        title.value.trim(),
        description.value.trim()
      )
      await projects.openProject(project.id)
    }

    // 2. Premier save → upload tous les modèles importés en mémoire
    //    (ils n'avaient pas de projet de rattachement jusqu'ici)
    if (isFirstSave) {
      const { syncAllUnsynced } = useThreeModels()
      const result = await syncAllUnsynced()
      if (result.synced > 0) {
        toast.info(`${result.synced} modèle(s) 3D uploadés vers le projet.`)
      }
      if (result.failed > 0) {
        toast.warning(`${result.failed} modèle(s) n'ont pas pu être uploadés.`)
      }
    }

    // 3. Sauvegarde la scène (caméra, lumières, météo, transforms…)
    const state = serialize()
    await projects.saveSceneState(state)

    toast.success('Projet sauvegardé.')
    open.value = false
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    error.value = err?.data?.detail || 'Erreur lors de la sauvegarde.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
