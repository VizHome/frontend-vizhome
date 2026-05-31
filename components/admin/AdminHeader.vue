<!--
  AdminHeader — barre haute du panel admin, distincte du marketing + forum.
  Identité visuelle "interne" : badge ADMIN rouge, lien retour vers /forum
  ou /render selon contexte, user menu.
-->
<template>
  <header
    class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 h-14">
        <!-- Logo + badge ADMIN -->
        <NuxtLink
          to="/admin"
          class="flex items-center gap-2 shrink-0"
          aria-label="Accueil du panel admin"
        >
          <AppLogo />
          <span
            class="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-500"
          >
            <ShieldIcon class="h-2.5 w-2.5" />
            Admin
          </span>
        </NuxtLink>

        <!-- Lien retour -->
        <NuxtLink
          to="/render"
          class="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon class="h-3.5 w-3.5" />
          Retour à l'app
        </NuxtLink>

        <!-- Nav admin (drill-down pages) -->
        <nav class="hidden md:flex items-center gap-0.5 ml-2">
          <NuxtLink
            v-for="link in adminNav"
            :key="link.to"
            :to="link.to"
            :class="[
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              $route.path === link.to
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Info dernière maj -->
        <div class="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span v-if="lastUpdated" class="hidden sm:inline">
            Maj {{ lastUpdated }}
          </span>
        </div>

        <!-- Actions droite -->
        <div class="flex items-center gap-2 shrink-0">
          <ModeToggle />
          <button
            type="button"
            class="inline-flex h-9 items-center justify-center rounded-full bg-secondary px-3 text-xs font-medium gap-1.5 hover:bg-secondary/80 transition-colors disabled:opacity-50"
            :disabled="refreshing"
            @click="$emit('refresh')"
          >
            <RefreshCwIcon
              class="h-3.5 w-3.5"
              :class="{ 'animate-spin': refreshing }"
            />
            <span class="hidden sm:inline">{{
              refreshing ? 'Actualisation…' : 'Actualiser'
            }}</span>
          </button>

          <div
            v-if="user.user.value"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm"
            :title="user.user.value.email"
          >
            {{ initials(user.user.value.name) }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, RefreshCwIcon, ShieldIcon } from 'lucide-vue-next'

defineProps<{
  lastUpdated?: string
  refreshing?: boolean
}>()

defineEmits<{
  refresh: []
}>()

const user = useUser()

const adminNav = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/renders', label: 'Renders' },
]

function initials(name: string): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}
</script>
