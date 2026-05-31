<!--
  ForumHeader — barre de nav dédiée au forum, distincte du AppNavbar marketing.
  Plus minimaliste, orientée action (recherche + nouveau sujet + user menu).
-->
<template>
  <header
    class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 h-14">
        <!-- Logo + label "Forum" -->
        <NuxtLink
          to="/forum"
          class="flex items-center gap-2 shrink-0"
          aria-label="Accueil du forum VizHome"
        >
          <AppLogo />
          <span
            class="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
          >
            <MessagesSquareIcon class="h-2.5 w-2.5" />
            Forum
          </span>
        </NuxtLink>

        <!-- Lien retour site -->
        <NuxtLink
          to="/"
          class="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon class="h-3.5 w-3.5" />
          Retour à VizHome
        </NuxtLink>

        <!-- Barre de recherche (centre, flex-1) -->
        <div class="flex-1 max-w-md mx-auto">
          <form class="relative" @submit.prevent="onSearch">
            <SearchIcon
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            />
            <Input
              v-model="searchInput"
              type="search"
              placeholder="Rechercher dans le forum…"
              class="pl-9 pr-4 h-9 rounded-full text-sm"
            />
          </form>
        </div>

        <!-- Actions droite -->
        <div class="flex items-center gap-2 shrink-0">
          <ModeToggle />

          <!-- Bouton "Nouveau sujet" (toujours visible) -->
          <Button
            v-if="isAuthenticated"
            as-child
            size="sm"
            class="rounded-full gap-1.5 h-9"
          >
            <NuxtLink to="/forum/new">
              <PlusIcon class="h-3.5 w-3.5" />
              <span class="hidden sm:inline">Nouveau sujet</span>
            </NuxtLink>
          </Button>
          <Button
            v-else
            as-child
            size="sm"
            class="rounded-full gap-1.5 h-9"
          >
            <NuxtLink
              :to="`/auth/login?redirect=${encodeURIComponent($route.fullPath)}`"
            >
              <LogInIcon class="h-3.5 w-3.5" />
              <span class="hidden sm:inline">Se connecter</span>
            </NuxtLink>
          </Button>

          <!-- User menu (si connecté) -->
          <DropdownMenu v-if="isAuthenticated && user.user.value">
            <DropdownMenuTrigger as-child>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                :aria-label="`Menu de ${user.user.value.name}`"
              >
                {{ initials(user.user.value.name) }}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <div class="px-2 py-1.5">
                <p class="text-sm font-medium truncate">{{ user.user.value.name }}</p>
                <p class="text-xs text-muted-foreground truncate">{{ user.user.value.email }}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem as-child>
                <NuxtLink to="/render" class="cursor-pointer">
                  <BoxIcon class="h-4 w-4 mr-2" />
                  Ouvrir l'éditeur
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <NuxtLink to="/projects" class="cursor-pointer">
                  <FolderIcon class="h-4 w-4 mr-2" />
                  Mes projets
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <NuxtLink to="/gallery" class="cursor-pointer">
                  <ImageIcon class="h-4 w-4 mr-2" />
                  Mes rendus
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="cursor-pointer" @click="onLogout">
                <LogOutIcon class="h-4 w-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Nav secondaire : raccourcis catégories (desktop only) -->
      <nav
        v-if="categoriesNav.length > 0"
        class="hidden lg:flex items-center gap-1 h-10 -mt-px border-t pt-1.5 overflow-x-auto scrollbar-hide"
      >
        <NuxtLink
          to="/forum"
          :class="[
            'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors',
            $route.path === '/forum'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
          ]"
        >
          Tous
        </NuxtLink>
        <NuxtLink
          v-for="cat in categoriesNav"
          :key="cat.slug"
          :to="`/forum/${cat.slug}`"
          :class="[
            'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors',
            $route.params.category === cat.slug
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
          ]"
        >
          {{ cat.name }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  BoxIcon,
  FolderIcon,
  ImageIcon,
  LogInIcon,
  LogOutIcon,
  MessagesSquareIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const user = useUser()
const forum = useForum()

const isAuthenticated = computed(() => !!auth.tokens.value)

// Charge les cats si pas déjà en cache (pour la nav secondaire)
if (forum.categories.value.length === 0) {
  forum.loadCategories()
}

// Nav secondaire = 5 premières cats (déjà ordonnées par `order` côté backend)
const categoriesNav = computed(() => forum.categories.value.slice(0, 6))

// ─── Recherche ─────────────────────────────────────────────────────────
// Pré-rempli si on est sur une page de catégorie avec ?search=
const searchInput = ref<string>((route.query.search as string) || '')

watch(
  () => route.query.search,
  q => {
    if (typeof q === 'string') searchInput.value = q
  }
)

async function onSearch() {
  const q = searchInput.value.trim()
  // Si on est déjà sur une page de cat, on reste dessus et on filtre
  if (route.params.category) {
    await router.push({
      path: route.path,
      query: { ...route.query, search: q || undefined },
    })
  } else {
    // Sinon on va sur /forum avec le filtre
    await router.push({ path: '/forum', query: { search: q || undefined } })
  }
}

// ─── Logout ────────────────────────────────────────────────────────────
async function onLogout() {
  try {
    await auth.logout()
  } finally {
    await router.push('/forum')
  }
}

// ─── Helper ────────────────────────────────────────────────────────────
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

<style scoped>
/* Cache la scrollbar horizontale de la nav cats sans casser le scroll */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
