<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center p-4"
      @click.self="$emit('update:open', false)"
    >
      <div
        class="w-full max-w-2xl rounded-2xl border bg-background shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <div class="flex items-center gap-2">
            <Camera class="h-5 w-5 text-primary" />
            <h2 class="text-base font-semibold">Rendu IA depuis la capture</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click="$emit('update:open', false)"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <!-- Input style hint -->
          <div class="flex gap-2">
            <input
              v-model="styleHint"
              type="text"
              placeholder="Style (ex: photoréaliste, aquarelle, crayonné…)"
              class="flex-1 h-9 rounded-lg border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              variant="default"
              :disabled="isSketchLoading || !screenshotDataUrl"
              @click="launchRender"
            >
              <Loader2
                v-if="isSketchLoading"
                class="h-4 w-4 mr-2 animate-spin"
              />
              <Sparkles v-else class="h-4 w-4 mr-2" />
              Générer le rendu
            </Button>
          </div>

          <!-- Erreur -->
          <div
            v-if="sketchError"
            class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle class="h-4 w-4 shrink-0" />
            {{ sketchError }}
          </div>

          <!-- Avant / Après -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Capture (avant) -->
            <div class="flex flex-col gap-2">
              <span
                class="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Capture 3D
              </span>
              <div
                class="aspect-video rounded-lg border bg-muted overflow-hidden"
              >
                <img
                  v-if="screenshotDataUrl"
                  :src="screenshotDataUrl"
                  alt="Capture 3D"
                  class="w-full h-full object-contain"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-xs text-muted-foreground"
                >
                  Aucune capture
                </div>
              </div>
            </div>

            <!-- Rendu IA (après) -->
            <div class="flex flex-col gap-2">
              <span
                class="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Rendu IA
              </span>
              <div
                class="aspect-video rounded-lg border bg-muted overflow-hidden"
              >
                <img
                  v-if="sketchResult"
                  :src="sketchResult"
                  alt="Rendu IA"
                  class="w-full h-full object-contain"
                />
                <div
                  v-else
                  class="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg"
                >
                  <Sparkles class="h-6 w-6 text-muted-foreground/50" />
                  <span class="text-xs text-muted-foreground"
                    >Le rendu apparaîtra ici</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-2 px-6 py-4 border-t">
          <Button variant="ghost" @click="$emit('update:open', false)"
            >Fermer</Button
          >
          <Button v-if="sketchResult" variant="outline" @click="downloadResult">
            <Download class="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  AlertCircle,
  Camera,
  Download,
  Loader2,
  Sparkles,
  X,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  open: boolean
  screenshotDataUrl: string | null
}>()

defineEmits<{
  'update:open': [value: boolean]
}>()

const {
  sketchResult,
  isSketchLoading,
  sketchError,
  generateFromSketch,
  clearSketchResult,
} = useAiRender()

const styleHint = ref('')

// Réinitialiser le résultat à chaque ouverture
watch(
  () => props.open,
  val => {
    if (val) clearSketchResult()
  }
)

const launchRender = async () => {
  if (!props.screenshotDataUrl) return
  await generateFromSketch(
    props.screenshotDataUrl,
    styleHint.value || undefined,
    'screenshot'
  )
}

const downloadResult = () => {
  if (!sketchResult.value) return
  const link = document.createElement('a')
  link.download = 'rendu-capture-ia.png'
  link.href = sketchResult.value
  link.click()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
