<template>
    <div class="flex min-h-screen">
        <!-- Sidebar fixe - visible sur desktop, masquée sur mobile sauf si ouverte -->
        <aside
            class="fixed top-0 left-0 z-40 h-screen w-72 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0"
            :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
            <!-- En-tête fixe -->
            <div class="h-16 flex items-center justify-between border-b px-4 bg-background">
                <NuxtLink to="/" class="flex items-center gap-1">
                    <span class="font-bold">VizHome</span>
                    <Badge variant="outline">Docs</Badge>
                </NuxtLink>
                <Button variant="ghost" size="icon" class="lg:hidden" @click="toggleSidebar">
                    <XIcon class="h-5 w-5" />
                    <span class="sr-only">Fermer</span>
                </Button>
            </div>

            <!-- Contenu de la sidebar avec défilement -->
            <div class="h-[calc(100vh-4rem)] overflow-y-auto">
                <div class="p-4">
                    <Input placeholder="Rechercher..." class="mb-6" />

                    <nav class="flex flex-col gap-8 pb-8">
                        <!-- Introduction -->
                        <div>
                            <h4 class="mb-3 font-medium text-sm">Introduction</h4>
                            <ul class="flex flex-col gap-2 pl-2 border-l border-border">
                                <li>
                                    <NuxtLink to="/docs#demarrage-rapide"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Démarrage rapide
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/installation"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Installation
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/architecture"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Architecture
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <!-- API Reference -->
                        <div>
                            <h4 class="mb-3 font-medium text-sm">API Reference</h4>
                            <ul class="flex flex-col gap-2 pl-2 border-l border-border">
                                <li>
                                    <NuxtLink to="/docs/api"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Vue d'ensemble
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/authentification"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Authentification
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/projets"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Projets
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/rendus"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Rendus
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/modeles-3d"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Modèles 3D
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/materiaux"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Matériaux
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/api/webhooks"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Webhooks
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <!-- SDK -->
                        <div>
                            <h4 class="mb-3 font-medium text-sm">SDK</h4>
                            <ul class="flex flex-col gap-2 pl-2 border-l border-border">
                                <li>
                                    <NuxtLink to="/docs/sdk/javascript"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        JavaScript
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/sdk/python"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Python
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/sdk/unity"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Unity
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <!-- Ressources -->
                        <div>
                            <h4 class="mb-3 font-medium text-sm">Ressources</h4>
                            <ul class="flex flex-col gap-2 pl-2 border-l border-border">
                                <li>
                                    <NuxtLink to="/docs/photos"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Photos
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/docs/interface"
                                        class="block text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        Interface
                                    </NuxtLink>
                                </li>
                                <li>
                                    <a href="https://github.com/vizhome" target="_blank"
                                        class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-px pl-3 border-l border-transparent hover:border-primary">
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </aside>

        <!-- Main content adapté au responsive -->
        <div class="flex-1 transition-all duration-300" :class="{ 'lg:ml-72': true }">
            <!-- Header mobile uniquement visible sur petit écran -->
            <header class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
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

            <main class="container max-w-5xl py-6 px-4 md:py-12 mx-auto flex flex-col items-center">
                <!-- Slot pour le contenu de la page -->
                <slot />
            </main>
        </div>

        <!-- Overlay mobile - apparaît seulement quand le menu est ouvert sur mobile -->
        <div v-if="isSidebarOpen" class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            @click="toggleSidebar">
        </div>
    </div>
</template>

<script setup lang="ts">
import { XIcon, MenuIcon } from 'lucide-vue-next'
import { ref } from 'vue'

// État pour l'affichage de la sidebar sur mobile
const isSidebarOpen = ref(false)

// Fonction pour basculer l'affichage de la sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
</script>