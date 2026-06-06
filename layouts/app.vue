<!--
  Layout `app` — pages "espace utilisateur connecté"
  (/account/*, /projects, /gallery, et toute future page non-render).

  Inclut une `ServiceNav` qui permet à l'utilisateur de naviguer entre les
  sections principales (Projets / Galerie / Forum / Support / Abonnement)
  sans devoir passer par le menu avatar à chaque fois.

  Structure : topbar sticky (logo + retour + ServiceNav + avatar) + main scrollable.
-->
<template>
  <div class="min-h-screen flex flex-col bg-background">
    <header
      class="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <!-- Logo (retour à la page render = home app) -->
      <NuxtLink
        to="/render"
        class="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
        aria-label="Retour à l'application"
      >
        <AppLogo />
      </NuxtLink>

      <Separator orientation="vertical" class="mx-1 h-5" />

      <!-- Lien retour app -->
      <NuxtLink
        to="/render"
        class="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ArrowLeftIcon class="size-3" />
        Retour à l'application
      </NuxtLink>

      <!-- Nav sections (centrée sur desktop) -->
      <div class="hidden lg:flex flex-1 justify-center">
        <ServiceNav />
      </div>

      <!-- Spacer + avatar à droite -->
      <div class="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserNav :floating="false" />
      </div>
    </header>

    <!-- Nav sections (en bas de topbar sur mobile/tablet) -->
    <div class="lg:hidden border-b bg-background/95 backdrop-blur px-4 py-2 overflow-x-auto">
      <ServiceNav />
    </div>

    <main class="flex-1 bg-muted/20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
</script>
