<template>
    <div>
        <!-- En-tête de la fonctionnalité -->
        <section class="pt-20 pb-12 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge class="mb-4">Technologie exclusive</Badge>
                        <h1 class="text-4xl font-bold mb-6">Éclairage intelligent</h1>
                        <p class="text-xl text-muted-foreground mb-6">
                            Simulez des conditions d'éclairage réalistes et dynamiques pour donner vie à vos espaces 3D
                            avec notre technologie d'éclairage intelligent.
                        </p>
                        <Button size="lg" as-child>
                            <NuxtLink to="/auth/register">
                                Découvrir l'éclairage intelligent
                            </NuxtLink>
                        </Button>
                    </div>
                    <div class="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                        <img
src="/images/generate/image_generate.png" alt="Éclairage intelligent"
                            class="object-cover w-full h-full" >
                    </div>
                </div>
            </div>
        </section>

        <!-- Types d'éclairage -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-6 text-center">Types d'éclairage</h2>
                <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                    Explorez les différentes options d'éclairage pour créer l'ambiance parfaite pour vos espaces
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card class="overflow-hidden">
                        <div class="aspect-video">
                            <img
src="/images/generate/image_generate.png" alt="Éclairage naturel"
                                class="w-full h-full object-cover" >
                        </div>
                        <CardContent class="p-4">
                            <h3 class="font-medium mb-2">Éclairage naturel</h3>
                            <p class="text-muted-foreground text-sm">
                                Simulez la lumière du soleil à différentes heures de la journée pour voir comment votre
                                espace change avec la lumière naturelle.
                            </p>
                        </CardContent>
                    </Card>

                    <Card class="overflow-hidden">
                        <div class="aspect-video">
                            <img
src="/images/generate/image_generate.png" alt="Éclairage artificiel"
                                class="w-full h-full object-cover" >
                        </div>
                        <CardContent class="p-4">
                            <h3 class="font-medium mb-2">Éclairage artificiel</h3>
                            <p class="text-muted-foreground text-sm">
                                Configurez différents types de luminaires avec contrôle précis de l'intensité, de la
                                couleur et de la diffusion.
                            </p>
                        </CardContent>
                    </Card>

                    <Card class="overflow-hidden">
                        <div class="aspect-video">
                            <img
src="/images/generate/image_generate.png" alt="Éclairage d'ambiance"
                                class="w-full h-full object-cover" >
                        </div>
                        <CardContent class="p-4">
                            <h3 class="font-medium mb-2">Éclairage d'ambiance</h3>
                            <p class="text-muted-foreground text-sm">
                                Créez des atmosphères spécifiques avec des préréglages d'éclairage pour différentes
                                ambiances et occasions.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Technologie avancée -->
        <section class="py-16 bg-muted/30">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <div>
                        <h2 class="text-3xl font-bold mb-6">Technologie d'illumination globale</h2>
                        <p class="text-muted-foreground mb-6">
                            Notre moteur d'éclairage avancé simule avec précision la façon dont la lumière rebondit, se
                            diffuse et interagit avec différentes surfaces et matériaux.
                        </p>
                        <Accordion type="single" collapsible class="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Réflexions réalistes</AccordionTrigger>
                                <AccordionContent>
                                    Simulation précise des réflexions directes et indirectes sur toutes les surfaces,
                                    prenant en compte les propriétés des matériaux comme la brillance et la rugosité.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Ombres douces et dures</AccordionTrigger>
                                <AccordionContent>
                                    Génération automatique d'ombres réalistes avec variation de la douceur en fonction
                                    de la distance et de la taille de la source lumineuse.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Occlusion ambiante</AccordionTrigger>
                                <AccordionContent>
                                    Calcul avancé de l'occlusion ambiante qui ajoute de la profondeur et du réalisme aux
                                    coins, jonctions et zones moins exposées à la lumière.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Caustiques</AccordionTrigger>
                                <AccordionContent>
                                    Simulation des effets de concentration de lumière comme ceux créés par les surfaces
                                    réfléchissantes ou réfractives (verre, eau, métal poli).
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div class="relative">
                        <img
