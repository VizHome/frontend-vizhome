<template>
  <div class="flex min-h-screen">
    <!-- Sidebar fixe - visible sur desktop, masquée sur mobile sauf si ouverte -->
    <aside
      class="fixed top-0 left-0 z-40 h-screen w-72 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0"
      :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
    >
      <!-- En-tête fixe -->
      <div
        class="h-16 flex items-center justify-between border-b px-4 bg-background"
      >
        <NuxtLink to="/" class="flex items-center gap-1">
          <span class="font-bold">VizHome</span>
          <Badge variant="outline">Docs</Badge>
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

      <!-- Contenu de la sidebar avec défilement -->
      <div class="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col">
        <div class="p-4 flex-1 flex flex-col">
          <div class="relative mb-6">
            <Button
              variant="outline"
              class="w-full justify-between"
              @click="toggleCommandDialog"
            >
              <div class="flex items-center gap-2">
                <SearchIcon class="h-4 w-4" />
                <span class="text-sm text-muted-foreground">Rechercher...</span>
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
            <CommandInput placeholder="Rechercher la documentation..." />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup heading="Introduction">
                <CommandItem
                  v-for="page in filterDocsPages('Introduction')"
                  :key="page.path"
                  :value="page.path"
                  @select="() => handleSelect(page.path)"
                >
                  <BookOpenIcon class="h-4 w-4 mr-2" />
                  <span>{{ page.title }}</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="API Reference">
                <CommandItem
                  v-for="page in filterDocsPages('API Reference')"
                  :key="page.path"
                  :value="page.path"
                  @select="() => handleSelect(page.path)"
                >
                  <CodeIcon class="h-4 w-4 mr-2" />
                  <span>{{ page.title }}</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="SDK">
                <CommandItem
                  v-for="page in filterDocsPages('SDK')"
                  :key="page.path"
                  :value="page.path"
                  @select="() => handleSelect(page.path)"
                >
                  <PackageIcon class="h-4 w-4 mr-2" />
                  <span>{{ page.title }}</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Ressources">
                <CommandItem
                  v-for="page in filterDocsPages('Ressources')"
                  :key="page.path"
                  :value="page.path"
                  @select="() => handleSelect(page.path)"
                >
                  <ImageIcon class="h-4 w-4 mr-2" />
                  <span>{{ page.title }}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <nav class="flex flex-col gap-2 pb-8">
            <!-- Introduction -->
            <div>
              <Button
                variant="ghost"
                class="w-full flex items-center justify-between text-left mb-3"
                @click="toggleSection('introduction')"
              >
                <h4 class="font-medium text-sm">Introduction</h4>
                <ChevronDownIcon
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openSections.introduction }"
                />
              </Button>
              <ul
                class="flex flex-col gap-2 pl-2 border-l border-border overflow-hidden transition-all duration-200"
                :class="{
                  'max-h-0 opacity-0': !openSections.introduction,
                  'max-h-80 opacity-100': openSections.introduction,
                }"
              >
                <li>
                  <NuxtLink
                    to="/docs#demarrage-rapide"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Démarrage rapide
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/installation"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Installation
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/architecture"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Architecture
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- API Reference -->
            <div>
              <Button
                variant="ghost"
                class="w-full flex items-center justify-between text-left mb-3"
                @click="toggleSection('api')"
              >
                <h4 class="font-medium text-sm">API Reference</h4>
                <ChevronDownIcon
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openSections.api }"
                />
              </Button>
              <ul
                class="flex flex-col gap-2 pl-2 border-l border-border overflow-hidden transition-all duration-200"
                :class="{
                  'max-h-0 opacity-0': !openSections.api,
                  'max-h-96 opacity-100': openSections.api,
                }"
              >
                <li>
                  <NuxtLink
                    to="/docs/api"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Vue d'ensemble
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/authentification"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Authentification
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/projets"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Projets
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/rendus"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Rendus
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/modeles-3d"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Modèles 3D
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/materiaux"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Matériaux
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/api/webhooks"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Webhooks
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- SDK -->
            <div>
              <Button
                variant="ghost"
                class="w-full flex items-center justify-between text-left mb-3"
                @click="toggleSection('sdk')"
              >
                <h4 class="font-medium text-sm">SDK</h4>
                <ChevronDownIcon
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openSections.sdk }"
                />
              </Button>
              <ul
                class="flex flex-col gap-2 pl-2 border-l border-border overflow-hidden transition-all duration-200"
                :class="{
                  'max-h-0 opacity-0': !openSections.sdk,
                  'max-h-80 opacity-100': openSections.sdk,
                }"
              >
                <li>
                  <NuxtLink
                    to="/docs/sdk/javascript"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    JavaScript
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/sdk/python"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Python
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/sdk/unity"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Unity
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Ressources -->
            <div>
              <Button
                variant="ghost"
                class="w-full flex items-center justify-between text-left mb-3"
                @click="toggleSection('resources')"
              >
                <h4 class="font-medium text-sm">Ressources</h4>
                <ChevronDownIcon
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openSections.resources }"
                />
              </Button>
              <ul
                class="flex flex-col gap-2 pl-2 border-l border-border overflow-hidden transition-all duration-200"
                :class="{
                  'max-h-0 opacity-0': !openSections.resources,
                  'max-h-80 opacity-100': openSections.resources,
                }"
              >
                <li>
                  <NuxtLink
                    to="/docs/photos"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Photos
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/docs/interface"
                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
                  >
                    Interface
                  </NuxtLink>
                </li>
                <li>
                  <a
                    href="https://github.com/vizhome"
                    target="_blank"
                    class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary"
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
            <div class="text-center text-xs text-muted-foreground mb-4">
              <span>Documentation v1.0.0</span>
            </div>
            <div class="flex justify-center space-x-4 mb-2">
              <a
                href="#"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedinIcon class="h-4 w-4" />
              </a>
              <a
                href="#"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon class="h-4 w-4" />
              </a>
              <a
                href="https://github.com/vizhome"
                target="_blank"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content adapté au responsive -->
    <div class="flex-1 transition-all duration-300 lg:ml-72">
      <!-- Header mobile uniquement visible sur petit écran -->
      <header
        class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden"
      >
        <Button variant="ghost" size="icon" @click="toggleSidebar">
          <MenuIcon class="h-5 w-5" />
          <span class="sr-only">Menu</span>
        </Button>
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-1">
            <span class="font-bold">VizHome</span>
            <Badge variant="outline">Docs</Badge>
          </NuxtLink>
        </div>
      </header>

      <main
        class="container max-w-5xl py-6 px-4 md:py-12 mx-auto flex flex-col items-center"
      >
        <!-- Slot pour le contenu de la page -->
        <slot />
      </main>
    </div>

    <!-- Overlay mobile - apparaît seulement quand le menu est ouvert sur mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
      @click="toggleSidebar"
    />
  </div>
