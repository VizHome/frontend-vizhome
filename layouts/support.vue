<!--
  Layout `support` — pages /support/* (helpdesk utilisateur).

  Structure :
  - Topbar minimaliste (logo + retour app + theme + avatar)
  - Sous-bandeau identitaire "Centre de support" avec breadcrumb dynamique
    et CTA "Nouveau ticket" toujours accessible (sauf sur /support/new)
  - <main> sur bg-muted/20

  Différencié du layout `account` par :
  - L'icône LifeBuoy + titre "Centre de support" qui rappelle le contexte
  - Le CTA permanent vers /support/new (action principale du parcours)
-->
<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Topbar minimal -->
    <header
      class="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <NuxtLink
        to="/render"
        class="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
        aria-label="Retour à l'application"
      >
        <AppLogo />
      </NuxtLink>

      <Separator orientation="vertical" class="mx-1 h-5" />

      <NuxtLink
        to="/render"
        class="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon class="size-3" />
        Retour à l'application
      </NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserNav :floating="false" />
      </div>
    </header>

    <!-- Sous-bandeau identitaire support -->
    <section
      class="border-b bg-gradient-to-r from-primary/5 via-background to-background"
    >
      <div class="mx-auto max-w-5xl px-4 sm:px-6 py-5 flex items-center gap-4">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          <LifeBuoyIcon class="size-5" />
        </div>

        <div class="min-w-0 flex-1">
          <nav class="text-xs text-muted-foreground flex items-center gap-1.5 mb-0.5">
            <NuxtLink to="/render" class="hover:text-foreground">App</NuxtLink>
            <ChevronRightIcon class="size-3" />
            <NuxtLink to="/support" class="hover:text-foreground">Support</NuxtLink>
            <template v-if="subRoute">
              <ChevronRightIcon class="size-3" />
              <span class="text-foreground">{{ subRoute }}</span>
            </template>
          </nav>
          <h2 class="text-base font-semibold leading-tight">
            Centre de support
          </h2>
          <p class="text-xs text-muted-foreground mt-0.5 hidden sm:block">
            Une question, un bug, un souci de facturation ? On te répond sous 24-48 h.
          </p>
        </div>

        <Button
          v-if="route.path !== '/support/new'"
          as-child
          size="sm"
          class="rounded-full gap-1.5 shrink-0"
        >
          <NuxtLink to="/support/new">
            <PlusIcon class="size-3.5" />
            <span class="hidden sm:inline">Nouveau ticket</span>
            <span class="sm:hidden">Nouveau</span>
          </NuxtLink>
        </Button>
      </div>
    </section>

    <main class="flex-1 bg-muted/20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LifeBuoyIcon,
  PlusIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

const route = useRoute()

// Breadcrumb dynamique : "Nouveau" sur /support/new, "#42" sur /support/42, sinon rien
const subRoute = computed(() => {
  if (route.path === '/support/new') return 'Nouveau ticket'
  if (route.path.startsWith('/support/') && route.params.id) {
    return `#${route.params.id}`
  }
  return null
})
</script>
