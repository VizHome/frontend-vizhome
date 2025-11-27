<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b"
    >
      <div class="container mx-auto">
        <nav class="flex items-center justify-between h-16">
          <div class="flex items-center gap-6">
            <NuxtLink to="/" class="hidden lg:flex items-center">
              <span
                class="font-bold text-2xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
                >Viz<span class="text-primary">Home</span></span
              >
            </NuxtLink>
            <div class="hidden md:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      >Fonctionnalités</NavigationMenuTrigger
                    >
                    <NavigationMenuContent>
                      <div
                        class="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]"
                      >
                        <div class="col-span-full mb-2">
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features"
                              class="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-muted/50"
                            >
                              <div
                                class="text-sm font-medium leading-none mb-1"
                              >
                                Toutes nos fonctionnalités
                              </div>
                              <p
                                class="text-sm leading-snug text-muted-foreground"
                              >
                                Découvrez l'ensemble des capacités de VizHome
                                pour vos projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </div>

                        <Separator class="col-span-full my-1" />

                        <div class="col-span-full grid md:grid-cols-2 gap-3">
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/auto-3d"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Génération 3D automatique
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Transformez instantanément vos photos en modèles
                                3D détaillés
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/materials"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Bibliothèque de matériaux
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Plus de 10 000 matériaux photoréalistes pour vos
                                projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/360-views"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Vues 360° immersives
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Créez des visites virtuelles interactives et
                                captivantes
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/intelligent-lighting"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Éclairage intelligent
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Simulation d'éclairage réaliste pour des rendus
                                époustouflants
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/collaboration"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Partage et collaboration
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Travaillez en équipe et partagez facilement vos
                                projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/features/mobile-apps"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Applications mobiles
                              </div>
                              <p
                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                              >
                                Emportez VizHome partout avec nos apps iOS et
                                Android
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>À propos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div
                        class="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]"
                      >
                        <div class="col-span-full mb-2">
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/about"
                              class="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-muted/50"
                            >
                              <div
                                class="text-sm font-medium leading-none mb-1"
                              >
                                À propos de VizHome
                              </div>
                              <p
                                class="text-sm leading-snug text-muted-foreground"
                              >
                                Notre entreprise, notre mission et notre vision
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </div>

                        <Separator class="col-span-full my-1" />

                        <div class="grid grid-cols-2 gap-3">
                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/contact"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Contact
                              </div>
                              <p
                                class="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1"
                              >
                                Nous contacter pour toute question
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>

                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/faq"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                FAQ
                              </div>
                              <p
                                class="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1"
                              >
                                Questions fréquemment posées
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>

                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/testimonials"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Témoignages
                              </div>
                              <p
                                class="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1"
                              >
                                Ce que disent nos clients
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>

                          <NavigationMenuLink as-child>
                            <NuxtLink
                              to="/"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div class="text-sm font-medium leading-none">
                                Blog
                              </div>
                              <p
                                class="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1"
                              >
                                Articles et actualités
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NuxtLink to="/pricing">
                      <NavigationMenuLink
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        Tarifs
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NuxtLink to="/docs">
                      <NavigationMenuLink
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        Documentation
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <LanguageSwitcher />
            </div>
            <ModeToggle />
            <div class="hidden md:flex items-center gap-2">
              <NuxtLink to="/auth/login">
                <Button variant="ghost">Connexion</Button>
              </NuxtLink>
              <NuxtLink to="/auth/register">
                <Button>Essayer gratuitement</Button>
              </NuxtLink>
            </div>
            <Sheet>
              <SheetTrigger class="block md:hidden">
                <Button variant="ghost" size="icon">
                  <MenuIcon class="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" class="px-0">
                <SheetHeader class="px-4">
                  <SheetTitle>VizHome</SheetTitle>
                  <SheetDescription
                    >Une solution d'intégration 3D architecturale par
                    IA</SheetDescription
                  >
                </SheetHeader>

                <div class="py-4">
                  <h3
                    class="px-4 mb-2 text-sm font-medium text-muted-foreground"
                  >
                    Navigation
                  </h3>

                  <div class="space-y-px">
                    <NuxtLink to="/" @click="$emit('close')">
                      <div class="px-4 py-3 hover:bg-accent flex items-center">
                        <HomeIcon class="h-4 w-4 mr-2" />
                        Accueil
                      </div>
                    </NuxtLink>

                    <div class="collapsible">
                      <div
                        class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent"
                        @click="openFonctionnalites = !openFonctionnalites"
                      >
                        <div class="flex items-center">
                          <PuzzleIcon class="h-4 w-4 mr-2" />
                          Fonctionnalités
                        </div>
                        <ChevronDown
                          class="h-4 w-4"
                          :class="{
                            'transform rotate-180': openFonctionnalites,
                          }"
                        />
                      </div>
                      <div v-if="openFonctionnalites" class="bg-muted/20">
                        <NuxtLink to="/features" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">
                            Toutes les fonctionnalités
                          </div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/auto-3d"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">
                            Génération 3D
                          </div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/materials"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">Matériaux</div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/360-views"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">Vues 360°</div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/intelligent-lighting"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">
                            Éclairage intelligent
                          </div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/collaboration"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">
                            Collaboration
                          </div>
                        </NuxtLink>
                        <NuxtLink
                          to="/features/mobile-apps"
                          @click="$emit('close')"
                        >
                          <div class="px-8 py-3 hover:bg-accent">
                            Applications mobiles
                          </div>
                        </NuxtLink>
                      </div>
                    </div>

                    <div class="collapsible">
                      <div
                        class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent"
                        @click="openAPropos = !openAPropos"
                      >
                        <div class="flex items-center">
                          <InfoIcon class="h-4 w-4 mr-2" />
                          À propos
                        </div>
                        <ChevronDown
                          class="h-4 w-4"
                          :class="{ 'transform rotate-180': openAPropos }"
                        />
                      </div>
                      <div v-if="openAPropos" class="bg-muted/20">
                        <NuxtLink to="/about" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">
                            À propos de nous
                          </div>
                        </NuxtLink>
                        <NuxtLink to="/about#team" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">
                            Notre équipe
                          </div>
                        </NuxtLink>
                        <NuxtLink to="/testimonials" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">
                            Témoignages
                          </div>
                        </NuxtLink>
                        <NuxtLink to="/faq" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">FAQ</div>
                        </NuxtLink>
                        <NuxtLink to="/contact" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">Contact</div>
                        </NuxtLink>
                        <NuxtLink to="/" @click="$emit('close')">
                          <div class="px-8 py-3 hover:bg-accent">Blog</div>
                        </NuxtLink>
                      </div>
                    </div>

                    <NuxtLink to="/pricing" @click="$emit('close')">
                      <div class="px-4 py-3 hover:bg-accent flex items-center">
                        <TagIcon class="h-4 w-4 mr-2" />
                        Tarifs
                      </div>
                    </NuxtLink>

                    <NuxtLink to="/docs" @click="$emit('close')">
                      <div class="px-4 py-3 hover:bg-accent flex items-center">
                        <FileTextIcon class="h-4 w-4 mr-2" />
                        Documentation
                      </div>
                    </NuxtLink>
                  </div>

                  <div class="mt-6">
                    <h3
                      class="px-4 mb-2 text-sm font-medium text-muted-foreground"
                    >
                      Compte
                    </h3>

                    <div class="space-y-px">
                      <NuxtLink to="/auth/login" @click="$emit('close')">
                        <div
                          class="px-4 py-3 hover:bg-accent flex items-center"
                        >
                          <UserIcon class="h-4 w-4 mr-2" />
                          Connexion
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="px-4 pt-4">
                    <NuxtLink to="/auth/register" @click="$emit('close')">
                      <Button class="w-full">Essayer gratuitement</Button>
                    </NuxtLink>
                  </div>

                  <div class="mt-8 flex justify-center space-x-4">
                    <a
                      href="#"
                      class="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <LinkedinIcon class="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      class="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <TwitterIcon class="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/vizhome"
                      class="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <GithubIcon class="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t">
      <div class="container mx-auto py-12 px-4">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div class="md:col-span-1">
            <NuxtLink to="/" class="inline-block mb-4">
              <span class="font-bold text-2xl"
                >Viz<span class="text-primary">Home</span></span
              >
            </NuxtLink>
            <p class="text-muted-foreground max-w-md mb-4">
              Solution d'intégration 3D architecturale par IA pour des rendus
              photoréalistes.
            </p>
            <div class="flex items-center gap-3 mt-4">
              <Button variant="outline" size="icon" aria-label="LinkedIn">
                <LinkedinIcon class="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Twitter">
                <TwitterIcon class="h-4 w-4" />
              </Button>
              <a
                href="https://github.com/vizhome"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" aria-label="GitHub">
                  <GithubIcon class="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-medium text-base mb-3">Produit</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink
                  to="/features"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fonctionnalités
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/pricing"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tarifs
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/faq"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-medium text-base mb-3">Entreprise</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink
                  to="/about"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  À propos
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/testimonials"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Témoignages
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-medium text-base mb-3">Ressources</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink
                  to="/docs"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span> Documentation </span>
                  <span class="text-(--ui-text-dimmed) inline-block">
                    <ArrowUpRight class="size-3" />
                  </span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/docs/api"
                  class="text-muted-foreground hover:text-foreground transition-colors flex item-center"
                >
                  <span> API </span>
                  <span class="text-(--ui-text-dimmed) inline-block">
                    <ArrowUpRight class="size-3" />
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-medium text-base mb-3">Légal</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink
                  to="/legal/terms-of-use"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conditions d'utilisation
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/legal/privacy-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Politique de confidentialité
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/legal/cookie-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Politique de cookies
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/legal/refund-cancellation-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Remboursement et annulation
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <p>
            © 2024-{{ new Date().getFullYear() }} VizHome - Tous droits
            réservés.
          </p>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/legal/terms-of-use"
              class="hover:text-foreground transition-colors"
            >
              Conditions
            </NuxtLink>
            <NuxtLink
              to="/legal/privacy-policy"
              class="hover:text-foreground transition-colors"
            >
              Confidentialité
            </NuxtLink>
            <NuxtLink
              to="/legal/cookie-policy"
              class="hover:text-foreground transition-colors"
            >
              Cookies
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  MenuIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
  ChevronDown,
  HomeIcon,
  PuzzleIcon,
  InfoIcon,
  TagIcon,
  FileTextIcon,
  UserIcon,
  ArrowUpRight,
} from 'lucide-vue-next'
import { ref } from 'vue'

import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const openFonctionnalites = ref(false)
const openAPropos = ref(false)
</script>
