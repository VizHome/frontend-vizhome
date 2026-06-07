<template>
  <!--
    Positionné en haut à GAUCHE pour ne pas collisionner avec le
    RenderModeBar (qui occupe top-4 left-1/2 -translate-x-1/2 z-50).
    z-40 ⇒ au-dessus du canvas Three.js mais sous les overlays modaux.

    Stratégie d'affichage :
    - Bouton "Projets" toujours visible (entrée vers la galerie)
    - Bandeau "nom du projet" seulement si un projet est ouvert
    - Bouton "Sauvegarder" seulement s'il y a du contenu à sauver
      (modèles dans la scène OU projet ouvert) → évite le bouton fantôme
      sur une scène vide
  -->
  <div class="absolute top-4 left-4 z-40 flex items-center gap-2">
    <!-- Bouton retour à la galerie projets — toujours visible -->
    <Button
      variant="outline"
      size="sm"
      class="gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm"
      @click="navigateTo('/projects')"
    >
      <FolderOpen class="h-3.5 w-3.5" />
      <span class="text-xs">Projets</span>
    </Button>

    <!-- Bandeau projet ouvert — affiché seulement si projet courant -->
    <div
      v-if="currentProject"
      class="flex items-center gap-2 rounded-md border bg-background/90 backdrop-blur-sm px-3 py-1.5 shadow-sm"
    >
      <Box class="h-3.5 w-3.5 shrink-0 text-primary" />
      <span class="text-xs font-medium truncate max-w-[200px]">
        {{ currentProject.title }}
      </span>
      <span
        v-if="isSaving"
        class="text-[10px] text-muted-foreground flex items-center gap-1"
      >
        <div
          class="h-2 w-2 rounded-full border border-current border-t-transparent animate-spin"
        />
        Sauvegarde…
      </span>
    </div>

    <!-- Bouton Save — seulement s'il y a du contenu (modèles ou projet ouvert) -->
    <Button
      v-if="hasContent"
      size="sm"
      class="gap-1.5 shadow-sm"
      :disabled="isSaving"
      @click="emit('save')"
    >
      <Save class="h-3.5 w-3.5" />
      <span class="text-xs">
        {{ currentProject ? 'Sauvegarder' : 'Sauvegarder comme…' }}
      </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Box, FolderOpen, Save } from 'lucide-vue-next'
import { computed } from 'vue'

const emit = defineEmits<{ save: [] }>()

const { currentProject, isSaving } = useProjects()
const { importedModels } = useThreeModels()

// Affiche le bouton "Sauvegarder" seulement quand il y a du contenu à sauver
const hasContent = computed(
  () => !!currentProject.value || importedModels.value.length > 0,
)
</script>