src="/images/generate/image_generate.png" alt="Technologie d'éclairage"
                            class="rounded-lg shadow-lg" >
                        <div class="absolute -bottom-4 -right-4 bg-background rounded-lg p-4 shadow-lg border">
                            <h3 class="text-sm font-medium mb-1">Performance optimisée</h3>
                            <p class="text-xs text-muted-foreground">Rendu en temps réel grâce à notre IA</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comparaison avant/après -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-6 text-center">L'impact de l'éclairage</h2>
                <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                    Découvrez comment un éclairage bien conçu peut transformer complètement l'apparence et l'ambiance
                    d'un espace
                </p>

                <div class="max-w-3xl mx-auto">
                    <div class="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                        <div class="absolute inset-0" style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%)">
                            <img
src="/images/generate/image_generate.png" alt="Avant l'éclairage"
                                class="w-full h-full object-cover" >
                        </div>
                        <div class="absolute inset-0">
                            <img
src="/images/generate/image_generate.png" alt="Après l'éclairage"
                                class="w-full h-full object-cover" >
                        </div>

                        <!-- Slider vertical -->
                        <div
                            class="absolute inset-y-0 left-1/2 -ml-1 w-2 bg-white/70 cursor-col-resize flex justify-center">
                            <div
                                class="bg-white h-10 w-10 rounded-full shadow-lg absolute top-1/2 -mt-5 flex items-center justify-center border-4 border-primary">
                                <ChevronLeftIcon class="h-4 w-4 text-primary" />
                                <ChevronRightIcon class="h-4 w-4 text-primary" />
                            </div>
                        </div>

                        <!-- Labels -->
                        <div
                            class="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-sm rounded backdrop-blur-sm">
                            Éclairage basique
                        </div>
                        <div
                            class="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 text-sm rounded backdrop-blur-sm">
                            Éclairage intelligent
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="text-muted-foreground">
                            Faites glisser le curseur pour voir la différence entre l'éclairage standard et notre
                            technologie d'éclairage intelligent.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modes d'éclairage -->
        <section class="py-16 bg-muted/30">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold mb-12 text-center">Modes d'éclairage spécialisés</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <Card>
                        <CardHeader>
                            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <HomeIcon class="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Mode résidentiel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-muted-foreground mb-4">
                                Optimisé pour les espaces de vie avec simulation de l'éclairage domestique, incluant des
                                options pour différentes périodes de la journée et ambiances.
                            </p>
                            <div class="grid grid-cols-3 gap-2">
                                <Badge variant="outline" class="justify-center">Matinée</Badge>
                                <Badge variant="outline" class="justify-center">Soirée</Badge>
                                <Badge variant="outline" class="justify-center">Nuit</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <BuildingIcon class="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Mode commercial</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-muted-foreground mb-4">
                                Conçu pour les espaces commerciaux avec des options pour l'éclairage de produits, de
                                vitrines et d'espaces événementiels.
                            </p>
                            <div class="grid grid-cols-3 gap-2">
                                <Badge variant="outline" class="justify-center">Vitrine</Badge>
                                <Badge variant="outline" class="justify-center">Boutique</Badge>
                                <Badge variant="outline" class="justify-center">Showroom</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <LampDeskIcon class="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Mode bureau</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-muted-foreground mb-4">
                                Éclairage adapté aux environnements de travail avec options pour maximiser la
                                productivité et le confort visuel.
                            </p>
                            <div class="grid grid-cols-3 gap-2">
                                <Badge variant="outline" class="justify-center">Productif</Badge>
                                <Badge variant="outline" class="justify-center">Réunion</Badge>
                                <Badge variant="outline" class="justify-center">Créatif</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                <UtensilsIcon class="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Mode gastronomie</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-muted-foreground mb-4">
                                Spécialement conçu pour les restaurants et cafés, avec des options d'éclairage qui
                                mettent en valeur les plats et créent l'ambiance désirée.
                            </p>
                            <div class="grid grid-cols-3 gap-2">
                                <Badge variant="outline" class="justify-center">Intimité</Badge>
                                <Badge variant="outline" class="justify-center">Dynamique</Badge>
                                <Badge variant="outline" class="justify-center">Élégant</Badge>
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
                    <h2 class="text-3xl font-bold mb-4">Illuminez vos projets avec précision</h2>
                    <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Transformez l'ambiance de vos espaces 3D grâce à notre technologie d'éclairage intelligent et
                        offrez une expérience visuelle inégalée.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" as-child>
                            <NuxtLink to="/auth/register">
                                Commencer gratuitement
                            </NuxtLink>
                        </Button>
                        <Button size="lg" variant="outline" as-child>
                            <NuxtLink to="/pricing">
                                Voir nos offres
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { HomeIcon, BuildingIcon, LampDeskIcon, UtensilsIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
</script>