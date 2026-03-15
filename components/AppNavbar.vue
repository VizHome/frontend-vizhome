<template>
  <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center shrink-0">
          <AppLogo />
        </NuxtLink>

        <!-- Nav desktop -->
        <nav class="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <!-- Fonctionnalités -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="bg-transparent"
                  >Fonctionnalités</NavigationMenuTrigger
                >
                <NavigationMenuContent>
                  <div class="w-[520px] p-4 grid grid-cols-2 gap-2">
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features"
                        class="col-span-2 flex flex-col gap-1 rounded-lg bg-muted/50 p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Toutes les fonctionnalités</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Découvrez l'ensemble des capacités de VizHome</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/auto-3d"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Génération 3D automatique</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Transformez vos photos en modèles 3D</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/materials"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Bibliothèque de matériaux</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Plus de 10 000 matériaux photoréalistes</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/360-views"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Vues 360° immersives</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Visites virtuelles interactives</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/intelligent-lighting"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Éclairage intelligent</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Simulation d'éclairage réaliste</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/collaboration"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Partage et collaboration</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >Travaillez en équipe facilement</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features/mobile-apps"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium"
                          >Applications mobiles</span
                        >
                        <span class="text-xs text-muted-foreground"
                          >iOS et Android disponibles</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Tarifs -->
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink
                    to="/pricing"
                    class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
                  >
                    Tarifs
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <!-- Documentation -->
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink
                    to="/docs"
                    class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
                  >
                    Documentation
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <!-- À propos -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="bg-transparent"
                  >Entreprise</NavigationMenuTrigger
                >
                <NavigationMenuContent>
                  <div class="w-[280px] p-3 flex flex-col gap-1">
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/about"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium">À propos</span>
                        <span class="text-xs text-muted-foreground"
                          >Notre mission et notre équipe</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/testimonials"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium">Témoignages</span>
                        <span class="text-xs text-muted-foreground"
                          >Ce que disent nos clients</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/faq"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium">FAQ</span>
                        <span class="text-xs text-muted-foreground"
                          >Questions fréquentes</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/contact"
                        class="flex flex-col gap-0.5 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <span class="text-sm font-medium">Contact</span>
                        <span class="text-xs text-muted-foreground"
                          >Nous écrire</span
                        >
                      </NuxtLink>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <!-- Actions desktop -->
        <div class="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          <NuxtLink to="/auth/login">
            <Button variant="ghost" size="sm">Connexion</Button>
          </NuxtLink>
          <NuxtLink to="/auth/register">
            <Button size="sm" class="rounded-full">Essayer gratuitement</Button>
          </NuxtLink>
        </div>

        <!-- Mobile : hamburger -->
        <div class="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet v-model:open="mobileOpen">
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <MenuIcon class="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" class="w-72 p-0 overflow-y-auto">
              <div class="flex flex-col h-full p-4 gap-1">
                <NuxtLink
                  to="/"
                  class="flex items-center py-2 mb-3"
                  @click="mobileOpen = false"
                >
                  <AppLogo />
                </NuxtLink>

                <NuxtLink
                  to="/"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                  @click="mobileOpen = false"
                >
                  <HomeIcon class="h-4 w-4 text-muted-foreground" />
                  Accueil
                </NuxtLink>

                <!-- Features section -->
                <button
                  class="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors w-full text-left"
                  @click="mobileFeatOpen = !mobileFeatOpen"
                >
                  <span class="flex items-center gap-2">
                    <ZapIcon class="h-4 w-4 text-muted-foreground" />
                    Fonctionnalités
                  </span>
                  <ChevronDownIcon
                    class="h-4 w-4 transition-transform"
                    :class="{ 'rotate-180': mobileFeatOpen }"
                  />
                </button>
                <div
                  v-if="mobileFeatOpen"
                  class="ml-4 border-l pl-3 flex flex-col gap-0.5"
                >
                  <NuxtLink
                    to="/features"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Vue d'ensemble</NuxtLink
                  >
                  <NuxtLink
                    to="/features/auto-3d"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >3D automatique</NuxtLink
                  >
                  <NuxtLink
                    to="/features/materials"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Matériaux</NuxtLink
                  >
                  <NuxtLink
                    to="/features/360-views"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Vues 360°</NuxtLink
                  >
                  <NuxtLink
                    to="/features/intelligent-lighting"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Éclairage intelligent</NuxtLink
                  >
                  <NuxtLink
                    to="/features/collaboration"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Collaboration</NuxtLink
                  >
                  <NuxtLink
                    to="/features/mobile-apps"
                    class="py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded transition-colors"
                    @click="mobileOpen = false"
                    >Applications mobiles</NuxtLink
                  >
                </div>

                <NuxtLink
                  to="/pricing"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                  @click="mobileOpen = false"
                >
                  <TagIcon class="h-4 w-4 text-muted-foreground" />
                  Tarifs
                </NuxtLink>
                <NuxtLink
                  to="/docs"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                  @click="mobileOpen = false"
                >
                  <BookOpenIcon class="h-4 w-4 text-muted-foreground" />
                  Documentation
                </NuxtLink>
                <NuxtLink
                  to="/about"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                  @click="mobileOpen = false"
                >
                  <UsersIcon class="h-4 w-4 text-muted-foreground" />
                  À propos
                </NuxtLink>
                <NuxtLink
                  to="/contact"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                  @click="mobileOpen = false"
                >
                  <MailIcon class="h-4 w-4 text-muted-foreground" />
                  Contact
                </NuxtLink>

                <div class="mt-auto pt-4 border-t flex flex-col gap-2">
                  <LanguageSwitcher />
                  <NuxtLink to="/auth/login" @click="mobileOpen = false">
                    <Button
                      variant="outline"
                      class="w-full rounded-full"
                      size="sm"
                      >Connexion</Button
                    >
                  </NuxtLink>
                  <NuxtLink to="/auth/register" @click="mobileOpen = false">
                    <Button class="w-full rounded-full" size="sm"
                      >Essayer gratuitement</Button
                    >
                  </NuxtLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MenuIcon,
  HomeIcon,
  ZapIcon,
  ChevronDownIcon,
  TagIcon,
  BookOpenIcon,
  UsersIcon,
  MailIcon,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const mobileOpen = ref(false)
const mobileFeatOpen = ref(false)
</script>
