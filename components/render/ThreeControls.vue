<template>
  <!-- Toolbar droite -->
  <div
    class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2"
  >
    <!-- Bouton Éclairage -->
    <button
      :class="[
        'min-w-[52px] px-2 py-2 rounded-xl border shadow-sm flex flex-col items-center gap-1 transition-colors',
        activePanel === 'light'
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent',
      ]"
      title="Éclairage"
      @click="togglePanel('light')"
    >
      <Sun class="h-4 w-4" />
      <span class="text-[9px] font-medium leading-none">Lumière</span>
    </button>

    <!-- Bouton Navigation -->
    <button
      :class="[
        'min-w-[52px] px-2 py-2 rounded-xl border shadow-sm flex flex-col items-center gap-1 transition-colors',
        activePanel === 'nav'
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent',
      ]"
      title="Navigation"
      @click="togglePanel('nav')"
    >
      <Navigation2 class="h-4 w-4" />
      <span class="text-[9px] font-medium leading-none">Navigation</span>
    </button>

    <!-- Bouton Modèles -->
    <button
      :class="[
        'min-w-[52px] px-2 py-2 rounded-xl border shadow-sm flex flex-col items-center gap-1 transition-colors',
        activePanel === 'models'
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent',
      ]"
      title="Modèles 3D"
      @click="togglePanel('models')"
    >
      <Upload class="h-4 w-4" />
      <span class="text-[9px] font-medium leading-none">Modèles</span>
    </button>

    <!-- Bouton Vue -->
    <button
      :class="[
        'min-w-[52px] px-2 py-2 rounded-xl border shadow-sm flex flex-col items-center gap-1 transition-colors',
        activePanel === 'view'
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent',
      ]"
      title="Vue & Caméra"
      @click="togglePanel('view')"
    >
      <Camera class="h-4 w-4" />
      <span class="text-[9px] font-medium leading-none">Caméra</span>
    </button>

    <div class="h-px w-full bg-border/50 my-0.5" />

    <!-- Bouton Rendu IA -->
    <button
      :class="[
        'min-w-[52px] px-2 py-2 rounded-xl border shadow-sm flex flex-col items-center gap-1 transition-colors',
        'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
      ]"
      title="Capturer et générer un rendu IA"
      @click="openScreenshotPanel"
    >
      <Wand2 class="h-4 w-4" />
      <span class="text-[9px] font-medium leading-none">Rendu IA</span>
    </button>
  </div>

  <!-- Panel Screenshot → Rendu IA -->
  <ScreenshotRenderPanel
    v-model:open="showScreenshotPanel"
    :screenshot-data-url="screenshotDataUrl"
  />

  <!-- Empty state scène 3D vide -->
  <Transition name="fade">
    <div
      v-if="importedModels.length === 0"
      class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div class="flex flex-col items-center gap-4 pointer-events-auto">
        <div
          class="h-16 w-16 rounded-2xl bg-background/80 backdrop-blur-sm border shadow-lg flex items-center justify-center"
        >
          <Box class="h-8 w-8 text-muted-foreground/40" />
        </div>
        <p class="text-sm text-foreground/50 font-medium">
          Aucun modèle dans la scène
        </p>
        <button
          :disabled="isLoadingModel"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
          @click="importModel"
        >
          <Loader2 v-if="isLoadingModel" class="h-4 w-4 animate-spin" />
          <Upload v-else class="h-4 w-4" />
          Importer un modèle 3D
        </button>
      </div>
    </div>
  </Transition>

  <!-- Panel flottant -->
  <Transition name="panel-slide">
    <div
      v-if="activePanel"
      class="absolute right-16 top-1/2 -translate-y-1/2 z-20 w-72 rounded-2xl border bg-background/95 backdrop-blur-md shadow-xl p-4 flex flex-col gap-3"
    >
      <!-- ── Panel Éclairage ── -->
      <template v-if="activePanel === 'light'">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Ambiance
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="(cfg, key) in LIGHT_PRESETS"
            :key="key"
            :class="[
              'flex flex-col items-center gap-1 rounded-xl border p-2 text-xs font-medium transition-colors',
              currentPreset === key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/50 hover:bg-accent border-transparent',
            ]"
            @click="applyPreset(key as LightPreset)"
          >
            <span class="text-lg">{{ PRESET_EMOJIS[key as LightPreset] }}</span>
            {{ cfg.label }}
          </button>
        </div>

        <div class="h-px bg-border" />

        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Saison
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="(cfg, key) in SEASON_CONFIGS"
            :key="key"
            :class="[
              'flex flex-col items-center gap-1 rounded-xl border p-2 text-xs font-medium transition-colors',
              currentSeason === key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/50 hover:bg-accent border-transparent',
            ]"
            @click="applySeason(key as Season)"
          >
            <span class="text-lg">{{ SEASON_EMOJIS[key as Season] }}</span>
            {{ cfg.label }}
          </button>
        </div>
      </template>

      <!-- ── Panel Navigation ── -->
      <template v-else-if="activePanel === 'nav'">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Mode
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="mode in NAV_MODES"
            :key="mode.key"
            :class="[
              'flex flex-col items-center gap-1 rounded-xl border p-2 text-xs font-medium transition-colors',
              navMode === mode.key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/50 hover:bg-accent border-transparent',
            ]"
            @click="setNavMode(mode.key)"
          >
            <span class="text-lg">{{ mode.emoji }}</span>
            {{ mode.label }}
          </button>
        </div>

        <!-- Contrôles First-person -->
        <template v-if="isFirstPerson">
          <div class="h-px bg-border" />
          <div class="flex items-center gap-2">
            <Move3d class="h-4 w-4 text-muted-foreground shrink-0" />
            <span class="text-xs text-muted-foreground flex-1">Vitesse</span>
            <span class="text-xs font-mono w-6 text-right">{{
              moveSpeed[0]
            }}</span>
          </div>
          <input
            :value="moveSpeed[0]"
            type="range"
            min="1"
            max="20"
            class="w-full h-1 accent-primary cursor-pointer"
            @input="
              moveSpeed[0] = Number(($event.target as HTMLInputElement).value)
            "
          />
        </template>

        <!-- Contrôles Tour -->
        <template v-if="isTourActive">
          <div class="h-px bg-border" />
          <div class="flex items-center gap-2">
            <button
              class="h-8 w-8 rounded-lg border bg-muted/50 hover:bg-accent flex items-center justify-center"
              @click="togglePlayPause"
            >
              <Pause v-if="isPlaying" class="h-4 w-4" />
              <Play v-else class="h-4 w-4" />
            </button>
            <button
              class="h-8 w-8 rounded-lg border bg-muted/50 hover:bg-accent flex items-center justify-center"
              @click="setNavMode('orbit')"
            >
              <Square class="h-4 w-4" />
            </button>
            <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full bg-primary rounded-full transition-all"
                :style="{ width: `${tourProgress * 100}%` }"
              />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Timer class="h-4 w-4 text-muted-foreground shrink-0" />
            <span class="text-xs text-muted-foreground flex-1">Durée (s)</span>
            <span class="text-xs font-mono w-8 text-right"
              >{{ tourDuration[0] }}s</span
            >
          </div>
          <input
            :value="tourDuration[0]"
            type="range"
            min="10"
            max="120"
            class="w-full h-1 accent-primary cursor-pointer"
            @input="
              tourDuration[0] = Number(
                ($event.target as HTMLInputElement).value
              )
            "
          />
        </template>
      </template>

      <!-- ── Panel Modèles ── -->
      <template v-else-if="activePanel === 'models'">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Importer
        </p>
        <button
          :class="[
            'w-full flex items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium transition-colors',
            isLoadingModel
              ? 'opacity-50 cursor-not-allowed bg-muted'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          ]"
          :disabled="isLoadingModel"
          @click="importModel"
        >
          <Loader2 v-if="isLoadingModel" class="h-4 w-4 animate-spin" />
          <Upload v-else class="h-4 w-4" />
          Importer un modèle
        </button>

        <div
          v-if="modelLoadError"
          class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          <span>{{ modelLoadError }}</span>
        </div>

        <!-- Liste des modèles -->
        <template v-if="importedModels.length > 0">
          <div class="h-px bg-border" />
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Scène
          </p>
          <div class="flex flex-col gap-1">
            <div
              v-for="model in importedModels"
              :key="model.id"
              :class="[
                'flex items-center gap-2 rounded-lg px-2 py-1.5 cursor-pointer text-xs transition-colors',
                selectedModelId === model.id
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-accent',
              ]"
              @click="selectModel(model.id)"
            >
              <span class="flex-1 truncate font-medium">{{ model.name }}</span>
              <button
                class="h-6 w-6 rounded-md hover:bg-destructive/10 hover:text-destructive flex items-center justify-center shrink-0"
                @click.stop="removeModel(model.id)"
              >
                <X class="h-3 w-3" />
              </button>
            </div>
          </div>

          <!-- Contrôles modèle sélectionné -->
          <template v-if="selectedModel">
            <div class="h-px bg-border" />
            <p
              class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Transform
            </p>

            <!-- Position -->
            <div class="flex items-center gap-1">
              <Move3d class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span class="text-xs text-muted-foreground w-14 shrink-0"
                >Position</span
              >
              <input
                v-for="axis in ['x', 'y', 'z'] as const"
                :key="axis"
                type="number"
                :value="selectedModel.position[axis]"
                step="0.1"
                class="w-14 h-6 rounded-md border bg-background px-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                :title="`Position ${axis.toUpperCase()}`"
                @change="
                  updateModelPosition(
                    axis,
                    Number(($event.target as HTMLInputElement).value)
                  )
                "
              />
            </div>

            <!-- Rotation -->
            <div class="flex items-center gap-1">
              <Rotate3d class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span class="text-xs text-muted-foreground w-14 shrink-0"
                >Rotation°</span
              >
              <input
                v-for="axis in ['x', 'y', 'z'] as const"
                :key="axis"
                type="number"
                :value="
                  Math.round((selectedModel.rotation[axis] * 180) / Math.PI)
                "
                step="1"
                class="w-14 h-6 rounded-md border bg-background px-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                :title="`Rotation ${axis.toUpperCase()}`"
                @change="
                  updateModelRotation(
                    axis,
                    Number(($event.target as HTMLInputElement).value)
                  )
                "
              />
            </div>

            <!-- Échelle -->
            <div class="flex items-center gap-2">
              <Scale class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span class="text-xs text-muted-foreground flex-1">Échelle</span>
              <span class="text-xs font-mono w-8 text-right">{{
                selectedModel.scale.x.toFixed(2)
              }}</span>
            </div>
            <input
              :value="selectedModel.scale.x"
              type="range"
              min="0.1"
              max="5"
              step="0.01"
              class="w-full h-1 accent-primary cursor-pointer"
              @input="
                updateModelScale(
                  Number(($event.target as HTMLInputElement).value)
                )
              "
            />
          </template>
        </template>
      </template>

      <!-- ── Panel Vue ── -->
      <template v-else-if="activePanel === 'view'">
        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Caméra
        </p>
        <div class="grid grid-cols-3 gap-2">
          <button
            class="flex flex-col items-center gap-1 rounded-xl border bg-muted/50 hover:bg-accent p-2 text-xs font-medium transition-colors"
            title="Réinitialiser la caméra"
            @click="resetCamera"
          >
            <RotateCcw class="h-4 w-4" />
            Reset
          </button>
          <button
            class="flex flex-col items-center gap-1 rounded-xl border bg-muted/50 hover:bg-accent p-2 text-xs font-medium transition-colors"
            title="Plein écran"
            @click="toggleFullscreen"
          >
            <Maximize class="h-4 w-4" />
            Plein écran
          </button>
          <button
            class="flex flex-col items-center gap-1 rounded-xl border bg-muted/50 hover:bg-accent p-2 text-xs font-medium transition-colors"
            title="Capturer et générer un rendu IA"
            @click="openScreenshotPanel"
          >
            <Camera class="h-4 w-4" />
            Capture
          </button>
        </div>

        <div class="h-px bg-border" />

        <p
          class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Performances
        </p>
        <div class="flex gap-2">
          <div
            class="flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs flex-1 justify-center"
          >
            <Gauge class="h-3.5 w-3.5 text-muted-foreground" />
            <span class="font-mono font-semibold">{{ fps }}</span>
            <span class="text-muted-foreground">FPS</span>
          </div>
          <div
            class="flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs flex-1 justify-center"
          >
            <span class="text-muted-foreground">▲</span>
            <span class="font-mono font-semibold">{{
              triangleCount.toLocaleString()
            }}</span>
            <span class="text-muted-foreground">tri</span>
          </div>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Box,
  Camera,
  Gauge,
  Maximize,
  Move3d,
  Navigation2,
  Pause,
  Play,
  Rotate3d,
  RotateCcw,
  Scale,
  Square,
  Sun,
  Timer,
  Upload,
  Wand2,
  X,
  Loader2,
} from 'lucide-vue-next'

