<template>
    <div>
        <!-- En-tête de la fonctionnalité -->
        <section class="pt-20 pb-12 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge class="mb-4">Fonctionnalité phare</Badge>
                        <h1 class="text-4xl font-bold mb-6">Génération 3D automatique</h1>
                        <p class="text-xl text-muted-foreground mb-6">
                            Transformez instantanément vos photos en modèles 3D détaillés grâce à notre technologie
                            d'intelligence artificielle de pointe.
                        </p>
                        <Button size="lg" as-child>
                            <NuxtLink to="/auth/register">
                                Essayer gratuitement
                            </NuxtLink>
                        </Button>
                    </div>
                    <div class="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                        <img
src="/images/generate/image_generate.png" alt="Génération 3D automatique"
                            class="object-cover w-full h-full" >
                    </div>
                </div>
            </div>
        </section>

        <!-- Comment ça fonctionne -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-12 text-center">Comment ça fonctionne</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <UploadCloudIcon class="h-8 w-8 text-primary" />
                        </div>
                        <h3 class="text-lg font-medium mb-2">1. Téléchargez vos photos</h3>
                        <p class="text-muted-foreground">
                            Importez une ou plusieurs photos de votre espace depuis n'importe quel appareil.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <BrainCircuitIcon class="h-8 w-8 text-primary" />
                        </div>
                        <h3 class="text-lg font-medium mb-2">2. L'IA analyse l'espace</h3>
                        <p class="text-muted-foreground">
                            Notre moteur d'IA avancé analyse la géométrie, les textures et l'éclairage.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Box class="h-8 w-8 text-primary" />
                        </div>
                        <h3 class="text-lg font-medium mb-2">3. Modèle 3D généré</h3>
                        <p class="text-muted-foreground">
                            En quelques secondes, votre modèle 3D interactif est prêt à être exploré et modifié.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Caractéristiques avancées -->
        <section class="py-16 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">Caractéristiques avancées</h2>
                    <div class="space-y-8">
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="md:w-1/3 flex justify-center">
                                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ZapIcon class="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <h3 class="text-xl font-medium mb-2">Rapidité inégalée</h3>
                                <p class="text-muted-foreground">
                                    Obtenez un modèle 3D complet en moins de 30 secondes, là où les solutions
                                    traditionnelles nécessitent des heures.
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="md:w-1/3 flex justify-center">
                                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <RulerIcon class="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <h3 class="text-xl font-medium mb-2">Précision géométrique</h3>
                                <p class="text-muted-foreground">
                                    Notre IA capture avec précision les dimensions, les angles et les proportions de
                                    votre espace pour une représentation fidèle.
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="md:w-1/3 flex justify-center">
                                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <LandmarkIcon class="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <h3 class="text-xl font-medium mb-2">Reconnaissance des objets</h3>
                                <p class="text-muted-foreground">
                                    Le système identifie intelligemment les meubles, les ouvertures et les éléments
                                    architecturaux pour une modélisation optimale.
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="md:w-1/3 flex justify-center">
                                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <FileTypeIcon class="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <h3 class="text-xl font-medium mb-2">Exports polyvalents</h3>
                                <p class="text-muted-foreground">
                                    Exportez votre modèle 3D dans différents formats standards (OBJ, FBX, GLTF) pour
                                    l'utiliser dans vos logiciels préférés.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Démonstration visuelle -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-6 text-center">Avant / Après</h2>
                <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                    Voyez la différence entre les photos originales et les rendus 3D générés par notre IA
                </p>

                <Tabs default-value="example1" class-name="max-w-5xl mx-auto">
                    <TabsList class-name="grid w-full grid-cols-3">
                        <TabsTrigger value="example1">Salon</TabsTrigger>
                        <TabsTrigger value="example2">Cuisine</TabsTrigger>
                        <TabsTrigger value="example3">Salle de bain</TabsTrigger>
                    </TabsList>
                    <TabsContent value="example1">
                        <Card>
                            <CardContent class-name="p-0">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-4 border-r border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Photo originale</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Salon avant"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                    <div className="p-4 border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Rendu 3D généré</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Salon après"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-muted-foreground text-sm">Transformation d'un salon ordinaire en
                                        espace 3D interactif avec possibilité de modifier les matériaux, l'éclairage et
                                        le mobilier.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="example2">
                        <Card>
                            <CardContent class-name="p-0">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-4 border-r border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Photo originale</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Cuisine avant"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                    <div className="p-4 border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Rendu 3D généré</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Cuisine après"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-muted-foreground text-sm">Visualisation d'une cuisine rénovée
                                        avec différentes finitions et configurations possibles.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="example3">
                        <Card>
                            <CardContent class-name="p-0">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-4 border-r border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Photo originale</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Salle de bain avant"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                    <div className="p-4 border-b md:border-b-0">
                                        <h3 className="font-medium mb-2 text-center">Rendu 3D généré</h3>
                                        <div className="aspect-video rounded-md overflow-hidden">
                                            <img
