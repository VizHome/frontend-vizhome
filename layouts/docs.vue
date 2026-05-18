<template>
  <div class="flex min-h-screen">
    <!-- Sidebar fixe -->
    <aside
      class="fixed top-0 left-0 z-40 h-screen w-72 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0"
      :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
    >
      <!-- En-tête -->
      <div
        class="h-16 flex items-center justify-between border-b px-4 bg-background"
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo />
          <Badge variant="outline" class="text-xs">Docs</Badge>
        </NuxtLink>
        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden"
          @click="toggleSidebar"
        >
          <XIcon class="h-5 w-5" />
          <span class="sr-only">Fermer</span>
        </Button>
      </div>

      <!-- Contenu sidebar -->
      <div class="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col">
        <div class="p-4 flex-1 flex flex-col">
          <!-- Bouton recherche -->
          <div class="relative mb-6">
            <Button
              variant="outline"
              class="w-full justify-between"
              @click="toggleCommandDialog"
            >
              <div class="flex items-center gap-2">
                <SearchIcon class="h-4 w-4" />
                <span class="text-sm text-muted-foreground">Rechercher…</span>
              </div>
              <div
                class="flex items-center gap-1 text-xs text-muted-foreground"
              >
                <kbd
                  class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5"
                >
                  <span class="text-xs">⌘</span>
                </kbd>
                <kbd
                  class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5"
                >
                  <span class="text-xs">K</span>
                </kbd>
              </div>
            </Button>
          </div>

          <CommandDialog
            :open="isCommandOpen"
            @update:open="isCommandOpen = $event"
          >
            <CommandInput placeholder="Rechercher la documentation…" />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup
                v-for="section in sections"
                :key="section.id"
                :heading="section.label"
              >
                <CommandItem
                  v-for="page in section.pages"
                  :key="page.path"
                  :value="page.title"
                  @select="() => handleSelect(page.path)"
                >
                  <component :is="section.icon" class="h-4 w-4 mr-2" />
                  <span>{{ page.title }}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <!-- Navigation -->
          <nav class="flex flex-col gap-2 pb-8">
            <div v-for="section in sections" :key="section.id">
              <Button
                variant="ghost"
                class="w-full flex items-center justify-between text-left mb-3"
                @click="toggleSection(section.id)"
              >
                <h4 class="font-medium text-sm">{{ section.label }}</h4>
                <ChevronDownIcon
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openSections[section.id] }"
                />
              </Button>
              <ul
                class="flex flex-col gap-2 pl-2 border-l border-border overflow-hidden transition-all duration-200"
                :class="{
                  'max-h-0 opacity-0': !openSections[section.id],
                  'max-h-96 opacity-100': openSections[section.id],
                }"
              >
                <li v-for="page in section.pages" :key="page.path">
                  <NuxtLink
                    :to="page.path"
                    class="block text-sm transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                    :class="
                      $route.path === page.path
                        ? 'text-foreground border-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    "
                  >
                    {{ page.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Liens externes -->
            <div class="mt-6 pt-6 border-t border-border">
              <h4 class="font-medium text-sm mb-3 text-muted-foreground">
                Ressources
              </h4>
              <ul class="flex flex-col gap-2 pl-2">
                <li>
                  <a
                    :href="swaggerUrl"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Swagger UI live
                    <ExternalLinkIcon class="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    :href="redocUrl"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ReDoc live
                    <ExternalLinkIcon class="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/VizHome"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                    <ExternalLinkIcon class="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <!-- Footer Sidebar -->
          <div class="mt-auto pt-6 border-t border-border">
            <div class="text-center text-xs text-muted-foreground">
              Documentation v{{ docsVersion }}
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 transition-all duration-300 lg:ml-72">
      <header
        class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden"
      >
        <Button variant="ghost" size="icon" @click="toggleSidebar">
          <MenuIcon class="h-5 w-5" />
          <span class="sr-only">Menu</span>
        </Button>
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo />
          <Badge variant="outline" class="text-xs">Docs</Badge>
        </NuxtLink>
      </header>

      <main
        class="container max-w-4xl py-6 px-4 md:py-12 mx-auto flex flex-col"
      >
        <slot />
      </main>
    </div>

    <!-- Overlay mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
      @click="toggleSidebar"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Component } from 'vue'
import {
  BookOpenIcon,
  ChevronDownIcon,
  CodeIcon,
  ExternalLinkIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

const router = useRouter()
const config = useRuntimeConfig()

const docsVersion = '1.0.0'

// URLs Swagger/ReDoc déduites de l'API URL (on retire /api/v1 pour la racine)
const swaggerUrl = computed(() => {
  const apiUrl =
    (config.public.apiUrl as string) || 'http://localhost:8000/api/v1'
  return apiUrl.replace(/\/api\/v1\/?$/, '') + '/api/docs/'
})
const redocUrl = computed(() => {
  const apiUrl =
    (config.public.apiUrl as string) || 'http://localhost:8000/api/v1'
  return apiUrl.replace(/\/api\/v1\/?$/, '') + '/api/redoc/'
})

// ─── Structure de navigation ──────────────────────────────────────────────
type SectionId = 'introduction' | 'api'

interface DocPage {
  title: string
  path: string
}

interface DocSection {
  id: SectionId
  label: string
  icon: Component
  pages: DocPage[]
}

const sections: DocSection[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: BookOpenIcon,
    pages: [
      { title: "Vue d'ensemble", path: '/docs' },
      { title: 'Architecture', path: '/docs/architecture' },
      { title: 'Installation', path: '/docs/installation' },
      { title: 'Interface', path: '/docs/interface' },
    ],
  },
  {
    id: 'api',
    label: 'Référence API',
    icon: CodeIcon,
    pages: [
      { title: "Vue d'ensemble", path: '/docs/api' },
      { title: 'Authentification', path: '/docs/api/authentification' },
      { title: 'Projets & Scènes', path: '/docs/api/projets' },
      { title: 'Rendus IA', path: '/docs/api/rendus' },
    ],
  },
]

// ─── État UI ──────────────────────────────────────────────────────────────
const isSidebarOpen = ref(false)
const isCommandOpen = ref(false)
const openSections = ref<Record<SectionId, boolean>>({
  introduction: true,
  api: true,
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const toggleCommandDialog = () => {
  isCommandOpen.value = !isCommandOpen.value
}
const toggleSection = (section: SectionId) => {
  openSections.value[section] = !openSections.value[section]
}
const handleSelect = (path: string) => {
  router.push(path)
  isCommandOpen.value = false
}

// Raccourci clavier Cmd/Ctrl+K
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggleCommandDialog()
    }
  }
  window.addEventListener('keydown', handleKeyDown)
})
</script>
