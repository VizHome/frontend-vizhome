<script setup lang="ts">
import { Box, Play, Pause, X, Upload } from 'lucide-vue-next'
import { computed } from 'vue'

// ─── Composables ─────────────────────────────────────────────────────────────
const {
  navMode,
  setNavMode,
  isFirstPerson,
  isTopDown,
  isTourActive,
  isPlaying,
  tourProgress,
  togglePlayPause,
} = useThreeNavigation()

const { importedModels, importModel, isLoadingModel } = useThreeModels()

// ─── Computed ─────────────────────────────────────────────────────────────────
/** Affiche l'overlay "cliquez pour activer" first-person */
const showFpHint = computed(
  () => navMode.value === 'firstperson' && !isFirstPerson.value
)

/** Affiche l'indicateur "mode marche actif" */
const showFpActive = computed(
  () => navMode.value === 'firstperson' && isFirstPerson.value
)

/** Affiche la pill tour */
const showTour = computed(() => isTourActive.value)

/** Affiche la pill top-down */
const showTopDown = computed(
  () => navMode.value === 'topdown' && isTopDown.value
)

/** Affiche l'état vide (aucun modèle, mode orbite) */
const showEmptyState = computed(
  () => importedModels.value.length === 0 && navMode.value === 'orbit'
)

/** Progression tour en % pour la barre */
const tourPercent = computed(() => Math.round(tourProgress.value * 100))
</script>

<template>
  <!-- ── Conteneur overlays (couvre le canvas sans bloquer les clics par défaut) ── -->
  <div class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
    <!-- ── État vide : aucun modèle chargé ───────────────────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="showEmptyState"
        class="pointer-events-auto absolute inset-0 flex items-center justify-center"
      >
        <div
          class="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-black/30 px-12 py-10 text-center backdrop-blur-md shadow-2xl"
        >
          <!-- Icône -->
          <div
            class="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <Box class="h-8 w-8 text-white/50" />
          </div>
          <!-- Texte -->
          <div class="space-y-1.5">
            <p class="text-base font-semibold text-white/80">
              Aucun modèle dans la scène
            </p>
            <p class="text-sm text-white/40">
              GLB &middot; GLTF &middot; OBJ+MTL &middot; FBX &middot; STL
            </p>
          </div>
          <!-- Bouton -->
          <button
            class="flex items-center gap-2 rounded-xl bg-white text-black px-5 py-2.5 text-sm font-semibold transition hover:bg-white/90 active:scale-95 disabled:opacity-50 shadow-lg"
            :disabled="isLoadingModel"
            @click="importModel"
          >
            <Upload class="h-4 w-4" />
            {{ isLoadingModel ? 'Chargement…' : 'Importer un modèle 3D' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- ── First-person : overlay "cliquez pour activer" ─────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="showFpHint"
        class="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/50"
        @click="setNavMode('firstperson')"
      >
        <div
          class="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-black/60 px-10 py-8 text-center backdrop-blur-md"
        >
          <!-- Titre -->
          <p class="text-lg font-semibold text-white">Mode marche à pied</p>
          <p class="text-sm text-white/50">
            Cliquez pour capturer le curseur et commencer
          </p>

          <!-- Grille WASD visuelle -->
          <div class="flex flex-col items-center gap-1 select-none">
            <!-- W -->
            <div class="flex gap-1">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-bold text-white/80"
              >
                W
              </div>
            </div>
            <!-- A S D -->
            <div class="flex gap-1">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-bold text-white/80"
              >
                A
              </div>
              <div
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-bold text-white/80"
              >
                S
              </div>
              <div
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-bold text-white/80"
              >
                D
              </div>
            </div>
          </div>

          <!-- Hints supplémentaires -->
          <div class="flex flex-col gap-1 text-xs text-white/40">
            <span
              ><span
                class="font-mono rounded bg-white/10 px-1.5 py-0.5 text-white/60"
                >Espace</span
              >
              &nbsp;Monter</span
            >
            <span
              ><span
                class="font-mono rounded bg-white/10 px-1.5 py-0.5 text-white/60"
                >Shift</span
              >
              &nbsp;Descendre</span
            >
            <span
              ><span
                class="font-mono rounded bg-white/10 px-1.5 py-0.5 text-white/60"
                >ESC</span
              >
              &nbsp;Quitter le mode</span
            >
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── First-person : badge "mode actif" ─────────────────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="showFpActive"
        class="absolute top-16 left-1/2 -translate-x-1/2"
      >
        <div
          class="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm"
        >
          Mode marche &middot;
          <kbd class="font-mono text-white/80">ESC</kbd> pour quitter
        </div>
      </div>
    </Transition>

    <!-- ── Tour : barre de contrôle ───────────────────────────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="showTour"
        class="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div
          class="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md"
        >
          <!-- Icône caméra -->
          <span class="text-base leading-none">🎬</span>

          <!-- Play / Pause -->
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 active:scale-95"
            :title="isPlaying ? 'Pause' : 'Lecture'"
            @click="togglePlayPause"
          >
            <Pause v-if="isPlaying" class="h-3.5 w-3.5" />
            <Play v-else class="h-3.5 w-3.5" />
          </button>

          <!-- Barre de progression -->
          <div
            class="relative h-1.5 w-32 overflow-hidden rounded-full bg-white/10"
          >
            <div
              class="h-full rounded-full bg-white/50 transition-all duration-300"
              :style="{ width: `${tourPercent}%` }"
            />
          </div>
          <span class="text-xs tabular-nums text-white/40"
            >{{ tourPercent }}%</span
          >

          <!-- Arrêter la visite -->
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/50 transition hover:bg-red-500/30 hover:text-white active:scale-95"
            title="Arrêter la visite"
            @click="setNavMode('orbit')"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- ── Top-down : pill informatif (non cliquable) ─────────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="showTopDown"
        class="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div
          class="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs text-white/50 backdrop-blur-sm"
        >
          🗺️ Vue plan &middot; Glisser &middot; Molette pour zoomer
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Transition overlay : fondu + légère montée */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
/* Pour les overlays "plein écran" (fp-hint, empty state), on neutralise translateY */
.overlay-fade-enter-from:has(.inset-0),
.overlay-fade-leave-to:has(.inset-0) {
  transform: none;
}
</style>
