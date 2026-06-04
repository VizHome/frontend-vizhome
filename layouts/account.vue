<!--
  Layout `account` — pages personnelles de l'utilisateur connecté
  (/account/billing pour l'instant, extensible à /account/security, /account/api-keys, etc.)

  Différent du layout `default` (marketing avec AppNavbar : Fonctionnalités/Tarifs/Docs)
  car l'utilisateur n'a pas besoin de re-voir les liens marketing une fois connecté.

  Structure : topbar sticky minimaliste (logo + bouton retour app + avatar UserNav)
  + main scrollable. Pas de footer pour économiser l'espace.
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
        class="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon class="size-3" />
        Retour à l'application
      </NuxtLink>

      <!-- Spacer + avatar à droite -->
      <div class="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserNav />
      </div>
    </header>

    <main class="flex-1 bg-muted/20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
</script>
