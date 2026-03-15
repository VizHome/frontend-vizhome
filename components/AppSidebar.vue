<template>
  <!-- Desktop sidebar -->
  <aside
    class="hidden lg:flex flex-col w-64 shrink-0 border-r bg-background h-screen sticky top-0 overflow-y-auto"
  >
    <div class="flex flex-col h-full px-3 py-4 gap-1">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center px-2 py-2 mb-2">
        <AppLogo class="text-xl" />
      </NuxtLink>

      <!-- CTA Éditeur -->
      <NuxtLink to="/render">
        <Button class="w-full rounded-full mb-1" size="sm">
          <ExternalLinkIcon class="h-4 w-4 mr-2" />
          Ouvrir l'éditeur
        </Button>
      </NuxtLink>

      <!-- Galerie -->
      <NuxtLink to="/gallery">
        <Button variant="outline" class="w-full rounded-full mb-3" size="sm">
          <GridIcon class="h-4 w-4 mr-2" />
          Galerie
        </Button>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex flex-col gap-0.5 flex-1">
        <!-- Produit -->
        <p
          class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1"
        >
          Produit
        </p>

        <NuxtLink
          to="/"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/' }"
        >
          <HomeIcon class="h-4 w-4" />
          Accueil
        </NuxtLink>

        <!-- Fonctionnalités collapsible -->
        <Collapsible v-model:open="featuresOpen">
          <CollapsibleTrigger class="sidebar-link w-full">
            <ZapIcon class="h-4 w-4" />
            <span class="flex-1 text-left">Fonctionnalités</span>
            <ChevronDownIcon
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': featuresOpen }"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
              <NuxtLink
                to="/features"
                class="sidebar-sublink"
                :class="{ 'sidebar-link-active': route.path === '/features' }"
                >Vue d'ensemble</NuxtLink
              >
              <NuxtLink
                to="/features/auto-3d"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/features/auto-3d',
                }"
                >3D automatique</NuxtLink
              >
              <NuxtLink
                to="/features/materials"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/features/materials',
                }"
                >Matériaux</NuxtLink
              >
              <NuxtLink
                to="/features/360-views"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/features/360-views',
                }"
                >Vues 360°</NuxtLink
              >
              <NuxtLink
                to="/features/intelligent-lighting"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/features/intelligent-lighting',
                }"
                >Éclairage intelligent</NuxtLink
              >
              <NuxtLink
                to="/features/collaboration"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/features/collaboration',
                }"
                >Collaboration</NuxtLink
              >
              <NuxtLink
                to="/features/mobile-apps"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/features/mobile-apps',
                }"
                >Applications mobiles</NuxtLink
              >
            </div>
          </CollapsibleContent>
        </Collapsible>

        <NuxtLink
          to="/pricing"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/pricing' }"
        >
          <CreditCardIcon class="h-4 w-4" />
          Tarifs
        </NuxtLink>

        <!-- Ressources -->
        <p
          class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3"
        >
          Ressources
        </p>

        <!-- Documentation collapsible -->
        <Collapsible v-model:open="docsOpen">
          <CollapsibleTrigger class="sidebar-link w-full">
            <BookOpenIcon class="h-4 w-4" />
            <span class="flex-1 text-left">Documentation</span>
            <ChevronDownIcon
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': docsOpen }"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
              <NuxtLink
                to="/docs"
                class="sidebar-sublink"
                :class="{ 'sidebar-link-active': route.path === '/docs' }"
                >Introduction</NuxtLink
              >
              <NuxtLink
                to="/docs/installation"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/docs/installation',
                }"
                >Installation</NuxtLink
              >
              <NuxtLink
                to="/docs/architecture"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/docs/architecture',
                }"
                >Architecture</NuxtLink
              >
              <NuxtLink
                to="/docs/interface"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/docs/interface',
                }"
                >Interface</NuxtLink
              >
              <NuxtLink
                to="/docs/photos"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/docs/photos',
                }"
                >Photos</NuxtLink
              >
              <NuxtLink
                to="/docs/api"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path.startsWith('/docs/api'),
                }"
                >API</NuxtLink
              >
              <NuxtLink
                to="/docs/sdk"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path.startsWith('/docs/sdk'),
                }"
                >SDK</NuxtLink
              >
            </div>
          </CollapsibleContent>
        </Collapsible>

        <NuxtLink
          to="/faq"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/faq' }"
        >
          <HelpCircleIcon class="h-4 w-4" />
          FAQ
        </NuxtLink>

        <!-- Entreprise -->
        <p
          class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3"
        >
          Entreprise
        </p>

        <NuxtLink
          to="/about"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/about' }"
        >
          <UsersIcon class="h-4 w-4" />
          À propos
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/contact' }"
        >
          <MailIcon class="h-4 w-4" />
          Contact
        </NuxtLink>

        <NuxtLink
          to="/testimonials"
          class="sidebar-link"
          :class="{ 'sidebar-link-active': route.path === '/testimonials' }"
        >
          <StarIcon class="h-4 w-4" />
          Témoignages
        </NuxtLink>

        <!-- Légal collapsible -->
        <Collapsible v-model:open="legalOpen">
          <CollapsibleTrigger class="sidebar-link w-full">
            <ShieldIcon class="h-4 w-4" />
            <span class="flex-1 text-left">Légal</span>
            <ChevronDownIcon
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': legalOpen }"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
              <NuxtLink
                to="/legal/terms-of-use"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/legal/terms-of-use',
                }"
                >CGU</NuxtLink
              >
              <NuxtLink
                to="/legal/privacy-policy"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/legal/privacy-policy',
                }"
                >Confidentialité</NuxtLink
              >
              <NuxtLink
                to="/legal/cookie-policy"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active': route.path === '/legal/cookie-policy',
                }"
                >Cookies</NuxtLink
              >
              <NuxtLink
                to="/legal/data-processing"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/legal/data-processing',
                }"
                >Données</NuxtLink
              >
              <NuxtLink
                to="/legal/refund-cancellation-policy"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/legal/refund-cancellation-policy',
                }"
                >Remboursements</NuxtLink
              >
              <NuxtLink
                to="/legal/responsible-use-policy"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/legal/responsible-use-policy',
                }"
                >Usage responsable</NuxtLink
              >
              <NuxtLink
                to="/legal/specific-service-terms"
                class="sidebar-sublink"
                :class="{
                  'sidebar-link-active':
                    route.path === '/legal/specific-service-terms',
                }"
                >CGV spécifiques</NuxtLink
              >
            </div>
          </CollapsibleContent>
        </Collapsible>
      </nav>

      <!-- Bottom -->
      <div class="mt-auto pt-3 border-t flex flex-col gap-2">
        <div class="flex items-center justify-between px-1">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
        <div class="flex gap-2">
          <NuxtLink to="/auth/login" class="flex-1">
            <Button variant="outline" class="w-full rounded-full" size="sm"
              >Connexion</Button
            >
          </NuxtLink>
          <NuxtLink to="/auth/register" class="flex-1">
            <Button class="w-full rounded-full" size="sm">Essayer</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile top bar + drawer -->
  <div class="lg:hidden">
    <div
      class="fixed top-0 left-0 right-0 z-40 flex items-center h-14 px-4 border-b bg-background/95 backdrop-blur-sm"
    >
      <Sheet v-model:open="mobileOpen">
        <SheetTrigger as-child>
          <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
            <MenuIcon class="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-64 p-0 overflow-y-auto">
          <div class="flex flex-col h-full px-3 py-4 gap-1">
            <!-- Logo -->
            <NuxtLink
              to="/"
              class="flex items-center px-2 py-2 mb-2"
              @click="mobileOpen = false"
            >
              <AppLogo class="text-xl" />
            </NuxtLink>

            <!-- CTA Éditeur -->
            <NuxtLink to="/render" @click="mobileOpen = false">
              <Button class="w-full rounded-full mb-1" size="sm">
                <ExternalLinkIcon class="h-4 w-4 mr-2" />
                Ouvrir l'éditeur
              </Button>
            </NuxtLink>

            <!-- Galerie -->
            <NuxtLink to="/gallery" @click="mobileOpen = false">
              <Button
                variant="outline"
                class="w-full rounded-full mb-3"
                size="sm"
              >
                <GridIcon class="h-4 w-4 mr-2" />
                Galerie
              </Button>
            </NuxtLink>

            <!-- Navigation mobile (même structure) -->
            <nav class="flex flex-col gap-0.5 flex-1">
              <p
                class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1"
              >
                Produit
              </p>

              <NuxtLink
                to="/"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': route.path === '/' }"
                @click="mobileOpen = false"
              >
                <HomeIcon class="h-4 w-4" />
                Accueil
              </NuxtLink>

              <Collapsible v-model:open="mobileFeaturesOpen">
                <CollapsibleTrigger class="sidebar-link w-full">
                  <ZapIcon class="h-4 w-4" />
                  <span class="flex-1 text-left">Fonctionnalités</span>
                  <ChevronDownIcon
                    class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'rotate-180': mobileFeaturesOpen }"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
                    <NuxtLink
                      to="/features"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Vue d'ensemble</NuxtLink
                    >
                    <NuxtLink
                      to="/features/auto-3d"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >3D automatique</NuxtLink
                    >
                    <NuxtLink
                      to="/features/materials"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Matériaux</NuxtLink
                    >
                    <NuxtLink
                      to="/features/360-views"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Vues 360°</NuxtLink
                    >
                    <NuxtLink
                      to="/features/intelligent-lighting"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Éclairage intelligent</NuxtLink
                    >
                    <NuxtLink
                      to="/features/collaboration"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Collaboration</NuxtLink
                    >
                    <NuxtLink
                      to="/features/mobile-apps"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Applications mobiles</NuxtLink
                    >
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <NuxtLink
                to="/pricing"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': route.path === '/pricing' }"
                @click="mobileOpen = false"
              >
                <CreditCardIcon class="h-4 w-4" />
                Tarifs
              </NuxtLink>

              <p
                class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3"
              >
                Ressources
              </p>

              <Collapsible v-model:open="mobileDocsOpen">
                <CollapsibleTrigger class="sidebar-link w-full">
                  <BookOpenIcon class="h-4 w-4" />
                  <span class="flex-1 text-left">Documentation</span>
                  <ChevronDownIcon
                    class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'rotate-180': mobileDocsOpen }"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
                    <NuxtLink
                      to="/docs"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Introduction</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/installation"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Installation</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/architecture"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Architecture</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/interface"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Interface</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/photos"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Photos</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/api"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >API</NuxtLink
                    >
                    <NuxtLink
                      to="/docs/sdk"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >SDK</NuxtLink
                    >
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <NuxtLink
                to="/faq"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': route.path === '/faq' }"
                @click="mobileOpen = false"
              >
                <HelpCircleIcon class="h-4 w-4" />
                FAQ
              </NuxtLink>

              <p
                class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3"
              >
                Entreprise
              </p>

              <NuxtLink
                to="/about"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': route.path === '/about' }"
                @click="mobileOpen = false"
              >
                <UsersIcon class="h-4 w-4" />
                À propos
              </NuxtLink>

              <NuxtLink
                to="/contact"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': route.path === '/contact' }"
                @click="mobileOpen = false"
              >
                <MailIcon class="h-4 w-4" />
                Contact
              </NuxtLink>

              <NuxtLink
                to="/testimonials"
                class="sidebar-link"
                :class="{
                  'sidebar-link-active': route.path === '/testimonials',
                }"
                @click="mobileOpen = false"
              >
                <StarIcon class="h-4 w-4" />
                Témoignages
              </NuxtLink>

              <Collapsible v-model:open="mobileLegalOpen">
                <CollapsibleTrigger class="sidebar-link w-full">
                  <ShieldIcon class="h-4 w-4" />
                  <span class="flex-1 text-left">Légal</span>
                  <ChevronDownIcon
                    class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'rotate-180': mobileLegalOpen }"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="ml-4 mt-0.5 flex flex-col gap-0.5 border-l pl-3">
                    <NuxtLink
                      to="/legal/terms-of-use"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >CGU</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/privacy-policy"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Confidentialité</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/cookie-policy"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Cookies</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/data-processing"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Données</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/refund-cancellation-policy"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Remboursements</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/responsible-use-policy"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >Usage responsable</NuxtLink
                    >
                    <NuxtLink
                      to="/legal/specific-service-terms"
                      class="sidebar-sublink"
                      @click="mobileOpen = false"
                      >CGV spécifiques</NuxtLink
                    >
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </nav>

            <!-- Bottom mobile -->
            <div class="mt-auto pt-3 border-t flex flex-col gap-2">
              <div class="flex items-center justify-between px-1">
                <LanguageSwitcher />
                <ModeToggle />
              </div>
              <div class="flex gap-2">
                <NuxtLink
                  to="/auth/login"
                  class="flex-1"
                  @click="mobileOpen = false"
                >
                  <Button
                    variant="outline"
                    class="w-full rounded-full"
                    size="sm"
                    >Connexion</Button
                  >
                </NuxtLink>
                <NuxtLink
                  to="/auth/register"
                  class="flex-1"
                  @click="mobileOpen = false"
                >
                  <Button class="w-full rounded-full" size="sm">Essayer</Button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <NuxtLink to="/" class="ml-3 flex items-center">
        <AppLogo class="text-lg" />
      </NuxtLink>
    </div>

    <!-- Spacer -->
    <div class="h-14" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MenuIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  GridIcon,
  HomeIcon,
  ZapIcon,
  CreditCardIcon,
  BookOpenIcon,
  HelpCircleIcon,
  UsersIcon,
  MailIcon,
  StarIcon,
  ShieldIcon,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const route = useRoute()

const mobileOpen = ref(false)

// Desktop collapsibles — auto-ouverts si on est sur une sous-page
const featuresOpen = ref(route.path.startsWith('/features'))
const docsOpen = ref(route.path.startsWith('/docs'))
const legalOpen = ref(route.path.startsWith('/legal'))

// Mobile collapsibles
const mobileFeaturesOpen = ref(route.path.startsWith('/features'))
const mobileDocsOpen = ref(route.path.startsWith('/docs'))
const mobileLegalOpen = ref(route.path.startsWith('/legal'))
</script>

<style>
.sidebar-link {
  @apply flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors;
}
.sidebar-link-active {
  @apply bg-accent text-foreground font-medium;
}
.sidebar-sublink {
  @apply block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors;
}
</style>
