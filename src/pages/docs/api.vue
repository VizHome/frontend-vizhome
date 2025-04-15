<template>
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <DocsSidebar :is-open="isSidebarOpen" @close="closeSidebar" />

        <!-- Main content -->
        <div class="flex-1 overflow-auto">
            <header
                class="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Button variant="ghost" size="icon" class="sm:hidden" @click="toggleSidebar">
                    <MenuIcon class="h-5 w-5" />
                    <span class="sr-only">Toggle Menu</span>
                </Button>
                <div class="flex items-center gap-2 sm:hidden">
                    <NuxtLink to="/" class="flex items-center gap-1">
                        <span class="font-bold">VizHome</span>
                        <Badge variant="outline">Docs</Badge>
                    </NuxtLink>
                </div>
            </header>
            <main class="container max-w-4xl py-6 px-4 md:py-12">
                <div class="space-y-8">
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">API de référence</h1>
                        <p class="text-lg text-muted-foreground mt-2">
                            Documentation complète de l'API VizHome pour les développeurs
                        </p>
                    </div>

                    <Tabs defaultValue="rest">
                        <TabsList>
                            <TabsTrigger value="rest">REST API</TabsTrigger>
                            <TabsTrigger value="sdk">SDK JavaScript</TabsTrigger>
                            <TabsTrigger value="libraries">Bibliothèques</TabsTrigger>
                        </TabsList>
                        <TabsContent value="rest" class="space-y-6">
                            <div class="rounded-lg border overflow-hidden">
                                <div class="bg-muted px-4 py-2 flex justify-between items-center">
                                    <h3 class="font-medium">Authentification</h3>
                                    <Badge>POST</Badge>
                                </div>
                                <div class="p-4 space-y-4">
                                    <p class="text-sm text-muted-foreground">
                                        Obtenez un token d'accès pour utiliser l'API VizHome
                                    </p>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Endpoint</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            https://api.vizhome.fr/v1/auth/token
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Paramètres</p>
                                        <div class="overflow-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nom</TableHead>
                                                        <TableHead>Type</TableHead>
                                                        <TableHead>Requis</TableHead>
                                                        <TableHead>Description</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>api_key</TableCell>
                                                        <TableCell>string</TableCell>
                                                        <TableCell>Oui</TableCell>
                                                        <TableCell>Votre clé d'API</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>api_secret</TableCell>
                                                        <TableCell>string</TableCell>
                                                        <TableCell>Oui</TableCell>
                                                        <TableCell>Votre secret d'API</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Exemple de requête</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono whitespace-pre">
                                            {
                                            "api_key": "viz_keyx12345",
                                            "api_secret": "viz_secx67890"
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Exemple de réponse</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono whitespace-pre">
                                            {
                                            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                            "token_type": "bearer",
                                            "expires_in": 3600
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-lg border overflow-hidden">
                                <div class="bg-muted px-4 py-2 flex justify-between items-center">
                                    <h3 class="font-medium">Générer un rendu 3D</h3>
                                    <Badge>POST</Badge>
                                </div>
                                <div class="p-4 space-y-4">
                                    <p class="text-sm text-muted-foreground">
                                        Créer un rendu 3D à partir d'une image
                                    </p>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Endpoint</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            https://api.vizhome.fr/v1/renders
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Headers</p>
                                        <div class="overflow-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nom</TableHead>
                                                        <TableHead>Valeur</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Authorization</TableCell>
                                                        <TableCell>Bearer {access_token}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Content-Type</TableCell>
                                                        <TableCell>multipart/form-data</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Paramètres</p>
                                        <div class="overflow-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nom</TableHead>
                                                        <TableHead>Type</TableHead>
                                                        <TableHead>Requis</TableHead>
                                                        <TableHead>Description</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>image</TableCell>
                                                        <TableCell>file</TableCell>
                                                        <TableCell>Oui</TableCell>
                                                        <TableCell>Image source (JPEG, PNG)</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>project_id</TableCell>
                                                        <TableCell>string</TableCell>
                                                        <TableCell>Non</TableCell>
                                                        <TableCell>ID du projet</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>options</TableCell>
                                                        <TableCell>json</TableCell>
                                                        <TableCell>Non</TableCell>
                                                        <TableCell>Options de rendu</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-lg border overflow-hidden">
                                <div class="bg-muted px-4 py-2 flex justify-between items-center">
                                    <h3 class="font-medium">Récupérer un rendu</h3>
                                    <Badge>GET</Badge>
                                </div>
                                <div class="p-4 space-y-4">
                                    <p class="text-sm text-muted-foreground">
                                        Récupérer les détails d'un rendu existant
                                    </p>
                                    <div>
                                        <p class="text-sm font-medium mb-1">Endpoint</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            https://api.vizhome.fr/v1/renders/{render_id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="sdk" class="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Installation du SDK</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div class="space-y-4">
                                        <p>Installez notre SDK via npm ou yarn:</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            npm install @vizhome/sdk
                                        </div>
                                        <p>Exemple d'utilisation:</p>
                                        <div class="bg-muted rounded p-2 text-sm font-mono whitespace-pre">
                                            import { VizHome } from '@vizhome/sdk';

                                            const vizhome = new VizHome('YOUR_API_KEY');

                                            // Générer un rendu
                                            const render = await vizhome.renders.create({
                                            image: imageFile,
                                            options: {
                                            quality: 'high',
                                            format: 'jpg'
                                            }
                                            });

                                            console.log(render.id);
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="libraries" class="space-y-6">
                            <div class="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Python</CardTitle>
                                        <CardDescription>Bibliothèque Python officielle</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            pip install vizhome-python
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" class="w-full">
                                            Documentation Python
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>PHP</CardTitle>
                                        <CardDescription>Bibliothèque PHP officielle</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="bg-muted rounded p-2 text-sm font-mono">
                                            composer require vizhome/vizhome-php
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" class="w-full">
                                            Documentation PHP
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon } from 'lucide-vue-next'
import DocsSidebar from '@/components/DocsSidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}
definePageMeta({
  layout: 'none'
})
</script>