src="/images/generate/image_generate.png" alt="Salle de bain après"
                                                className="w-full h-full object-cover" >
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-muted-foreground text-sm">Transformation d'une salle de bain
                                        classique en espace moderne avec test de différents matériaux et agencements.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

        <!-- Témoignages -->
        <section class="py-16 bg-muted/30">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-12 text-center">Ce que disent nos clients</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card>
                        <CardContent class="pt-6">
                            <div class="flex text-amber-400 mb-4">
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                            </div>
                            <blockquote class="italic text-muted-foreground mb-6">
                                "En moins de 30 secondes, j'ai pu transformer une simple photo en modèle 3D complet.
                                J'ai été époustouflé par la précision et la rapidité du processus."
                            </blockquote>
                            <div class="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                                    <AvatarFallback>ML</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 class="font-medium">Martin Legrand</h3>
                                    <p class="text-sm text-muted-foreground">Architecte d'intérieur</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent class="pt-6">
                            <div class="flex text-amber-400 mb-4">
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                            </div>
                            <blockquote class="italic text-muted-foreground mb-6">
                                "La génération 3D automatique de VizHome a changé notre façon de présenter des
                                propriétés. Nous pouvons désormais montrer les potentiels de rénovation instantanément."
                            </blockquote>
                            <div class="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://i.pravatar.cc/150?img=15" />
                                    <AvatarFallback>SR</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 class="font-medium">Sophie Renaud</h3>
                                    <p class="text-sm text-muted-foreground">Agent immobilier</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent class="pt-6">
                            <div class="flex text-amber-400 mb-4">
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                                <StarIcon class="h-4 w-4 fill-current" />
                            </div>
                            <blockquote class="italic text-muted-foreground mb-6">
                                "L'export en différents formats nous permet d'intégrer parfaitement les modèles générés
                                dans notre workflow existant avec d'autres logiciels 3D."
                            </blockquote>
                            <div class="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://i.pravatar.cc/150?img=22" />
                                    <AvatarFallback>PD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 class="font-medium">Pierre Dubois</h3>
                                    <p class="text-sm text-muted-foreground">Directeur créatif</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div
                    class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto">
                    <h2 class="text-3xl font-bold mb-4">Prêt à transformer vos espaces ?</h2>
                    <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Essayez la génération 3D automatique dès aujourd'hui et découvrez la puissance de VizHome.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" as-child>
                            <NuxtLink to="/auth/register">
                                Commencer gratuitement
                            </NuxtLink>
                        </Button>
                        <Button size="lg" variant="outline" as-child>
                            <NuxtLink to="/contact">
                                Demander une démo
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { UploadCloudIcon, BrainCircuitIcon, Box, ZapIcon, RulerIcon, LandmarkIcon, FileTypeIcon, StarIcon } from 'lucide-vue-next'
</script>