type PanelId = 'light' | 'nav' | 'models' | 'view'

const activePanel = ref<PanelId | null>(null)

const togglePanel = (id: PanelId) => {
  activePanel.value = activePanel.value === id ? null : id
}

// ─── Composables ──────────────────────────────────────────────────────────────
const {
  currentPreset,
  currentSeason,
  LIGHT_PRESETS,
  SEASON_CONFIGS,
  applyPreset,
  applySeason,
} = useThreeLightingPresets()

import type { LightPreset, Season } from '~/composables/useThreeLightingPresets'

const {
  navMode,
  setNavMode,
  isFirstPerson,
  moveSpeed,
  isTourActive,
  isPlaying,
  tourProgress,
  tourDuration,
  togglePlayPause,
} = useThreeNavigation()

import type { NavMode } from '~/composables/useThreeNavigation'

const {
  importedModels,
  selectedModelId,
  isLoadingModel,
  modelLoadError,
  selectedModel,
  importModel,
  removeModel,
  selectModel,
  updateModelPosition,
  updateModelRotation,
  updateModelScale,
} = useThreeModels()

const {
  fps,
  triangleCount,
  resetCamera,
  toggleFullscreen,
  captureScreenshotDataURL,
} = useThreeScene()

// ─── Panel Screenshot ─────────────────────────────────────────────────────────
const showScreenshotPanel = ref(false)
const screenshotDataUrl = ref<string | null>(null)

const openScreenshotPanel = () => {
  screenshotDataUrl.value = captureScreenshotDataURL()
  showScreenshotPanel.value = true
}

// ─── Config UI ────────────────────────────────────────────────────────────────
const PRESET_EMOJIS: Record<LightPreset, string> = {
  morning: '🌅',
  noon: '☀️',
  sunset: '🌇',
  night: '🌙',
  studio: '💡',
}

const SEASON_EMOJIS: Record<Season, string> = {
  spring: '🌸',
  summer: '🌞',
  autumn: '🍂',
  winter: '❄️',
}

const NAV_MODES: { key: NavMode; label: string; emoji: string }[] = [
  { key: 'orbit', label: 'Orbite', emoji: '🔄' },
  { key: 'firstperson', label: 'Marche', emoji: '🚶' },
  { key: 'topdown', label: 'Plan', emoji: '🗺️' },
  { key: 'tour', label: 'Visite', emoji: '🎬' },
]
</script>

<style scoped>
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(8px) translateY(-50%);
}
.panel-slide-enter-to,
.panel-slide-leave-from {
  transform: translateX(0) translateY(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
