<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4 overflow-y-auto"
  >
    <div class="w-full max-w-2xl flex flex-col gap-4 py-16">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold">Génération par prompt</h2>
        <p class="text-sm text-muted-foreground mt-1">
          Décrivez votre architecture et laissez l'IA générer le rendu
        </p>
      </div>

      <!-- Formulaire -->
      <div
        class="rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg p-6 flex flex-col gap-4"
      >
        <!-- Type de sortie -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-muted-foreground shrink-0"
            >Sortie :</span
          >
          <div class="flex gap-2">
            <Button
              :variant="outputType === '2d' ? 'default' : 'outline'"
              size="sm"
              class="rounded-full"
              @click="outputType = '2d'"
            >
              <ImageIcon class="h-4 w-4 mr-1.5" />
              Image 2D
            </Button>
            <Button
              :variant="outputType === '3d' ? 'default' : 'outline'"
              size="sm"
              class="rounded-full"
              @click="outputType = '3d'"
            >
              <Box class="h-4 w-4 mr-1.5" />
              Modèle 3D
            </Button>
          </div>
        </div>

        <!-- Suggestions cliquables -->
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="s in SUGGESTIONS"
            :key="s"
            class="px-2.5 py-1 rounded-full border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:border-primary/30 transition-colors"
            @click="prompt = s"
          >
            {{ s }}
          </button>
        </div>

        <!-- Textarea -->
        <div class="relative">
          <textarea
            v-model="prompt"
            placeholder="Ex: Maison moderne avec toit plat, grandes baies vitrées, style scandinave, vue de façade..."
            class="w-full min-h-[100px] max-h-[160px] resize-none rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            @keydown.ctrl.enter.prevent="generate"
          />
          <span class="absolute bottom-2 right-3 text-xs text-muted-foreground"
            >Ctrl+Entrée</span
          >
        </div>

        <!-- Bouton générer -->
        <Button
          :disabled="!prompt.trim() || isLoading"
          class="w-full"
          @click="generate"
        >
          <Loader2 v-if="isLoading" class="h-4 w-4 mr-2 animate-spin" />
          <Sparkles v-else class="h-4 w-4 mr-2" />
          {{ isLoading ? 'Génération en cours...' : 'Générer' }}
        </Button>
      </div>

      <!-- Résultat -->
      <div
        v-if="result !== null || error"
        class="rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg p-4"
      >
        <div
          v-if="error"
          class="flex items-center gap-2 text-destructive text-sm"
        >
          <AlertCircle class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <div v-else-if="result">
          <img
            :src="result"
            alt="Rendu généré"
            class="w-full rounded-xl object-contain max-h-64"
          />
        </div>
        <div v-else class="text-center text-sm text-muted-foreground py-6">
          <Box class="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p class="font-medium">Rendu en cours de préparation</p>
          <p class="text-xs mt-1 opacity-70">
            Le résultat apparaîtra ici dès que l'IA aura terminé
          </p>
        </div>
      </div>

      <!-- ─── Historique ──────────────────────────────────────────────────── -->
      <div
        v-if="promptHistory.length > 0"
        class="rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg overflow-hidden"
      >
        <!-- En-tête + onglets -->
        <div class="px-4 pt-4 pb-0 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <p
              class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Historique
            </p>
            <!-- Tout effacer -->
            <button
              class="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              @click="confirmClearOpen = true"
            >
              <Trash2 class="h-3 w-3" />
              Tout effacer
            </button>
          </div>

          <!-- Onglets Tous / 2D / 3D -->
          <div class="flex gap-1 border-b border-border">
            <button
              v-for="tab in TABS"
              :key="tab.id"
              :class="[
                'flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors -mb-px',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              ]"
              @click="activeTab = tab.id"
            >
              <component :is="tab.icon" class="h-3.5 w-3.5" />
              {{ tab.label }}
              <span
                :class="[
                  'ml-0.5 rounded-full px-1.5 py-px text-[10px] font-semibold leading-none',
                  activeTab === tab.id
                    ? 'bg-primary/15 text-primary'
                    : 'bg-muted text-muted-foreground',
                ]"
                >{{ tabCount(tab.id) }}</span
              >
            </button>
          </div>
        </div>

        <!-- Liste des entrées -->
        <div
          class="flex flex-col divide-y divide-border max-h-72 overflow-y-auto"
        >
          <div
            v-if="filteredHistory.length === 0"
            class="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground"
          >
            <ImageIcon class="h-7 w-7 opacity-30" />
            <p class="text-xs">Aucune entrée dans cette catégorie</p>
          </div>

          <div
            v-for="entry in filteredHistory"
            :key="entry.createdAt"
            class="group flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer"
            @click="handleLoad(entry)"
          >
            <!-- Miniature -->
            <div
              class="h-10 w-16 rounded-lg border bg-muted shrink-0 overflow-hidden"
            >
              <img
                v-if="entry.imageUrl"
                :src="entry.imageUrl"
                alt="Aperçu"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <ImageIcon class="h-3.5 w-3.5 text-muted-foreground/40" />
              </div>
            </div>

            <!-- Infos -->
            <div class="flex-1 min-w-0 flex flex-col gap-0.5">
              <!-- Badge type + date -->
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none shrink-0"
                  :class="
                    entry.outputType === '2d'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-amber-500/15 text-amber-600'
                  "
                >
                  <component
                    :is="entry.outputType === '2d' ? ImageIcon : Box"
                    class="h-2.5 w-2.5"
                  />
                  {{ entry.outputType === '2d' ? 'Image 2D' : 'Modèle 3D' }}
                </span>
                <span
                  class="text-[10px] text-muted-foreground ml-auto shrink-0"
                >
                  {{ formatDate(entry.createdAt) }}
                </span>
              </div>
              <!-- Prompt -->
              <p class="text-xs text-foreground leading-snug truncate">
                {{ entry.prompt }}
              </p>
            </div>

            <!-- Supprimer (hover) -->
            <button
              class="shrink-0 h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-all"
              title="Supprimer"
              @click.stop="removeHistoryEntry(entry.createdAt)"
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      <!-- ─── Fin Historique ──────────────────────────────────────────────── -->
    </div>
  </div>

  <!-- AlertDialog : confirmation effacement total -->
  <AlertDialog v-model:open="confirmClearOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Effacer tout l'historique ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action supprimera définitivement les
          {{ promptHistory.length }} entrées. Elle est irréversible.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="clearHistory"
        >
          Tout effacer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import {
  AlertCircle,
  Box,
  ImageIcon,
  Loader2,
  Sparkles,
  Trash2,
  X,
} from 'lucide-vue-next'
import type { AiOutputType } from '~/composables/useAiRender'

