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

      <!-- Contenu du menu avec scrollbar personnalisée -->
      <SidebarContent class="custom-scroll">
        <!-- Section Vue -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Eye class="h-4 w-4 mr-1" />
            Vue
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton @click="emit('reset-camera')">
                  <RotateCcw class="h-4 w-4" />
                  <span>Réinitialiser la vue</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton @click="toggleWireframe">
                  <Grid3x3 class="h-4 w-4" />
                  <span>{{ wireframe ? 'Solide' : 'Filaire' }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton @click="emit('toggle-fullscreen')">
                  <Maximize class="h-4 w-4" />
                  <span>Plein écran</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton @click="emit('capture-screenshot')">
                  <Camera class="h-4 w-4" />
                  <span>Capture d'écran</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Éclairage -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Sun class="h-4 w-4 mr-1" />
            Éclairage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton @click="toggleDayNight">
                  <Moon v-if="isDay" class="h-4 w-4" />
                  <Sun v-else class="h-4 w-4" />
                  <span>{{ isDay ? 'Mode Nuit' : 'Mode Jour' }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div
                  class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                >
                  <Label class="flex items-center gap-2 text-xs">
                    <Lightbulb class="h-3 w-3" />
                    Intensité lumière
                  </Label>
                  <Slider
                    v-model="lightIntensity"
                    :min="0"
                    :max="2"
                    :step="0.1"
                    class="w-full"
                    @update:model-value="updateLighting"
                  />
                  <div class="text-center text-xs text-muted-foreground">
                    {{ lightIntensity[0] }}
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div
                  class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                >
                  <Label class="flex items-center gap-2 text-xs">
                    <Sun class="h-3 w-3" />
                    Angle du soleil
                  </Label>
                  <Slider
                    v-model="sunAngle"
                    :min="0"
                    :max="360"
                    :step="1"
                    class="w-full"
                    @update:model-value="updateSunPosition"
                  />
                  <div class="text-center text-xs text-muted-foreground">
                    {{ sunAngle[0] }}°
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Couleurs -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Palette class="h-4 w-4 mr-1" />
            Couleurs
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div
                  class="px-2 py-2 space-y-3 group-data-[collapsible=icon]:hidden"
                >
                  <div class="flex items-center justify-between">
                    <Label class="flex items-center gap-2 text-xs">
                      <Home class="h-3 w-3" />
                      Murs
                    </Label>
                    <Input
                      v-model="wallColor"
                      type="color"
                      class="w-8 h-6 p-0 border-0"
                      @change="updateColors"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <Label class="flex items-center gap-2 text-xs">
                      <Triangle class="h-3 w-3" />
                      Toit
                    </Label>
                    <Input
                      v-model="roofColor"
                      type="color"
                      class="w-8 h-6 p-0 border-0"
                      @change="updateColors"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <Label class="flex items-center gap-2 text-xs">
                      <DoorOpen class="h-3 w-3" />
                      Porte
                    </Label>
                    <Input
                      v-model="doorColor"
                      type="color"
                      class="w-8 h-6 p-0 border-0"
                      @change="updateColors"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <Label class="flex items-center gap-2 text-xs">
                      <Mountain class="h-3 w-3" />
                      Sol
                    </Label>
                    <Input
                      v-model="groundColor"
                      type="color"
                      class="w-8 h-6 p-0 border-0"
                      @change="updateColors"
                    />
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Éléments -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Trees class="h-4 w-4 mr-1" />
            Éléments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showTrees ? 'default' : 'outline'"
                  @click="toggleTrees"
                >
                  <TreePine class="h-4 w-4" />
                  <span>{{ showTrees ? 'Masquer' : 'Afficher' }} arbres</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showFence ? 'default' : 'outline'"
                  @click="toggleFence"
                >
                  <Fence class="h-4 w-4" />
                  <span>{{ showFence ? 'Masquer' : 'Afficher' }} clôture</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton @click="addRandomCloud">
                  <Cloud class="h-4 w-4" />
                  <span>Ajouter nuage</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showGarden ? 'default' : 'outline'"
                  @click="toggleGarden"
                >
                  <Flower2 class="h-4 w-4" />
                  <span>{{ showGarden ? 'Masquer' : 'Afficher' }} jardin</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showPath ? 'default' : 'outline'"
                  @click="togglePath"
                >
                  <Footprints class="h-4 w-4" />
                  <span>{{ showPath ? 'Masquer' : 'Afficher' }} chemin</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Météo & Effets -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <CloudRain class="h-4 w-4 mr-1" />
            Météo & Effets
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="isRaining ? 'default' : 'outline'"
                  @click="toggleRain"
                >
                  <CloudRain class="h-4 w-4" />
                  <span>{{ isRaining ? 'Arrêter' : 'Démarrer' }} pluie</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="isSnowing ? 'default' : 'outline'"
                  @click="toggleSnow"
                >
                  <Snowflake class="h-4 w-4" />
                  <span>{{ isSnowing ? 'Arrêter' : 'Démarrer' }} neige</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showFog ? 'default' : 'outline'"
                  @click="toggleFog"
                >
                  <CloudFog class="h-4 w-4" />
                  <span>{{ showFog ? 'Masquer' : 'Afficher' }} brouillard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton @click="addFireflies">
                  <Sparkles class="h-4 w-4" />
                  <span>Ajouter lucioles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="showSmoke ? 'default' : 'outline'"
                  @click="toggleSmoke"
                >
                  <Flame class="h-4 w-4" />
                  <span>{{ showSmoke ? 'Arrêter' : 'Démarrer' }} fumée</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Animations -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Play class="h-4 w-4 mr-1" />
            Animations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="doorOpen ? 'default' : 'outline'"
                  @click="toggleDoorAnimation"
                >
                  <DoorOpen class="h-4 w-4" />
                  <span>{{ doorOpen ? 'Fermer' : 'Ouvrir' }} porte</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="treeAnimation ? 'default' : 'outline'"
                  @click="toggleTreeAnimation"
                >
                  <Wind class="h-4 w-4" />
                  <span>{{ treeAnimation ? 'Arrêter' : 'Démarrer' }} vent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="rotateHouse ? 'default' : 'outline'"
                  @click="toggleRotateHouse"
                >
                  <RotateCw class="h-4 w-4" />
                  <span
                    >{{ rotateHouse ? 'Arrêter' : 'Démarrer' }} rotation</span
                  >
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div
                  class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                >
                  <Label class="flex items-center gap-2 text-xs">
                    <Gauge class="h-3 w-3" />
                    Vitesse animation
                  </Label>
                  <Slider
                    v-model="animationSpeedArray"
                    :min="0.1"
                    :max="3"
                    :step="0.1"
                    class="w-full"
                  />
                  <div class="text-center text-xs text-muted-foreground">
                    {{ animationSpeedArray[0] }}x
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Audio -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Volume2 class="h-4 w-4 mr-1" />
            Audio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  :variant="ambientSound ? 'default' : 'outline'"
                  @click="toggleAmbientSound"
                >
                  <Volume2 v-if="ambientSound" class="h-4 w-4" />
                  <VolumeX v-else class="h-4 w-4" />
                  <span
                    >{{ ambientSound ? 'Arrêter' : 'Démarrer' }} sons
                    ambiants</span
                  >
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div
                  class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden"
                >
                  <Label class="flex items-center gap-2 text-xs">
                    <Volume1 class="h-3 w-3" />
                    Volume
                  </Label>
                  <Slider
                    v-model="audioVolumeArray"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    class="w-full"
                    @update:model-value="updateAudioVolume"
                  />
                  <div class="text-center text-xs text-muted-foreground">
                    {{ Math.round((audioVolumeArray[0] ?? 0) * 100) }}%
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Saisons -->
        <SidebarGroup>
          <SidebarGroupLabel>
            <Calendar class="h-4 w-4 mr-1" />
            Saisons
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
                  <Select
                    v-model="currentSeason"
                    @update:model-value="changeSeason"
                  >
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Choisir une saison" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">🌸 Printemps</SelectItem>
                      <SelectItem value="summer">☀️ Été</SelectItem>
                      <SelectItem value="autumn">🍂 Automne</SelectItem>
                      <SelectItem value="winter">❄️ Hiver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- Section Modèles 3D -->
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
              <SidebarMenuItem v-for="model in importedModels" :key="model.id">
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

                  <!-- Contrôles du modèle sélectionné -->
                  <div
                    v-if="selectedModelId === model.id"
                    class="space-y-3 p-2 bg-accent/20 rounded"
                  >
                    <!-- Position -->
                    <div class="space-y-2">
                      <Label class="flex items-center gap-2 text-xs">
                        <Move3d class="h-3 w-3" />
                        Position
                      </Label>
                      <div class="grid grid-cols-3 gap-1">
                        <div class="text-center">
                          <Label class="text-xs">X</Label>
                          <Input
                            type="number"
                            :value="model.position.x"
                            class="h-6 text-xs"
                            step="0.1"
                            @input="
                              updateModelPosition(
                                'x',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                        <div class="text-center">
                          <Label class="text-xs">Y</Label>
                          <Input
                            type="number"
                            :value="model.position.y"
                            class="h-6 text-xs"
                            step="0.1"
                            @input="
                              updateModelPosition(
                                'y',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                        <div class="text-center">
                          <Label class="text-xs">Z</Label>
                          <Input
                            type="number"
                            :value="model.position.z"
                            class="h-6 text-xs"
                            step="0.1"
                            @input="
                              updateModelPosition(
                                'z',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Rotation -->
                    <div class="space-y-2">
                      <Label class="flex items-center gap-2 text-xs">
                        <Rotate3d class="h-3 w-3" />
                        Rotation (°)
                      </Label>
                      <div class="grid grid-cols-3 gap-1">
                        <div class="text-center">
                          <Label class="text-xs">X</Label>
                          <Input
                            type="number"
                            :value="
                              Math.round((model.rotation.x * 180) / Math.PI)
                            "
                            class="h-6 text-xs"
                            @input="
                              updateModelRotation(
                                'x',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                        <div class="text-center">
                          <Label class="text-xs">Y</Label>
                          <Input
                            type="number"
                            :value="
                              Math.round((model.rotation.y * 180) / Math.PI)
                            "
                            class="h-6 text-xs"
                            @input="
                              updateModelRotation(
                                'y',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                        <div class="text-center">
                          <Label class="text-xs">Z</Label>
                          <Input
                            type="number"
                            :value="
                              Math.round((model.rotation.z * 180) / Math.PI)
                            "
                            class="h-6 text-xs"
                            @input="
                              updateModelRotation(
                                'z',
                                parseFloat(
                                  ($event.target as HTMLInputElement).value
                                )
                              )
                            "
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Échelle -->
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

              <!-- Formats supportés -->
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
      </SidebarContent>

      <!-- Panneau d'informations -->
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
              <div class="flex items-center gap-2 mb-3">
                <Info class="h-4 w-4 text-orange-500" />
                <h4 class="text-sm font-semibold text-orange-500">
                  Informations
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
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Calendar class="h-3 w-3" />
                    <span>Saison:</span>
                  </div>
                  <Badge variant="outline">{{ currentSeason }}</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Cloud class="h-3 w-3" />
                    <span>Météo:</span>
                  </div>
                  <Badge variant="outline">{{ currentWeather }}</Badge>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>

    <!-- Zone de rendu 3D (SidebarInset + boutons de contrôle) -->
    <SidebarInset class="render-inset">
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
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import {
  Eye,
  RotateCcw,
  Grid3x3,
  Maximize,
  Camera,
  Sun,
  Moon,
  Lightbulb,
  Palette,
  Home,
  Triangle,
  DoorOpen,
  Mountain,
  Trees,
  TreePine,
  Fence,
  Flower2,
  Footprints,
  CloudRain,
  Snowflake,
  CloudFog,
  Sparkles,
  Flame,
  Play,
  Wind,
  RotateCw,
  Gauge,
  Volume2,
  VolumeX,
  Volume1,
  Calendar,
  Info,
  Zap,
  Cloud,
  PanelLeftOpen,
  PanelLeftClose,
  Upload,
  Trash2,
  Rotate3d,
  Move3d,
  Scale,
} from 'lucide-vue-next'
import { ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

// ─── Composables (singletons) ────────────────────────────────────────────────
const {
  isDay,
  lightIntensity,
  sunAngle,
  toggleDayNight,
  updateLighting,
  updateSunPosition,
} = useThreeLighting()

const {
  wallColor,
  roofColor,
  doorColor,
  groundColor,
  doorOpen,
  wireframe,
  rotateHouse,
  updateColors,
  toggleWireframe,
  toggleDoorAnimation,
  toggleRotateHouse,
} = useThreeHouse()

const {
  showTrees,
  showFence,
  showGarden,
  showPath,
  treeAnimation,
  currentSeason,
  toggleTrees,
  toggleFence,
  toggleGarden,
  togglePath,
  toggleTreeAnimation,
  addRandomCloud,
  changeSeason,
} = useThreeElements()

const {
  isRaining,
  isSnowing,
  showFog,
  showSmoke,
  currentWeather,
  toggleRain,
  toggleSnow,
  toggleFog,
  addFireflies,
  toggleSmoke,
} = useThreeWeather()

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
  ambientSound,
  audioVolumeArray,
  toggleAmbientSound,
  updateAudioVolume,
} = useThreeAudio()

const { animationSpeedArray } = useThreeScene()

// ─── Props exposés par la page ────────────────────────────────────────────────
const props = defineProps<{
  fps: number
  triangleCount: number
}>()

// ─── Emits vers la page ───────────────────────────────────────────────────────
const emit = defineEmits<{
  'reset-camera': []
  'toggle-fullscreen': []
  'capture-screenshot': []
  'sidebar-toggled': []
}>()

// ─── État local sidebar ───────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)

const toggleSidebarCollapse = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  emit('sidebar-toggled')
}
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
