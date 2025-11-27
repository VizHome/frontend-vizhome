<template>
  <div>
    <!-- Section en-tête -->
    <section class="pt-16 pb-12 bg-muted/30">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Tarification transparente</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Des offres adaptées à tous les besoins, de l'étudiant à l'agence
          d'architecture
        </p>
        <div class="flex justify-center mt-8">
          <div class="bg-card border rounded-lg p-1 inline-flex">
            <Button
              :variant="billingCycle === 'monthly' ? 'default' : 'ghost'"
              class="rounded-md"
              @click="billingCycle = 'monthly'"
            >
              Mensuel
            </Button>
            <Button
              :variant="billingCycle === 'yearly' ? 'default' : 'ghost'"
              class="rounded-md"
              @click="billingCycle = 'yearly'"
            >
              Annuel <Badge variant="outline" class="ml-2">-20%</Badge>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tableau de tarification -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Plan Freemium -->
          <Card>
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
              <CardDescription
                >Pour les débutants et les étudiants</CardDescription
              >
              <div class="mt-4">
                <span class="text-3xl font-bold">0€</span>
                <span class="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Idéal pour découvrir la plateforme et expérimenter les
                fonctionnalités de base.
              </p>
              <Separator />
              <div>
                <h4 class="font-medium mb-2">Inclus :</h4>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>3 projets simultanés</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>10 rendus HD par mois</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Bibliothèque standard (500 matériaux)</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Exports JPEG/PNG</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Support communautaire</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button class="w-full" as-child>
                <NuxtLink to="/auth/register">
                  Commencer gratuitement
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <!-- Plan Pro -->
          <Card class="border-primary">
            <div class="absolute top-0 right-4 transform -translate-y-1/2">
              <Badge>Populaire</Badge>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div class="mt-4">
                <span class="text-3xl font-bold">{{
                  billingCycle === 'monthly' ? '49€' : '39€'
                }}</span>
                <span class="text-muted-foreground">/mois</span>
                <span
                  v-if="billingCycle === 'yearly'"
                  class="text-xs ml-2 text-muted-foreground"
                >
                  Facturé annuellement (468€)
                </span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Solution complète pour les architectes et designers d'intérieur.
              </p>
              <Separator />
              <div>
                <h4 class="font-medium mb-2">Tout Freemium, plus :</h4>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Projets illimités</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>50 rendus HD par mois</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Bibliothèque premium (5 000 matériaux)</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Export 360° et visites virtuelles</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Support prioritaire par email</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Partage sécurisé des rendus</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button class="w-full" as-child>
                <NuxtLink to="/auth/register">
                  Essayer 14 jours gratuits
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <!-- Plan Entreprise -->
          <Card>
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les agences et studios</CardDescription>
              <div class="mt-4">
                <span class="text-3xl font-bold">{{
                  billingCycle === 'monthly' ? '199€' : '159€'
                }}</span>
                <span class="text-muted-foreground">/mois</span>
                <span
                  v-if="billingCycle === 'yearly'"
                  class="text-xs ml-2 text-muted-foreground"
                >
                  Facturé annuellement (1 908€)
                </span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Solution complète avec options de personnalisation avancées.
              </p>
              <Separator />
              <div>
                <h4 class="font-medium mb-2">Tout Pro, plus :</h4>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Projets et utilisateurs illimités</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Rendus illimités</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Bibliothèque complète (10 000+ matériaux)</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Intégration VR complète</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>API développeur</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Gestion des équipes et permissions</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                    <span>Support dédié 24/7</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button class="w-full" variant="outline" as-child>
                <NuxtLink to="/contact">
                  Contacter l'équipe commerciale
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Tableau comparatif détaillé -->
    <section class="py-12 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8 text-center">
          Comparaison détaillée des fonctionnalités
        </h2>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[200px]">Fonctionnalités</TableHead>
                <TableHead>Freemium</TableHead>
                <TableHead>Pro</TableHead>
                <TableHead>Entreprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">Nombre de projets</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Illimité</TableCell>
                <TableCell>Illimité</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Rendus HD par mois</TableCell>
                <TableCell>10</TableCell>
                <TableCell>50</TableCell>
                <TableCell>Illimité</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium"
                  >Bibliothèque de matériaux</TableCell
                >
                <TableCell>500</TableCell>
                <TableCell>5 000</TableCell>
                <TableCell>10 000+</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium"
                  >Génération 3D automatique</TableCell
                >
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Résolution maximale</TableCell>
                <TableCell>HD (1080p)</TableCell>
                <TableCell>4K</TableCell>
                <TableCell>8K</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Export 360°</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Visites virtuelles</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Intégration VR</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell>Basique</TableCell>
                <TableCell>Complète</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Formats d'export</TableCell>
                <TableCell>JPEG, PNG</TableCell>
                <TableCell>JPEG, PNG, TIFF</TableCell>
                <TableCell>Tous formats</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Export des modèles 3D</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell>OBJ, FBX</TableCell>
                <TableCell>Tous formats</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">API développeur</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Gestion des équipes</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell>Basique (3 membres)</TableCell>
                <TableCell>Avancée (illimitée)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Support technique</TableCell>
                <TableCell>Communautaire</TableCell>
                <TableCell>Email prioritaire</TableCell>
                <TableCell>Dédié 24/7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Marque blanche</TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><XIcon class="h-4 w-4 text-muted-foreground"
                /></TableCell>
                <TableCell
                  ><CheckIcon class="h-4 w-4 text-primary"
                /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 h-screen">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl font-bold mb-8 text-center">
          Questions fréquentes
        </h2>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              >Puis-je changer de forfait à tout moment ?</AccordionTrigger
            >
            <AccordionContent>
              Oui, vous pouvez passer à un forfait supérieur à tout moment. La
              différence sera calculée au prorata. Pour passer à un forfait
              inférieur, le changement prendra effet à la fin de votre période
              de facturation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              >Comment fonctionne l'essai gratuit ?</AccordionTrigger
            >
            <AccordionContent>
              L'essai gratuit de 14 jours vous donne accès à toutes les
              fonctionnalités du forfait Pro. Aucune carte de crédit n'est
              requise pour commencer. À la fin de la période d'essai, vous
              pouvez choisir de passer au forfait payant ou de revenir au
              forfait Freemium.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              >Les rendus non utilisés sont-ils reportés au mois suivant
              ?</AccordionTrigger
            >
            <AccordionContent>
              Non, les rendus non utilisés ne sont pas reportés. Votre quota est
              réinitialisé au début de chaque période de facturation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              >Existe-t-il des tarifs spéciaux pour les établissements
              d'enseignement ?</AccordionTrigger
            >
            <AccordionContent>
              Oui, nous proposons des remises pour les établissements
              d'enseignement et les étudiants. Contactez notre équipe
              commerciale pour plus d'informations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger
              >Comment fonctionne la facturation annuelle ?</AccordionTrigger
            >
            <AccordionContent>
              La facturation annuelle vous permet d'économiser 20% par rapport
              au tarif mensuel. Vous êtes facturé une fois par an et bénéficiez
              d'un accès ininterrompu pendant 12 mois.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <!-- CTA -->
      <div class="py-12">
        <div class="container mx-auto px-4">
          <div
            class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 class="text-2xl font-bold mb-4">
              Vous avez des besoins spécifiques ?
            </h2>
            <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contactez notre équipe commerciale pour discuter d'une solution
              personnalisée adaptée à votre organisation.
            </p>
            <Button size="lg" as-child>
              <NuxtLink to="/contact">
                Demander un devis personnalisé
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const billingCycle = ref('monthly')
</script>