type HistoryTab = 'all' | AiOutputType

const SUGGESTIONS = [
  'Maison moderne à toit plat',
  'Villa méditerranéenne',
  'Appartement haussmannien',
  'Intérieur minimaliste',
  'Façade industrielle loft',
]

const TABS: { id: HistoryTab; label: string; icon: unknown }[] = [
  { id: 'all', label: 'Tous', icon: Sparkles },
  { id: '2d', label: 'Image 2D', icon: ImageIcon },
  { id: '3d', label: 'Modèle 3D', icon: Box },
]

const activeTab = ref<HistoryTab>('all')
const confirmClearOpen = ref(false)

const {
  prompt,
  outputType,
  isLoading,
  result,
  error,
  promptHistory,
  loadHistory,
  generate,
  loadFromHistory,
  removeHistoryEntry,
  clearHistory,
} = useAiRender()

onMounted(loadHistory)

const filteredHistory = computed(() =>
  activeTab.value === 'all'
    ? promptHistory.value
    : promptHistory.value.filter(e => e.outputType === activeTab.value)
)

const tabCount = (tab: HistoryTab) =>
  tab === 'all'
    ? promptHistory.value.length
    : promptHistory.value.filter(e => e.outputType === tab).length

const formatDate = (ts: number) =>
  new Date(ts).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

const handleLoad = (entry: Parameters<typeof loadFromHistory>[0]) => {
  loadFromHistory(entry)
  // Scroll vers le haut pour voir le résultat rechargé
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
