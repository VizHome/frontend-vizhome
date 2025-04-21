<template>
    <div
:class="[
        'fixed inset-y-0 left-0 z-50 w-72 border-r bg-background transition-transform lg:static lg:block',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
        <div class="sticky top-0 flex h-16 items-center justify-between border-b px-4">
            <NuxtLink to="/" class="flex items-center gap-1">
                <span class="font-bold">VizHome</span>
                <Badge variant="outline">Docs</Badge>
            </NuxtLink>
            <Button variant="ghost" size="icon" class="lg:hidden" @click="$emit('close')">
                <XIcon class="h-5 w-5" />
                <span class="sr-only">Fermer</span>
            </Button>
        </div>
        <div class="p-4">
            <Input placeholder="Rechercher..." class="mb-4" />
        </div>
        <ScrollArea class="h-[calc(100vh-10rem)]">
            <div class="p-4 pt-0">
                <nav class="space-y-6">
                    <div>
                        <h4 class="mb-2 text-sm font-semibold">Introduction</h4>
                        <ul class="space-y-2">
                            <li>
                                <NuxtLink
to="/docs"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Démarrage rapide
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Installation
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Architecture
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="mb-2 text-sm font-semibold">API Reference</h4>
                        <ul class="space-y-2">
                            <li>
                                <NuxtLink to="/docs/api" class="block text-sm font-medium">
                                    Vue d'ensemble
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Authentification
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Projets
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Rendus
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Modèles 3D
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Matériaux
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Webhooks
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="mb-2 text-sm font-semibold">SDK</h4>
                        <ul class="space-y-2">
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    JavaScript
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Python
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs/api"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    PHP
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="mb-2 text-sm font-semibold">Ressources</h4>
                        <ul class="space-y-2">
                            <li>
                                <NuxtLink
to="/docs"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Exemples
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
to="/docs"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Tutoriels
                                </NuxtLink>
                            </li>
                            <li>
                                <a
href="https://github.com/vizhome" target="_blank"
                                    class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>