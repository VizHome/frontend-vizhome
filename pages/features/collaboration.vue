<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Travail d'équipe</Badge>
        <h1 class="text-4xl font-bold mb-6">Partage et collaboration</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Travaillez efficacement en équipe avec nos outils de collaboration
          avancés. Partagez, commentez et collaborez en temps réel sur vos
          projets 3D.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Collaborer maintenant</NuxtLink>
        </Button>
      </div>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Partage et collaboration"
          class="object-cover w-full h-full"
        />
      </div>
    </section>

    <!-- Fonctionnalités de collaboration -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Fonctionnalités de collaboration
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <UsersIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Équipes de projet</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Créez des équipes avec différents niveaux d'accès et collaborez
              sur plusieurs projets simultanément avec un contrôle total.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <MessageSquareIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Commentaires contextuels</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Ajoutez des annotations directement sur les modèles 3D pour
              communiquer précisément vos idées et modifications.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <HistoryIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Historique des versions</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Suivez l'évolution de vos projets avec un historique complet des
              modifications et la possibilité de revenir à des versions
              précédentes.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Workflow -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-4 text-center">
        Workflow de collaboration fluide
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Un processus simple et efficace pour travailler ensemble sur vos projets
        architecturaux.
      </p>
      <div class="space-y-10 max-w-3xl mx-auto">
        <div
          v-for="(step, i) in workflowSteps"
          :key="step.title"
          class="flex gap-6 items-start"
        >
          <div
            class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
          >
            <component :is="step.icon" class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p
              class="text-xs font-semibold text-primary uppercase tracking-wide mb-1"
            >
              Étape {{ i + 1 }}
            </p>
            <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-muted-foreground">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gestion des accès -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div>
        <h2 class="text-3xl font-bold mb-6">Gestion flexible des accès</h2>
        <p class="text-muted-foreground mb-6">
          Contrôlez précisément qui peut voir et modifier vos projets grâce à
          notre système avancé de permissions et de rôles.
        </p>
        <div class="space-y-4">
          <div
            v-for="role in roles"
            :key="role.name"
            class="flex gap-4 items-start"
          >
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <component :is="role.icon" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="font-semibold mb-1">{{ role.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ role.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-muted/30 rounded-xl border p-6">
        <h3 class="font-semibold mb-4">Paramètres de partage</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label>Niveau d'accès</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau d'accès" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="editor">Éditeur</SelectItem>
                <SelectItem value="commenter">Commentateur</SelectItem>
                <SelectItem value="viewer">Spectateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Expiration du lien</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Durée de validité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Jamais</SelectItem>
                <SelectItem value="24h">24 heures</SelectItem>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="password" />
            <label
              for="password"
              class="text-sm font-medium leading-none cursor-pointer"
              >Protéger par mot de passe</label
            >
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="download" />
            <label
              for="download"
              class="text-sm font-medium leading-none cursor-pointer"
              >Autoriser le téléchargement</label
            >
          </div>
          <Button class="w-full rounded-full">Créer un lien de partage</Button>
        </div>
      </div>
    </section>

    <!-- Intégrations -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">Intégrations</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Connectez VizHome à vos outils préférés pour un workflow sans
        interruption.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <div
          v-for="tool in integrations"
          :key="tool"
          class="bg-muted/30 rounded-xl border p-4 flex items-center justify-center h-16"
        >
          <span class="text-sm font-medium text-muted-foreground">{{
            tool
          }}</span>
        </div>
      </div>
      <div class="text-center mt-8">
        <Button variant="outline" class="rounded-full gap-2">
          Voir toutes les intégrations
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border p-8 md:p-12 text-center"
    >
      <h2 class="text-3xl font-bold mb-4">
        Collaborez efficacement sur vos projets 3D
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Améliorez la productivité de votre équipe et facilitez la communication
        avec vos clients grâce à nos outils de collaboration.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
        </Button>
        <Button size="lg" variant="outline" class="rounded-full" as-child>
          <NuxtLink to="/pricing">Voir nos offres</NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  MessageSquareIcon,
  HistoryIcon,
  UserPlusIcon,
  PencilRulerIcon,
  Share2Icon,
  UserIcon,
  PenSquareIcon,
  MessageSquareTextIcon,
  EyeIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'

useSeo({
  title: 'Partage et collaboration',
  description:
    'Invitez clients et collaborateurs sur vos projets 3D : rôles granulaires, commentaires contextuels, liens sécurisés et synchronisation temps réel.',
  ogImage: '/images/generate/image_generate.png',
})

const workflowSteps = [
  {
    icon: UserPlusIcon,
    title: 'Invitez votre équipe',
    desc: 'Ajoutez facilement des collaborateurs à votre projet en leur envoyant une invitation par email. Définissez leurs permissions selon leurs rôles.',
  },
  {
    icon: PencilRulerIcon,
    title: 'Modifiez en temps réel',
    desc: 'Travaillez simultanément sur le même projet avec une synchronisation en temps réel. Voyez les modifications des autres membres instantanément.',
  },
  {
    icon: MessageSquareIcon,
    title: 'Commentez et annotez',
    desc: 'Laissez des commentaires précis directement sur des éléments spécifiques du modèle 3D pour une communication claire et contextuelle.',
  },
  {
    icon: Share2Icon,
    title: 'Partagez avec les clients',
    desc: 'Présentez votre travail aux clients avec un lien de partage sécurisé, leur permettant de visualiser et commenter sans accès complet.',
  },
]

const roles = [
  {
    icon: UserIcon,
    name: 'Administrateur',
    desc: 'Contrôle total sur le projet, y compris les permissions des autres utilisateurs.',
  },
  {
    icon: PenSquareIcon,
    name: 'Éditeur',
    desc: "Peut modifier le projet mais ne peut pas changer les paramètres d'accès.",
  },
  {
    icon: MessageSquareTextIcon,
    name: 'Commentateur',
    desc: 'Peut visualiser et commenter mais ne peut pas modifier le projet.',
  },
  {
    icon: EyeIcon,
    name: 'Spectateur',
    desc: 'Accès en lecture seule, parfait pour les clients ou parties prenantes externes.',
  },
]

const integrations = [
  'Slack',
  'Trello',
  'Asana',
  'Google Drive',
  'Dropbox',
  'Teams',
]
</script>
