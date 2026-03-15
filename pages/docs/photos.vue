<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Guide photos</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Conseils pour prendre les meilleures photos pour l'IA de VizHome
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          La qualité de vos rendus 3D dépend directement de la qualité des
          photos que vous fournissez à VizHome. Notre IA est puissante, mais
          elle travaille mieux avec des images optimisées. Suivez ce guide pour
          obtenir les meilleurs résultats possibles.
        </p>
      </CardContent>
    </Card>

    <!-- Principes fondamentaux -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Principes fondamentaux</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader class="pb-2">
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
            >
              <SunIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Éclairage</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Un bon éclairage est primordial. Préférez la lumière naturelle du
              jour, évitez les contrastes extrêmes et les zones d'ombre trop
              prononcées.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
            >
              <FocusIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Netteté</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Vos photos doivent être parfaitement nettes. Utilisez un trépied
              si nécessaire et assurez-vous que l'autofocus a bien fonctionné
              avant de prendre la photo.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
            >
              <LayoutGridIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Couverture</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Capturez l'espace sous plusieurs angles pour permettre à l'IA de
              comprendre pleinement la géométrie 3D et les textures de votre
              pièce.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Équipement recommandé -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Équipement recommandé</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-4">
            <p>
              Bien que vous puissiez obtenir de bons résultats avec n'importe
              quel appareil photo moderne, voici quelques recommandations pour
              optimiser vos prises de vue :
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="min-w-[20px] mt-1">
                  <CheckIcon class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <strong>Appareil photo</strong> : Un smartphone récent (iPhone
                  11+ ou équivalent) ou un appareil photo numérique avec au
                  moins 12 MP de résolution.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[20px] mt-1">
                  <CheckIcon class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <strong>Trépied</strong> : Recommandé pour les environnements
                  à faible luminosité afin d'éviter le flou.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[20px] mt-1">
                  <CheckIcon class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <strong>Éclairage d'appoint</strong> : Optionnel, peut être
                  utile pour les pièces sombres. Préférez une lumière diffuse
                  plutôt que directionnelle.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="min-w-[20px] mt-1">
                  <CheckIcon class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <strong>Objectif grand angle</strong> : Permet de capturer
                  davantage d'éléments dans les petits espaces. Attention
                  toutefois aux distorsions avec les ultra-grand-angles.
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Préparation de l'espace -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Préparation de l'espace</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour obtenir le meilleur modèle 3D possible, préparez votre espace
            avant de prendre des photos :
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <ThumbsUpIcon class="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 class="text-base font-medium mb-1">À faire</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span
                      >Rangez l'espace pour éliminer le désordre inutile</span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span
                      >Ouvrez les stores/rideaux pour maximiser la lumière
                      naturelle</span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span
                      >Allumez toutes les lumières si la pièce est sombre</span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span
                      >Gardez les meubles principaux pour aider l'IA à
                      comprendre l'échelle</span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <ThumbsDownIcon class="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 class="text-base font-medium mb-1">À éviter</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span>Les objets en mouvement (personnes, animaux)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span>Les surfaces très réfléchissantes ou miroirs</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span>Les zones surexposées (fenêtres brûlées)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="min-w-[16px] mt-1">
                      <Circle
                        class="h-1.5 w-1.5 fill-foreground text-foreground"
                      />
                    </div>
                    <span
                      >Les objets temporaires que vous ne souhaitez pas dans le
                      rendu final</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p>
            Note : VizHome peut supprimer virtuellement certains objets et
            meubles, mais le résultat sera meilleur si vous prenez des photos
            d'un espace déjà proche de ce que vous souhaitez obtenir.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Technique de prise de vue -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Technique de prise de vue</h2>
      <Card>
        <CardContent class="pt-6 space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Angles recommandés</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div class="border rounded-lg p-4">
                <div class="aspect-video bg-muted rounded mb-3 overflow-hidden">
                  <img
                    src="/images/generate/image_generate.png"
                    alt="Photo depuis les coins"
                    class="w-full h-full object-cover"
                  />
                </div>
                <h4 class="font-medium mb-1">Coins de la pièce</h4>
                <p class="text-xs text-muted-foreground">
                  Capturez depuis chaque coin pour avoir une vue complète de
                  l'espace.
                </p>
              </div>
              <div class="border rounded-lg p-4">
                <div class="aspect-video bg-muted rounded mb-3 overflow-hidden">
                  <img
                    src="/images/generate/image_generate.png"
                    alt="Photo depuis le centre"
                    class="w-full h-full object-cover"
                  />
                </div>
                <h4 class="font-medium mb-1">Centre de la pièce</h4>
                <p class="text-xs text-muted-foreground">
                  Prenez des photos panoramiques en pivotant depuis le centre.
                </p>
              </div>
              <div class="border rounded-lg p-4">
                <div class="aspect-video bg-muted rounded mb-3 overflow-hidden">
                  <img
                    src="/images/generate/image_generate.png"
                    alt="Photos de détails"
                    class="w-full h-full object-cover"
                  />
                </div>
                <h4 class="font-medium mb-1">Détails importants</h4>
                <p class="text-xs text-muted-foreground">
                  Capturez les éléments architecturaux spécifiques en gros plan.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Nombre de photos</h3>
            <p class="mb-2">Pour un résultat optimal, nous recommandons :</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-3">
                <div
                  class="min-w-[24px] h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span class="text-primary font-medium text-sm">5+</span>
                </div>
                <div>
                  <strong>Petite pièce</strong> (salle de bain, bureau) : 5-8
                  photos
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="min-w-[24px] h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span class="text-primary font-medium text-sm">8+</span>
                </div>
                <div>
                  <strong>Pièce moyenne</strong> (chambre, cuisine) : 8-12
                  photos
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="min-w-[24px] h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span class="text-primary font-medium text-sm">12+</span>
                </div>
                <div>
                  <strong>Grande pièce</strong> (salon, espace ouvert) : 12-20
                  photos
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Paramètres de l'appareil</h3>
            <div class="space-y-3">
              <div>
                <h4 class="font-medium">Résolution</h4>
                <p class="text-sm text-muted-foreground">
                  Utilisez la résolution maximale disponible sur votre appareil,
                  idéalement 12 MP ou plus.
                </p>
              </div>
              <div>
                <h4 class="font-medium">HDR</h4>
                <p class="text-sm text-muted-foreground">
                  Activez le HDR si disponible, particulièrement utile pour les
                  pièces avec de forts contrastes.
                </p>
              </div>
              <div>
                <h4 class="font-medium">ISO</h4>
                <p class="text-sm text-muted-foreground">
                  Gardez l'ISO aussi bas que possible (100-400) pour éviter le
                  bruit numérique.
                </p>
              </div>
              <div>
                <h4 class="font-medium">Format</h4>
                <p class="text-sm text-muted-foreground">
                  JPEG haute qualité est suffisant. Si vous utilisez le format
                  RAW, convertissez en JPEG avant l'import.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Exemples -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Exemples</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="text-lg font-medium mb-3">Bonnes pratiques</h3>
              <div class="space-y-4">
                <div>
                  <div
                    class="aspect-video bg-muted rounded overflow-hidden mb-2"
                  >
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Bon exemple 1"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-sm text-muted-foreground">
                    ✓ Bonne luminosité, angle large captant une grande partie de
                    la pièce
                  </p>
                </div>
                <div>
                  <div
                    class="aspect-video bg-muted rounded overflow-hidden mb-2"
                  >
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Bon exemple 2"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-sm text-muted-foreground">
                    ✓ Espace rangé, éclairage homogène, bonne netteté
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-3">À éviter</h3>
              <div class="space-y-4">
                <div>
                  <div
                    class="aspect-video bg-muted rounded overflow-hidden mb-2"
                  >
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Mauvais exemple 1"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-sm text-muted-foreground">
                    ✗ Surexposition par la fenêtre, espace trop encombré
                  </p>
                </div>
                <div>
                  <div
                    class="aspect-video bg-muted rounded overflow-hidden mb-2"
                  >
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Mauvais exemple 2"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-sm text-muted-foreground">
                    ✗ Photo floue, éclairage insuffisant, angle trop serré
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Conseil pro</AlertTitle>
            <AlertDescription>
              Pour de meilleurs résultats avec le mode
              <strong>Prompt IA</strong>, décrivez précisément l'ambiance
              souhaitée dans votre prompt après avoir fourni une image de
              référence de qualité.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/interface">
          <ArrowLeftIcon class="h-4 w-4" />
          Guide de l'interface
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/editing">
          Édition avancée
          <ArrowRightIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  InfoIcon,
  SunIcon,
  FocusIcon,
  LayoutGridIcon,
  CheckIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Circle,
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