</template>

<script setup lang="ts">
import {
  XIcon,
  MenuIcon,
  ExternalLinkIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  BookOpenIcon,
  CodeIcon,
  PackageIcon,
  ImageIcon,
  SearchIcon,
  ChevronDownIcon,
} from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

// Types
interface DocPage {
  title: string
  path: string
  section: string
  keywords: string[]
}

// État pour l'affichage de la sidebar sur mobile
const isSidebarOpen = ref(false)

// État pour la boîte de dialogue de commande
const isCommandOpen = ref(false)

// État pour suivre les sections ouvertes
const openSections = ref({
  introduction: true,
  api: true,
  sdk: true,
  resources: true,
})

// Fonction pour basculer l'affichage de la sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Router pour la navigation
const router = useRouter()

// Base de données fictive pour la recherche
const docsPages: DocPage[] = [
  {
    title: 'Démarrage rapide',
    path: '/docs#demarrage-rapide',
    section: 'Introduction',
    keywords: ['démarrage', 'commencer', 'introduction', 'guide'],
  },
  {
    title: 'Installation',
    path: '/docs/installation',
    section: 'Introduction',
    keywords: ['installation', 'configurer', 'setup', 'démarrer'],
  },
  {
    title: 'Architecture',
    path: '/docs/architecture',
    section: 'Introduction',
    keywords: ['architecture', 'structure', 'organisation'],
  },
  {
    title: "Vue d'ensemble",
    path: '/docs/api',
    section: 'API Reference',
    keywords: ['api', 'référence', 'endpoints'],
  },
  {
    title: 'Authentification',
    path: '/docs/api/authentification',
    section: 'API Reference',
    keywords: ['api', 'auth', 'login', 'token'],
  },
  {
    title: 'Projets',
    path: '/docs/api/projets',
    section: 'API Reference',
    keywords: ['api', 'projets', 'créer projet'],
  },
  {
    title: 'Rendus',
    path: '/docs/api/rendus',
    section: 'API Reference',
    keywords: ['api', 'rendus', 'render', 'rendu 3d'],
  },
  {
    title: 'Modèles 3D',
    path: '/docs/api/modeles-3d',
    section: 'API Reference',
    keywords: ['api', 'modèles', '3d', 'objets'],
  },
  {
    title: 'Matériaux',
    path: '/docs/api/materiaux',
    section: 'API Reference',
    keywords: ['api', 'matériaux', 'textures', 'surfaces'],
  },
  {
    title: 'Webhooks',
    path: '/docs/api/webhooks',
    section: 'API Reference',
    keywords: ['api', 'webhooks', 'événements', 'intégration'],
  },
  {
    title: 'JavaScript SDK',
    path: '/docs/sdk/javascript',
    section: 'SDK',
    keywords: ['sdk', 'javascript', 'js', 'frontend'],
  },
  {
    title: 'Python SDK',
    path: '/docs/sdk/python',
    section: 'SDK',
    keywords: ['sdk', 'python', 'backend'],
  },
  {
    title: 'Unity SDK',
    path: '/docs/sdk/unity',
    section: 'SDK',
    keywords: ['sdk', 'unity', 'game engine', '3d'],
  },
  {
    title: 'Photos',
    path: '/docs/photos',
    section: 'Ressources',
    keywords: ['photos', 'images', 'ressources'],
  },
  {
    title: 'Interface',
    path: '/docs/interface',
    section: 'Ressources',
    keywords: ['interface', 'ui', 'ux', 'design'],
  },
]

// Filtrer les pages par section
const filterDocsPages = (section: string) => {
  return docsPages.filter(page => page.section === section)
}

// Ouvrir le CommandDialog
const toggleCommandDialog = () => {
  isCommandOpen.value = !isCommandOpen.value
}

// Gestion de la sélection dans le CommandDialog
const handleSelect = (path: string) => {
  router.push(path)
  isCommandOpen.value = false
}

// Fonction pour basculer l'état d'une section
const toggleSection = (
  section: 'introduction' | 'api' | 'sdk' | 'resources'
) => {
  openSections.value[section] = !openSections.value[section]
}

// Gestion du raccourci clavier
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggleCommandDialog()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>
