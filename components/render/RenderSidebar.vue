<template>
  <SidebarProvider :default-open="true">
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      class="custom-sidebar"
    >
      <!-- En-tête du menu -->
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div class="flex items-center gap-2">
                <div class="rounded-lg flex items-center justify-center">
                  <span class="text-sm font-bold">VH</span>
                </div>
                <div class="group-data-[collapsible=icon]:hidden">
                  <p class="text-sm font-semibold">VizHome</p>
                  <p class="text-xs text-muted-foreground">
                    Rendu 3D interactif
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <!-- Contenu conditionnel par mode                                       -->
      <!-- ═══════════════════════════════════════════════════════════════════ -->
      <SidebarContent class="custom-scroll">
        <!-- ─── MODE SKETCH ─────────────────────────────────────────────── -->
        <template v-if="currentMode === 'sketch'">
          <SidebarGroup>
            <SidebarGroupLabel>
              <Pencil class="h-4 w-4 mr-1" />
              Dessin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <!-- Outil -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="text-xs">Outil</Label>
                    <div class="flex gap-2">
                      <Button
                        :variant="
                          currentTool === 'pencil' ? 'default' : 'outline'
                        "
                        size="sm"
                        class="flex-1"
                        @click="currentTool = 'pencil'"
                      >
                        <Pencil class="h-3 w-3 mr-1" />
                        Crayon
                      </Button>
                      <Button
                        :variant="
                          currentTool === 'eraser' ? 'default' : 'outline'
                        "
                        size="sm"
                        class="flex-1"
                        @click="currentTool = 'eraser'"
                      >
                        <Eraser class="h-3 w-3 mr-1" />
                        Gomme
                      </Button>
                    </div>
                  </div>
                </SidebarMenuItem>

                <!-- Couleur -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <div class="flex items-center justify-between">
                      <Label class="flex items-center gap-2 text-xs">
                        <Palette class="h-3 w-3" />
                        Couleur
                      </Label>
                      <Input
                        v-model="brushColor"
                        type="color"
                        class="w-8 h-6 p-0 border-0"
                      />
                    </div>
                  </div>
                </SidebarMenuItem>

                <!-- Taille du pinceau -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="flex items-center gap-2 text-xs">
                      <Brush class="h-3 w-3" />
                      Taille du pinceau
                    </Label>
                    <Slider
                      v-model="brushSizeArray"
                      :min="1"
                      :max="40"
                      :step="1"
                      class="w-full"
                    />
                    <div class="text-center text-xs text-muted-foreground">
                      {{ brushSize }}px
                    </div>
                  </div>
                </SidebarMenuItem>

                <!-- Actions -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <div class="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        :disabled="!canUndo"
                        @click="undo"
                      >
                        <Undo2 class="h-3 w-3 mr-1" />
                        Annuler
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        :disabled="!canRedo"
                        @click="redo"
                      >
                        <Redo2 class="h-3 w-3 mr-1" />
                        Rétablir
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      class="w-full"
                      @click="clear"
                    >
                      <Trash2 class="h-3 w-3 mr-1" />
                      Effacer tout
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      class="w-full"
                      @click="exportPNG"
                    >
                      <Download class="h-3 w-3 mr-1" />
                      Exporter PNG
                    </Button>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </template>

        <!-- ─── MODE PROMPT IA ───────────────────────────────────────────── -->
        <template v-else-if="currentMode === 'prompt'">
          <SidebarGroup>
            <SidebarGroupLabel>
              <Sparkles class="h-4 w-4 mr-1" />
              Génération IA
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <!-- Type de sortie -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="text-xs">Type de sortie</Label>
                    <div class="flex gap-2">
                      <Button
                        :variant="outputType === '2d' ? 'default' : 'outline'"
                        size="sm"
                        class="flex-1"
                        @click="outputType = '2d'"
                      >
                        Image 2D
                      </Button>
                      <Button
                        :variant="outputType === '3d' ? 'default' : 'outline'"
                        size="sm"
                        class="flex-1"
                        @click="outputType = '3d'"
                      >
                        Modèle 3D
                      </Button>
                    </div>
                  </div>
                </SidebarMenuItem>

                <!-- Historique des prompts -->
                <SidebarMenuItem v-if="promptHistory.length > 0">
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="text-xs">Historique</Label>
                    <div class="space-y-1 max-h-40 overflow-y-auto">
                      <button
                        v-for="entry in promptHistory"
                        :key="entry.createdAt"
                        class="w-full text-left text-xs px-2 py-1 rounded hover:bg-accent truncate block"
                        @click="loadFromHistory(entry)"
                      >
                        <span class="text-muted-foreground mr-1">{{
                          entry.outputType.toUpperCase()
                        }}</span>
                        {{ entry.prompt }}
                      </button>
                    </div>
                  </div>
                </SidebarMenuItem>

                <!-- Conseils -->
                <SidebarMenuItem>
                  <div
                    class="px-2 py-2 space-y-1 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="flex items-center gap-2 text-xs">
                      <Info class="h-3 w-3" />
                      Conseils
                    </Label>
                    <ul class="text-xs text-muted-foreground space-y-1 pl-2">
                      <li>• Décris le style architectural</li>
                      <li>• Précise les matériaux (béton, bois...)</li>
                      <li>• Mentionne l'environnement</li>
                    </ul>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </template>

        <!-- ─── MODE 3D PRO ──────────────────────────────────────────────── -->
        <template v-else>
          <!-- Vue rapide -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Eye class="h-4 w-4 mr-1" />
              Vue
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="resetCamera">
                    <RotateCcw class="h-4 w-4" />
                    <span>Réinitialiser la vue</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleFullscreen">
                    <Maximize class="h-4 w-4" />
                    <span>Plein écran</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="captureScreenshot">
                    <Camera class="h-4 w-4" />
                    <span>Capture d'écran</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Import modèle -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Upload class="h-4 w-4 mr-1" />
              Modèles 3D
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    :disabled="isLoadingModel"
                    @click="importModel"
                  >
                    <Upload class="h-4 w-4" />
                    <span>{{
                      isLoadingModel ? 'Chargement...' : 'Importer modèle'
                    }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <!-- Message d'erreur -->
                <SidebarMenuItem v-if="modelLoadError">
                  <div
                    class="px-2 py-2 text-xs text-red-500 group-data-[collapsible=icon]:hidden"
                  >
                    {{ modelLoadError }}
                  </div>
                </SidebarMenuItem>

                <!-- Liste des modèles importés -->
                <SidebarMenuItem
                  v-for="model in importedModels"
                  :key="model.id"
                >
                  <div
                    class="px-2 py-1 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <div class="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        class="flex-1 justify-start text-xs"
                        :class="{ 'bg-accent': selectedModelId === model.id }"
                        @click="selectModel(model.id)"
                      >
                        <Move3d class="h-3 w-3 mr-1" />
                        {{ model.name }}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        class="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        @click="removeModel(model.id)"
                      >
                        <Trash2 class="h-3 w-3" />
                      </Button>
                    </div>

                    <!-- Contrôles position / rotation / échelle -->
                    <div
                      v-if="selectedModelId === model.id"
                      class="space-y-3 p-2 bg-accent/20 rounded"
                    >
                      <div class="space-y-2">
                        <Label class="flex items-center gap-2 text-xs">
                          <Move3d class="h-3 w-3" />
                          Position
                        </Label>
                        <div class="grid grid-cols-3 gap-1">
                          <div
                            v-for="axis in ['x', 'y', 'z'] as const"
                            :key="axis"
                            class="text-center"
                          >
                            <Label class="text-xs">{{
                              axis.toUpperCase()
                            }}</Label>
                            <Input
                              type="number"
                              :value="model.position[axis]"
                              class="h-6 text-xs"
                              step="0.1"
                              @input="
                                updateModelPosition(
                                  axis,
                                  parseFloat(
                                    ($event.target as HTMLInputElement).value
                                  )
                                )
                              "
                            />
                          </div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <Label class="flex items-center gap-2 text-xs">
                          <Rotate3d class="h-3 w-3" />
                          Rotation (°)
                        </Label>
                        <div class="grid grid-cols-3 gap-1">
                          <div
                            v-for="axis in ['x', 'y', 'z'] as const"
                            :key="axis"
                            class="text-center"
                          >
                            <Label class="text-xs">{{
                              axis.toUpperCase()
                            }}</Label>
                            <Input
                              type="number"
                              :value="
                                Math.round(
                                  (model.rotation[axis] * 180) / Math.PI
                                )
                              "
                              class="h-6 text-xs"
                              @input="
                                updateModelRotation(
                                  axis,
                                  parseFloat(
                                    ($event.target as HTMLInputElement).value
                                  )
                                )
                              "
                            />
                          </div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <Label class="flex items-center gap-2 text-xs">
                          <Scale class="h-3 w-3" />
                          Échelle
                        </Label>
                        <Slider
                          :min="0.1"
                          :max="5"
                          :step="0.1"
                          :model-value="[model.scale.x]"
                          class="w-full"
                          @update:model-value="
                            updateModelScale(($event as number[])[0] ?? 1)
                          "
                        />
                        <div class="text-center text-xs text-muted-foreground">
                          {{ model.scale.x.toFixed(1) }}x
                        </div>
                      </div>
                    </div>
                  </div>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
                    <div class="text-xs text-muted-foreground">
                      <p class="font-medium mb-1">Formats supportés:</p>
                      <ul class="space-y-1">
                        <li>• GLB/GLTF (recommandé)</li>
                        <li>• OBJ</li>
                        <li>• FBX</li>
                      </ul>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Éclairage — presets -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Sun class="h-4 w-4 mr-1" />
              Éclairage
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
                    <div class="grid grid-cols-2 gap-2">
                      <button
                        v-for="(cfg, key) in LIGHT_PRESETS"
                        :key="key"
                        class="rounded-lg p-2 text-xs font-medium border transition-all"
                        :class="
                          currentPreset === key
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border hover:bg-accent'
                        "
                        @click="applyPreset(key as LightPreset)"
                      >
                        <span class="block text-base leading-none mb-1">
                          {{ PRESET_ICONS[key as LightPreset] }}
                        </span>
                        {{ cfg.label }}
                      </button>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Navigation -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Compass class="h-4 w-4 mr-1" />
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    :variant="isFirstPerson ? 'default' : 'outline'"
                    @click="toggleNavigation"
                  >
                    <PersonStanding v-if="!isFirstPerson" class="h-4 w-4" />
                    <Orbit v-else class="h-4 w-4" />
                    <span>{{ isFirstPerson ? 'Orbite' : 'First-person' }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem v-if="isFirstPerson">
                  <div
                    class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                  >
                    <Label class="flex items-center gap-2 text-xs">
                      <Gauge class="h-3 w-3" />
                      Vitesse (WASD)
                    </Label>
                    <Slider
                      v-model="moveSpeedArray"
                      :min="1"
                      :max="20"
                      :step="1"
                      class="w-full"
                    />
                    <div class="text-center text-xs text-muted-foreground">
                      {{ moveSpeed }}
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Saisons (uniquement si un modèle est importé) -->
          <SidebarGroup v-if="importedModels.length > 0">
            <SidebarGroupLabel>
              <Calendar class="h-4 w-4 mr-1" />
              Saisons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
                    <div class="grid grid-cols-2 gap-2">
                      <button
                        v-for="(cfg, key) in SEASON_CONFIGS"
                        :key="key"
                        class="rounded-lg p-2 text-xs font-medium border transition-all"
                        :class="
                          currentSeason === key
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border hover:bg-accent'
                        "
                        @click="applySeason(key as Season)"
                      >
                        <span class="block text-base leading-none mb-1">
                          {{ SEASON_ICONS[key as Season] }}
                        </span>
                        {{ cfg.label }}
                      </button>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </template>
      </SidebarContent>

      <!-- Pied de page — performances (mode 3D uniquement) -->
      <SidebarFooter v-if="currentMode === '3d'">
        <SidebarMenu>
          <SidebarMenuItem>
            <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
              <div class="flex items-center gap-2 mb-3">
                <Info class="h-4 w-4 text-orange-500" />
                <h4 class="text-sm font-semibold text-orange-500">
                  Performances
                </h4>
              </div>
              <div class="space-y-2 text-xs text-muted-foreground">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Zap class="h-3 w-3" />
                    <span>FPS:</span>
                  </div>
                  <Badge variant="secondary">{{ fps }}</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Triangle class="h-3 w-3" />
                    <span>Triangles:</span>
                  </div>
                  <Badge variant="secondary">{{ triangleCount }}</Badge>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>

    <!-- Zone de rendu (SidebarInset) — contient la ModeBar + les panels légers -->
    <SidebarInset class="render-inset">
      <!-- Contrôles sidebar top-left -->
      <div class="absolute top-4 left-4 z-20 flex items-center gap-2">
        <SidebarTrigger class="sidebar-trigger" />
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8 sidebar-control-btn"
          :title="
            sidebarCollapsed ? 'Agrandir la sidebar' : 'Réduire la sidebar'
          "
          @click="toggleSidebarCollapse"
        >
          <PanelLeftOpen v-if="sidebarCollapsed" class="h-4 w-4" />
          <PanelLeftClose v-else class="h-4 w-4" />
        </Button>
      </div>

      <!-- Sélecteur de mode flottant (top-center) -->
      <RenderModeBar />

      <!-- Panels légers (v-if : peuvent être démontés) -->
      <SketchCanvas v-if="currentMode === 'sketch'" />
      <PromptPanel v-if="currentMode === 'prompt'" />
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import {
  Eye,
  RotateCcw,
  Maximize,
  Camera,
  Sun,
  Pencil,
  Eraser,
  Palette,
  Brush,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Sparkles,
  Info,
  Upload,
  Move3d,
  Rotate3d,
  Scale,
  Compass,
  PersonStanding,
  Orbit,
  Gauge,
  Calendar,
  Zap,
  Triangle,
  PanelLeftOpen,
  PanelLeftClose,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Slider } from '@/components/ui/slider'
import type { LightPreset, Season } from '@/composables/useThreeLightingPresets'

// ─── Icônes presets ───────────────────────────────────────────────────────────
const PRESET_ICONS: Record<LightPreset, string> = {
  morning: '🌅',
  noon: '☀️',
  sunset: '🌇',
  night: '🌙',
  studio: '💡',
}

const SEASON_ICONS: Record<Season, string> = {
  spring: '🌸',
  summer: '☀️',
  autumn: '🍂',
  winter: '❄️',
}

// ─── Composables (singletons) ────────────────────────────────────────────────
const { currentMode } = useRenderMode()

const {
  fps,
  triangleCount,
  sidebarCollapsed,
  toggleSidebarCollapse,
  resetCamera,
  toggleFullscreen,
  captureScreenshot,
} = useThreeScene()

const {
  importedModels,
  selectedModelId,
  isLoadingModel,
  modelLoadError,
  importModel,
  removeModel,
  selectModel,
  updateModelPosition,
  updateModelRotation,
  updateModelScale,
} = useThreeModels()

const {
  currentPreset,
  currentSeason,
  LIGHT_PRESETS,
  SEASON_CONFIGS,
  applyPreset,
  applySeason,
} = useThreeLightingPresets()

const { isFirstPerson, moveSpeed, toggleNavigation } = useThreeFirstPerson()

const {
  currentTool,
  brushSize,
  brushColor,
  canUndo,
  canRedo,
  undo,
  redo,
  clear,
  exportPNG,
} = useSketchCanvas()

const { outputType, promptHistory, loadFromHistory } = useAiRender()

// ─── Adapters pour Slider (attend un tableau) ─────────────────────────────────
const brushSizeArray = computed({
  get: () => [brushSize.value],
  set: (v: number[]) => {
    brushSize.value = v[0] ?? brushSize.value
  },
})

const moveSpeedArray = computed({
  get: () => [moveSpeed.value],
  set: (v: number[]) => {
    moveSpeed.value = v[0] ?? moveSpeed.value
  },
})
</script>

<style scoped>
/* Personnalisation de la sidebar */
.custom-sidebar {
  border-right: 1px solid hsl(var(--border));
  backdrop-filter: blur(8px);
  background: hsl(var(--background) / 0.95);
  max-width: 100vw;
}

/* Scrollbar personnalisée */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.2) transparent;
  scroll-behavior: smooth;
}

.custom-scroll::-webkit-scrollbar {
  width: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground) / 0.2);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--muted-foreground) / 0.4);
}

.render-inset {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}

.sidebar-trigger,
.sidebar-control-btn {
  background: hsl(var(--background) / 0.95);
  border: 1px solid hsl(var(--border));
  backdrop-filter: blur(12px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px hsl(var(--shadow) / 0.1);
}

.sidebar-trigger:hover,
.sidebar-control-btn:hover {
  background: hsl(var(--accent));
  border-color: hsl(var(--accent-foreground) / 0.2);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 12px hsl(var(--shadow) / 0.15);
}

.custom-sidebar,
.render-inset {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 480px) {
  .sidebar-control-btn {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar-control-btn {
    display: none;
  }

  .custom-sidebar {
    max-width: 90vw;
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.sidebar-trigger,
.sidebar-control-btn {
  animation: slideInFromLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-height: 600px) {
  .custom-scroll {
    max-height: calc(100vh - 120px);
  }
}
</style>
