<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div class="container mx-auto">
        <nav class="flex items-center justify-between h-16">
          <div class="flex items-center gap-6">
            <NuxtLink to="/" class="flex items-center">
              <span
                class="font-bold text-2xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">Viz<span
                  class="text-primary">Home</span></span>
            </NuxtLink>
            <div class="hidden md:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Fonctionnalités</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div class="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                        <div class="col-span-full mb-2">
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features"
                              class="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-muted/50">
                              <div class="text-sm font-medium leading-none mb-1">Toutes nos fonctionnalités</div>
                              <p class="text-sm leading-snug text-muted-foreground">
                                Découvrez l'ensemble des capacités de VizHome pour vos projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </div>

                        <Separator class="col-span-full my-1" />

                        <div class="col-span-full grid md:grid-cols-2 gap-3">
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/auto-3d"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Génération 3D automatique</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Transformez instantanément vos photos en modèles 3D détaillés
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/materials"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Bibliothèque de matériaux</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Plus de 10 000 matériaux photoréalistes pour vos projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/360-views"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Vues 360° immersives</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Créez des visites virtuelles interactives et captivantes
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/intelligent-lighting"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Éclairage intelligent</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Simulation d'éclairage réaliste pour des rendus époustouflants
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/collaboration"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Partage et collaboration</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Travaillez en équipe et partagez facilement vos projets
                              </p>
                            </NuxtLink>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NuxtLink to="/features/mobile-apps"
                              class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div class="text-sm font-medium leading-none">Applications mobiles</div>
                              <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Emportez VizHome partout avec nos apps iOS et Android
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
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Tarifs
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NuxtLink to="/docs">
                      <NavigationMenuLink
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Documentation
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NuxtLink to="/about">
                      <NavigationMenuLink
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        À propos
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NuxtLink to="/contact">
                      <NavigationMenuLink
                        class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Contact
                      </NavigationMenuLink>
                    </NuxtLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <ModeToggle />
            <div class="hidden md:flex items-center gap-2">
              <NuxtLink to="/auth/login">
                <Button variant="ghost">Connexion</Button>
              </NuxtLink>
              <NuxtLink to="/auth/register">
                <Button>Essayer gratuitement</Button>
              </NuxtLink>
            </div>
            <!-- <Sheet>
              <SheetTrigger class="block md:hidden">
                <Button variant="ghost" size="icon">
                  <MenuIcon class="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>VizHome</SheetTitle>
                  <SheetDescription>Une solution d'intégration 3D architecturale par IA</SheetDescription>
                </SheetHeader>
                <div class="grid gap-4 py-4">
                  <NuxtLink to="/marketing/features" @click="$emit('close')">
                    <Button variant="ghost" class="w-full justify-start">Fonctionnalités</Button>
                  </NuxtLink>
                  <NuxtLink to="/marketing/pricing" @click="$emit('close')">
                    <Button variant="ghost" class="w-full justify-start">Tarifs</Button>
                  </NuxtLink>
                  <NuxtLink to="/docs" @click="$emit('close')">
                    <Button variant="ghost" class="w-full justify-start">Documentation</Button>
                  </NuxtLink>
                  <NuxtLink to="/contact" @click="$emit('close')">
                    <Button variant="ghost" class="w-full justify-start">Contact</Button>
                  </NuxtLink>
                  <Separator />
                  <NuxtLink to="/auth/login" @click="$emit('close')">
                    <Button variant="ghost" class="w-full justify-start">Connexion</Button>
                  </NuxtLink>
                  <NuxtLink to="/auth/register" @click="$emit('close')">
                    <Button class="w-full">Essayer gratuitement</Button>
                  </NuxtLink>
                </div>
              </SheetContent>
            </Sheet> -->
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
          <div class="md:col-span-2">
            <NuxtLink to="/" class="inline-block mb-4">
              <span class="font-bold text-2xl">Viz<span class="text-primary">Home</span></span>
            </NuxtLink>
            <p class="text-muted-foreground max-w-md">
              Solution SaaS d'intégration 3D architecturale par IA offrant des rendus photoréalistes pour vos projets.
            </p>
            <div class="flex items-center gap-4 mt-6">
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <LinkedinIcon class="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <TwitterIcon class="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <GithubIcon class="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <InstagramIcon class="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-3">Produit</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/features" class="text-muted-foreground hover:text-foreground transition-colors">
                  Fonctionnalités</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/pricing" class="text-muted-foreground hover:text-foreground transition-colors">
                  Tarifs</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/testimonials" class="text-muted-foreground hover:text-foreground transition-colors">
                  Témoignages</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq" class="text-muted-foreground hover:text-foreground transition-colors">FAQ
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-3">Légal</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/legal/terms-of-use"
                  class="text-muted-foreground hover:text-foreground transition-colors">Conditions d'utilisation
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/privacy-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors">Politique de confidentialité
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/cookie-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors">Politique de cookies</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/data-processing"
                  class="text-muted-foreground hover:text-foreground transition-colors">Traitement des données
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/responsible-use-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors">Charte d'utilisation</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/specific-service-terms"
                  class="text-muted-foreground hover:text-foreground transition-colors">Conditions des services
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/legal/refund-cancellation-policy"
                  class="text-muted-foreground hover:text-foreground transition-colors">Remboursement & annulation
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-3">Développeurs</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/docs" class="text-muted-foreground hover:text-foreground transition-colors">Documentation
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/docs/api" class="text-muted-foreground hover:text-foreground transition-colors">API
                </NuxtLink>
              </li>
              <li><a href="https://github.com/vizhome" target="_blank" rel="noopener noreferrer"
                  class="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {{ new Date().getFullYear() }} VizHome. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { MenuIcon, LinkedinIcon, TwitterIcon, GithubIcon, InstagramIcon } from 'lucide-vue-next'
</script>