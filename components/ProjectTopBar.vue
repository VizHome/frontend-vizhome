<template>
  <div class="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
    <!-- Bouton retour à la galerie projets -->
    <Button
      variant="outline"
      size="sm"
      class="gap-1.5 bg-background/90 backdrop-blur-sm shadow-sm"
      @click="navigateTo('/projects')"
    >
      <FolderOpen class="h-3.5 w-3.5" />
      <span class="text-xs">Projets</span>
    </Button>

    <!-- Nom du projet ouvert (si applicable) -->
    <div
      v-if="currentProject"
      class="flex items-center gap-2 rounded-md border bg-background/90 backdrop-blur-sm px-3 py-1.5 shadow-sm"
    >
      <Box class="h-3.5 w-3.5 text-primary" />
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

    <!-- Bouton Save -->
    <Button
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

const emit = defineEmits<{ save: [] }>()

const { currentProject, isSaving } = useProjects()
</script>
