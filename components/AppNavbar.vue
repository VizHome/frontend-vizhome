<template>
  <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center shrink-0">
          <AppLogo />
        </NuxtLink>

        <!-- Nav desktop -->
        <nav class="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <!-- Fonctionnalités -->
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  class="bg-transparent text-sm font-medium"
                >
                  Fonctionnalités
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="w-[560px] p-4">
                    <!-- Item vedette -->
                    <NavigationMenuLink as-child>
                      <NuxtLink
                        to="/features"
                        class="group flex gap-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 p-4 hover:border-primary/20 transition-all mb-3"
                      >
                        <div
                          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        >
                          <SparklesIcon class="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p class="text-sm font-semibold mb-0.5">
                            Toutes les fonctionnalités
                          </p>
                          <p class="text-xs text-muted-foreground">
                            Vue d'ensemble complète des capacités de VizHome
                          </p>
                        </div>
                      </NuxtLink>
                    </NavigationMenuLink>

                    <!-- Grille des sous-fonctionnalités -->
                    <div class="grid grid-cols-2 gap-1">
                      <NavigationMenuLink
                        as-child
                        v-for="feat in featuresMenu"
                        :key="feat.to"
                      >
                        <NuxtLink
                          :to="feat.to"
                          class="group flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                        >
                          <div
                            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors mt-0.5"
                          >
                            <component
                              :is="feat.icon"
                              class="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors"
                            />
                          </div>
                          <div>
                            <p class="text-sm font-medium leading-none mb-1">
                              {{ feat.label }}
                            </p>
                            <p
                              class="text-xs text-muted-foreground leading-snug"
                            >
                              {{ feat.desc }}
                            </p>
                          </div>
                        </NuxtLink>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Tarifs -->
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink to="/pricing" :class="navLinkClass('/pricing')">
                    Tarifs
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <!-- Documentation -->
              <NavigationMenuItem>
                <NavigationMenuLink as-child>
                  <NuxtLink to="/docs" :class="navLinkClass('/docs')">
                    Docs
                  </NuxtLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <!-- Entreprise -->
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  class="bg-transparent text-sm font-medium"
                >
                  Entreprise
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="w-[300px] p-3 flex flex-col gap-1">
                    <NavigationMenuLink
                      as-child
                      v-for="item in companyMenu"
                      :key="item.to"
                    >
                      <NuxtLink
                        :to="item.to"
                        class="group flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <div
                          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors mt-0.5"
                        >
                          <component
                            :is="item.icon"
                            class="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors"
                          />
                        </div>
                        <div>
                          <p class="text-sm font-medium leading-none mb-1">
                            {{ item.label }}
                          </p>
                          <p class="text-xs text-muted-foreground leading-snug">
                            {{ item.desc }}
                          </p>
                        </div>
                      </NuxtLink>
                    </NavigationMenuLink>

                    <!-- Divider + CTA lancer l'app -->
                    <div class="mt-2 pt-3 border-t">
                      <NuxtLink
                        to="/render"
                        class="flex items-center justify-between rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5 hover:bg-primary/10 transition-colors group"
                      >
                        <div class="flex items-center gap-2">
                          <BoxIcon class="h-4 w-4 text-primary" />
                          <span class="text-sm font-medium text-primary"
                            >Ouvrir l'éditeur</span
                          >
                        </div>
                        <ArrowRightIcon
                          class="h-3.5 w-3.5 text-primary/60 group-hover:translate-x-0.5 transition-transform"
                        />
                      </NuxtLink>
                    </div>
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
          <div class="h-5 w-px bg-border mx-1" />

          <template v-if="isAuthenticated">
            <NuxtLink to="/render">
              <Button size="sm" class="rounded-full text-sm gap-1.5">
                <LayoutDashboardIcon class="h-3.5 w-3.5" />
                Mon espace
              </Button>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login">
              <Button variant="ghost" size="sm" class="text-sm">
                Connexion
              </Button>
            </NuxtLink>
            <NuxtLink to="/auth/register">
              <Button size="sm" class="rounded-full text-sm gap-1.5">
                <SparklesIcon class="h-3.5 w-3.5" />
                Essayer gratuitement
              </Button>
            </NuxtLink>
          </template>
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
            <SheetContent side="right" class="w-80 p-0 overflow-y-auto">
              <div class="flex flex-col h-full">
                <!-- Header -->
                <div
                  class="flex items-center justify-between px-4 h-14 border-b"
                >
                  <NuxtLink
                    to="/"
                    class="flex items-center"
                    @click="mobileOpen = false"
                  >
                    <AppLogo />
                  </NuxtLink>
                </div>

                <!-- Nav mobile -->
                <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                  <NuxtLink
                    to="/"
                    :class="mobileLinkClass('/')"
                    @click="mobileOpen = false"
                  >
                    <HomeIcon class="h-4 w-4" />
                    Accueil
                  </NuxtLink>

                  <!-- Section Fonctionnalités -->
                  <button
                    class="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors text-left"
                    @click="mobileFeatOpen = !mobileFeatOpen"
                  >
                    <span class="flex items-center gap-3">
                      <ZapIcon class="h-4 w-4 text-muted-foreground" />
                      <span class="font-medium">Fonctionnalités</span>
                    </span>
                    <ChevronDownIcon
                      class="h-4 w-4 text-muted-foreground transition-transform duration-200"
                      :class="{ 'rotate-180': mobileFeatOpen }"
                    />
                  </button>
                  <div
                    v-if="mobileFeatOpen"
                    class="ml-6 border-l pl-3 flex flex-col gap-0.5 mb-1"
                  >
                    <NuxtLink
                      v-for="feat in featuresMenu"
                      :key="feat.to"
                      :to="feat.to"
                      class="flex items-center gap-2 py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                      @click="mobileOpen = false"
                    >
                      <component :is="feat.icon" class="h-3.5 w-3.5 shrink-0" />
                      {{ feat.label }}
                    </NuxtLink>
                  </div>

                  <NuxtLink
                    to="/pricing"
                    :class="mobileLinkClass('/pricing')"
                    @click="mobileOpen = false"
                  >
                    <TagIcon class="h-4 w-4" />
                    Tarifs
                  </NuxtLink>

                  <NuxtLink
                    to="/docs"
                    :class="mobileLinkClass('/docs')"
                    @click="mobileOpen = false"
                  >
                    <BookOpenIcon class="h-4 w-4" />
                    Documentation
                  </NuxtLink>

                  <!-- Section Entreprise -->
                  <button
                    class="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors text-left"
                    @click="mobileCompanyOpen = !mobileCompanyOpen"
                  >
                    <span class="flex items-center gap-3">
                      <BuildingIcon class="h-4 w-4 text-muted-foreground" />
                      <span class="font-medium">Entreprise</span>
                    </span>
                    <ChevronDownIcon
                      class="h-4 w-4 text-muted-foreground transition-transform duration-200"
                      :class="{ 'rotate-180': mobileCompanyOpen }"
                    />
                  </button>
                  <div
                    v-if="mobileCompanyOpen"
                    class="ml-6 border-l pl-3 flex flex-col gap-0.5 mb-1"
                  >
                    <NuxtLink
                      v-for="item in companyMenu"
                      :key="item.to"
                      :to="item.to"
                      class="flex items-center gap-2 py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
                      @click="mobileOpen = false"
                    >
                      <component :is="item.icon" class="h-3.5 w-3.5 shrink-0" />
                      {{ item.label }}
                    </NuxtLink>
                  </div>

                  <!-- CTA éditeur -->
                  <div class="mt-2 pt-2 border-t">
                    <NuxtLink
                      to="/render"
                      class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-primary/5 border border-primary/10 text-primary font-medium hover:bg-primary/10 transition-colors"
                      @click="mobileOpen = false"
                    >
                      <BoxIcon class="h-4 w-4" />
                      Ouvrir l'éditeur 3D
                    </NuxtLink>
                  </div>
                </div>

                <!-- Footer mobile -->
                <div class="p-4 border-t flex flex-col gap-2">
                  <LanguageSwitcher />

                  <template v-if="isAuthenticated">
                    <NuxtLink to="/render" @click="mobileOpen = false">
                      <Button class="w-full rounded-full gap-1.5" size="sm">
                        <LayoutDashboardIcon class="h-3.5 w-3.5" />
                        Mon espace
                      </Button>
                    </NuxtLink>
                  </template>
                  <template v-else>
                    <NuxtLink to="/auth/login" @click="mobileOpen = false">
                      <Button
                        variant="outline"
                        class="w-full rounded-full"
                        size="sm"
                      >
                        Connexion
                      </Button>
                    </NuxtLink>
                    <NuxtLink to="/auth/register" @click="mobileOpen = false">
                      <Button class="w-full rounded-full gap-1.5" size="sm">
                        <SparklesIcon class="h-3.5 w-3.5" />
                        Essayer gratuitement
                      </Button>
                    </NuxtLink>
                  </template>
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
import { useRoute } from 'vue-router'
import {
  MenuIcon,
  HomeIcon,
  ZapIcon,
  ChevronDownIcon,
  TagIcon,
  BookOpenIcon,
  BuildingIcon,
  BoxIcon,
  ArrowRightIcon,
  SparklesIcon,
  PaletteIcon,
  Globe2Icon,
  SunIcon,
  UsersIcon,
  SmartphoneIcon,
  HeartIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
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

const route = useRoute()
const { isAuthenticated } = useAuth()
const mobileOpen = ref(false)
const mobileFeatOpen = ref(false)
const mobileCompanyOpen = ref(false)

const NAV_LINK_BASE =
  'inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'
const NAV_LINK_ACTIVE = `${NAV_LINK_BASE} bg-accent text-accent-foreground`
const NAV_LINK_DEFAULT = `${NAV_LINK_BASE} text-foreground/80 hover:bg-accent hover:text-accent-foreground`

const MOBILE_LINK_BASE =
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors'
const MOBILE_LINK_ACTIVE = `${MOBILE_LINK_BASE} bg-accent text-accent-foreground`
const MOBILE_LINK_DEFAULT = `${MOBILE_LINK_BASE} text-foreground/80 hover:bg-accent hover:text-foreground`

function navLinkClass(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
    ? NAV_LINK_ACTIVE
    : NAV_LINK_DEFAULT
}

function mobileLinkClass(path: string) {
  return route.path === path ||
    (path !== '/' && route.path.startsWith(path + '/'))
    ? MOBILE_LINK_ACTIVE
    : MOBILE_LINK_DEFAULT
}

const featuresMenu = [
  {
    to: '/features/auto-3d',
    label: 'Génération 3D',
    desc: 'Prompt IA ou import GLB/OBJ/FBX',
    icon: BoxIcon,
    badge: null,
  },
  {
    to: '/features/materials',
    label: 'Matériaux PBR',
    desc: 'Roughness, metalness, couleur par mesh',
    icon: PaletteIcon,
    badge: null,
  },
  {
    to: '/features/360-views',
    label: 'Navigation 3D',
    desc: 'Orbite, FP, visite guidée, top-down',
    icon: Globe2Icon,
    badge: null,
  },
  {
    to: '/features/intelligent-lighting',
    label: 'Éclairage IA',
    desc: 'Ambiances et saisons en temps réel',
    icon: SunIcon,
    badge: null,
  },
  {
    to: '/features/collaboration',
    label: 'Collaboration',
    desc: 'Partage et travail en équipe',
    icon: UsersIcon,
    badge: 'Pro',
  },
  {
    to: '/features/mobile-apps',
    label: 'Accès mobile',
    desc: 'Web responsive sur tous appareils',
    icon: SmartphoneIcon,
    badge: 'Pro',
  },
]

const companyMenu = [
  {
    to: '/about',
    label: 'À propos',
    desc: 'Notre mission et notre équipe',
    icon: BuildingIcon,
  },
  {
    to: '/testimonials',
    label: 'Témoignages',
    desc: '+2 500 professionnels satisfaits',
    icon: HeartIcon,
  },
  {
    to: '/faq',
    label: 'FAQ',
    desc: 'Questions fréquentes',
    icon: HelpCircleIcon,
  },
  {
    to: '/contact',
    label: 'Contact',
    desc: 'Nous écrire ou demander une démo',
    icon: MailIcon,
  },
]
</script>
