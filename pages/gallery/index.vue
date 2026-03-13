<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm"
    >
      <div class="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <!-- Bouton retour -->
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 shrink-0"
          @click="navigateTo('/render')"
        >
          <ArrowLeft class="h-4 w-4" />
        </Button>

        <div class="flex items-center gap-2 flex-1 min-w-0">
          <LayoutGrid class="h-5 w-5 text-primary shrink-0" />
          <h1 class="text-base font-semibold truncate">Galerie</h1>
          <Badge variant="secondary" class="shrink-0">{{ totalCount }}</Badge>
        </div>

        <!-- Filtres -->
        <div class="flex items-center gap-1">
          <button
            v-for="f in filters"
            :key="f.value"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              activeFilter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
            ]"
            @click="activeFilter = f.value"
          >
            {{ f.label }}
          </button>
        </div>

        <!-- Tout supprimer -->
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button
              v-if="totalCount > 0"
              variant="ghost"
              size="sm"
              class="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2 class="h-4 w-4 mr-1.5" />
              Tout supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vider la galerie ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera définitivement les
                {{ totalCount }} rendus de la galerie. Elle est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                @click="clearGallery"
              >
                Tout supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
      <!-- État vide -->
      <div
        v-if="filteredEntries.length === 0"
        class="flex flex-col items-center justify-center py-24 gap-4 text-center"
      >
        <div
          class="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center"
        >
          <ImageOff class="h-8 w-8 text-muted-foreground/50" />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">
            {{
              activeFilter === 'all'
                ? 'La galerie est vide'
                : 'Aucun rendu dans cette catégorie'
            }}
          </p>
          <p class="text-xs text-muted-foreground mt-1">
            Générez des rendus depuis le mode
            <button
              class="underline underline-offset-2 hover:text-foreground"
              @click="navigateTo('/render')"
            >
              Croquis 2D, Prompt IA ou 3D Pro
            </button>
          </p>
        </div>
      </div>

      <!-- Grille -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="group relative rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Image -->
          <div class="aspect-video bg-muted overflow-hidden">
            <img
              :src="entry.imageUrl"
              :alt="entry.title || 'Rendu IA'"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <!-- Infos -->
          <div class="p-3 flex flex-col gap-1.5">
            <!-- Badge source + date -->
            <div class="flex items-center justify-between gap-2">
              <span
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  SOURCE_BADGE_CLASSES[entry.source],
                ]"
              >
                {{ SOURCE_LABELS[entry.source] }}
              </span>
              <span class="text-xs text-muted-foreground shrink-0">
                {{ formatDate(entry.createdAt) }}
              </span>
            </div>

            <!-- Prompt / styleHint tronqué -->
            <p
              v-if="entry.prompt || entry.styleHint"
              class="text-xs text-muted-foreground line-clamp-2"
            >
              {{ entry.prompt || entry.styleHint }}
            </p>
          </div>

          <!-- Actions au hover -->
          <div
            class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              class="h-7 w-7 rounded-lg bg-background/90 backdrop-blur-sm border shadow-sm flex items-center justify-center hover:bg-background transition-colors"
              title="Télécharger"
              @click="downloadEntry(entry)"
            >
              <Download class="h-3.5 w-3.5" />
            </button>
            <button
              class="h-7 w-7 rounded-lg bg-background/90 backdrop-blur-sm border shadow-sm flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Supprimer"
              @click="removeEntry(entry.id)"
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import {
  ArrowLeft,
  Download,
  ImageOff,
  LayoutGrid,
  Trash2,
  X,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { GallerySource, GalleryEntry } from '~/composables/useGallery'

definePageMeta({ layout: 'none' })

const { entries, totalCount, load, removeEntry, clearGallery } = useGallery()

onMounted(() => load())

// ─── Filtres ──────────────────────────────────────────────────────────────────
type FilterValue = 'all' | GallerySource

const activeFilter = ref<FilterValue>('all')

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'sketch', label: 'Croquis' },
  { value: 'prompt', label: 'Prompt' },
  { value: 'screenshot', label: 'Capture' },
]

const filteredEntries = computed(() =>
  activeFilter.value === 'all'
    ? entries.value
    : entries.value.filter(e => e.source === activeFilter.value)
)

// ─── Labels & styles ──────────────────────────────────────────────────────────
const SOURCE_LABELS: Record<GallerySource, string> = {
  sketch: 'Croquis',
  prompt: 'Prompt',
  screenshot: 'Capture',
}

const SOURCE_BADGE_CLASSES: Record<GallerySource, string> = {
  sketch: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  prompt: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  screenshot: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
}

// ─── Formatage date ───────────────────────────────────────────────────────────
const formatDate = (ts: number) => {
  const d = new Date(ts)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  })
}

// ─── Téléchargement ───────────────────────────────────────────────────────────
const downloadEntry = (entry: GalleryEntry) => {
  const link = document.createElement('a')
  link.download = `rendu-${entry.source}-${entry.id}.png`
  link.href = entry.imageUrl
  link.click()
}
</script>
