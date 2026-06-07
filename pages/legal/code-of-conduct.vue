<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        Code de Conduite
      </h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">Ce qui est attendu, ce qui est interdit</p>
          <p class="text-muted-foreground">Dernière mise à jour : {{ lastUpdate }}</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Préambule</h2>
        <p>
          Ce Code de conduite s'applique à l'ensemble des espaces VizHome :
          forum, support, sections de commentaires, échanges avec l'équipe.
          Il complète la
          <NuxtLink to="/legal/community-charter" class="text-primary hover:underline">
            Charte de la communauté
          </NuxtLink>
          qui en pose l'esprit.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Ce qu'on attend de toi</h2>

        <Card class="mb-6">
          <CardContent class="pt-6">
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Respecter les autres membres, leurs idées, leurs créations.</p>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Critiquer les travaux de façon constructive, pas les personnes.</p>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Citer tes sources quand tu partages une astuce empruntée ailleurs.</p>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Signaler un contenu problématique plutôt que d'y répondre frontalement.</p>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>Accepter les décisions de modération, même quand tu n'es pas d'accord.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Comportements interdits</h2>

        <Card class="mb-6 border-destructive/30">
          <CardContent class="pt-6">
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>Insultes, discriminations, harcèlement, menaces, doxxing.</p>
              </li>
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  Contenus à caractère sexuel, violent ou choquant non
                  justifié par le sujet.
                </p>
              </li>
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  Spam, publicité non sollicitée, multi-comptes, manipulation
                  de votes.
                </p>
              </li>
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  Partage de contenus protégés par le droit d'auteur sans
                  autorisation.
                </p>
              </li>
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  Tentatives de contournement de la modération (création de
                  compte après ban, etc.).
                </p>
              </li>
              <li class="flex items-start gap-3">
                <XCircleIcon class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  Usurpation d'identité (membres de l'équipe, autres
                  utilisateurs, marques).
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Sanctions</h2>
        <p>L'équipe de modération peut, selon la gravité :</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Modifier ou supprimer un message.</li>
          <li>Fermer ou déplacer un sujet.</li>
          <li>Suspendre temporairement l'accès au forum.</li>
          <li>Bannir un compte du forum de façon définitive.</li>
        </ul>
        <p class="mt-3">
          Les sanctions sont appliquées avec proportionnalité. Une première
          infraction mineure entraîne en général un avertissement, sauf
          comportement clairement abusif.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Recours</h2>
        <p>
          Si tu estimes qu'une sanction a été prise injustement, tu peux
          contester en utilisant le
          <NuxtLink to="/contact" class="text-primary hover:underline">
            formulaire de contact
          </NuxtLink>
          en précisant la décision contestée et tes arguments. L'équipe te
          répondra sous quelques jours ouvrés.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Signalement</h2>
        <p>
          Pour signaler un comportement contraire à ce Code, utilise le
          bouton de signalement sur le sujet ou la réponse concernée. Les
          signalements sont traités confidentiellement.
        </p>

        <div class="mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="outline" as-child>
            <NuxtLink to="/legal/community-charter">Charte de la communauté</NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/legal/terms-of-use">Conditions d'utilisation</NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/forum">Retour au forum</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next'

const lastUpdate = '06/06/2026'

useHead({
  title: 'Code de conduite',
  meta: [
    {
      name: 'description',
      content:
        'Les règles de comportement attendues sur le forum et les espaces communautaires de VizHome.',
    },
  ],
})
</script>
