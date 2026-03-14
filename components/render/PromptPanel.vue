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

      <!-- Historique -->
      <div
        v-if="promptHistory.length > 0"
        class="rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg p-4"
      >
        <div class="flex items-center justify-between mb-2">
          <p
            class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
          >
            Prompts récents
          </p>
          <button
            class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            @click="historyOpen = true"
          >
            <History class="h-3 w-3" />
            Voir tout
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <button
            v-for="entry in promptHistory.slice(0, 5)"
            :key="entry.createdAt"
            class="text-left text-xs px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
            @click="loadFromHistory(entry)"
          >
            <!-- Miniature -->
            <div
              class="h-9 w-14 rounded-md border bg-muted shrink-0 overflow-hidden"
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
                <ImageIcon class="h-3 w-3 text-muted-foreground/40" />
              </div>
            </div>
            <Badge variant="outline" class="text-[10px] px-1.5 py-0 shrink-0">
              {{ entry.outputType.toUpperCase() }}
            </Badge>
            <span class="truncate flex-1">{{ entry.prompt }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <HistoryDialog v-model:open="historyOpen" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  AlertCircle,
  Box,
  History,
  ImageIcon,
  Loader2,
  Sparkles,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const SUGGESTIONS = [
  'Maison moderne à toit plat',
  'Villa méditerranéenne',
  'Appartement haussmannien',
  'Intérieur minimaliste',
  'Façade industrielle loft',
]

const historyOpen = ref(false)

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
} = useAiRender()

onMounted(loadHistory)
</script>
