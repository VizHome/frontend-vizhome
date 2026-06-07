<!--
  Page Témoignages — empty state honnête en attendant de vrais retours utilisateurs.

  AVANT : 13 témoignages avec noms inventés, avatars pravatar.cc et stats
          fabriqués (2 500+ users, 96% satisfaction, etc.). Pas terrible
          pour la crédibilité d'un SaaS qui vient de lancer.

  MAINTENANT : on annonce clairement qu'on est en early access, on invite
               la communauté à participer (forum + essai gratuit), et on
               s'engage à publier les vrais retours quand on en aura.

  TODO : remplir `realTestimonials` au fur et à mesure qu'on collecte de
         vrais retours (avec accord des personnes citées, idéalement avec
         logo de leur entreprise + photo réelle).
-->
<template>
  <div>
    <!-- Hero -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">La voix de notre communauté</h1>
        <p class="text-lg text-muted-foreground">
          Les retours des premiers utilisateurs de VizHome, sans filtre.
        </p>
      </div>
    </section>

    <!-- Témoignages réels (vide pour l'instant) -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div
          v-if="realTestimonials.length === 0"
          class="rounded-2xl border bg-card p-10 sm:p-14 text-center"
        >
          <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
          >
            <SparklesIcon class="h-6 w-6 text-primary" />
          </div>
          <h2 class="text-xl font-semibold mb-2">
            Tu lis ces lignes pendant notre early access
          </h2>
          <p class="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-2">
            VizHome vient juste de lancer. Plutôt que d'inventer des
            témoignages bidon ou de gonfler nos chiffres, on préfère t'inviter
            à essayer toi-même et à venir nous dire ce que tu en penses.
          </p>
          <p class="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            On publiera ici les retours réels au fur et à mesure — avec accord
            explicite, vraie identité, vraie entreprise. Aucun avatar généré.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <Button class="rounded-full gap-1.5" as-child>
              <NuxtLink to="/auth/register">
                <SparklesIcon class="h-3.5 w-3.5" />
                Essayer gratuitement
              </NuxtLink>
            </Button>
            <Button variant="outline" class="rounded-full gap-1.5" as-child>
              <NuxtLink to="/forum">
                <MessagesSquareIcon class="h-3.5 w-3.5" />
                Rejoindre le forum
              </NuxtLink>
            </Button>
            <Button variant="ghost" class="rounded-full gap-1.5" as-child>
              <a href="mailto:feedback@vizhome.fr">
                <MailIcon class="h-3.5 w-3.5" />
                Partager mon retour
              </a>
            </Button>
          </div>
        </div>

        <!-- Quand on aura de vrais témoignages, ils s'afficheront ici -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            v-for="t in realTestimonials"
            :key="t.name"
            class="rounded-xl border shadow-sm"
          >
            <CardContent class="pt-6">
              <div class="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage :src="t.avatar ?? ''" :alt="t.name" />
                  <AvatarFallback>{{ initials(t.name) }}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 class="font-medium text-sm">{{ t.name }}</h3>
                  <p class="text-xs text-muted-foreground">{{ t.position }}</p>
                </div>
              </div>
              <blockquote class="italic text-sm text-muted-foreground leading-relaxed">
                "{{ t.quote }}"
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Promesse de transparence -->
    <section class="px-6 pb-16">
      <div class="max-w-2xl mx-auto">
        <div class="rounded-xl border bg-muted/30 p-6 text-center">
          <h3 class="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
            <ShieldCheckIcon class="h-4 w-4 text-primary" />
            Notre engagement de transparence
          </h3>
          <p class="text-xs text-muted-foreground leading-relaxed">
            On ne publiera jamais de témoignages fictifs, de stats inventés
            ou de logos de partenaires que nous n'avons pas. Quand des
            utilisateurs accepteront publiquement de témoigner, leurs noms
            apparaîtront ici — vérifiables et réels.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {
  MailIcon,
  MessagesSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from 'lucide-vue-next'

interface Testimonial {
  name: string
  position: string
  quote: string
  avatar?: string // chemin local /images/testimonials/xxx.jpg uniquement, pas de CDN externe
}

// À remplir au fur et à mesure qu'on collecte des retours réels.
// Règles :
// - Identité réelle (vérifiable via LinkedIn / entreprise)
// - Photo locale dans /public/images/testimonials/, ou Avatar fallback
// - Citation textuelle (pas de paraphrase marketing)
// - Accord explicite de la personne par email (à archiver)
const realTestimonials: Testimonial[] = []

function initials(name: string): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}
</script>
