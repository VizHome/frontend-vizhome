<template>
  <div>
    <!-- En-tête de la fonctionnalité -->
    <section class="pt-20 pb-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge class="mb-4">Travail d'équipe</Badge>
            <h1 class="text-4xl font-bold mb-6">Partage et collaboration</h1>
            <p class="text-xl text-muted-foreground mb-6">
              Travaillez efficacement en équipe avec nos outils de collaboration
              avancés. Partagez, commentez et collaborez en temps réel sur vos
              projets 3D.
            </p>
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register"> Collaborer maintenant </NuxtLink>
            </Button>
          </div>
          <div
            class="relative aspect-video rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Partage et collaboration"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités de collaboration -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Fonctionnalités de collaboration
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
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

          <Card>
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

          <Card>
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
      </div>
    </section>

    <!-- Workflow de collaboration -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">
          Workflow de collaboration fluide
        </h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Un processus simple et efficace pour travailler ensemble sur vos
          projets architecturaux
        </p>

        <div class="relative max-w-5xl mx-auto">
          <!-- Ligne de temps -->
          <div
            class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"
          />

          <!-- Étapes -->
          <div class="space-y-12">
            <div
              class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div class="md:text-right order-2 md:order-1">
                <h3 class="text-xl font-medium mb-2">Invitez votre équipe</h3>
                <p class="text-muted-foreground">
                  Ajoutez facilement des collaborateurs à votre projet en leur
                  envoyant une invitation par email. Définissez leurs
                  permissions selon leurs rôles.
                </p>
              </div>
              <div class="relative order-1 md:order-2">
                <div
                  class="md:absolute md:-left-6 w-12 h-12 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center"
                >
                  <UserPlusIcon class="h-5 w-5 text-primary" />
                </div>
                <img
                  src="/images/generate/image_generate.png"
                  alt="Inviter des collaborateurs"
                  class="rounded-lg shadow-md md:ml-8"
                />
              </div>
            </div>

            <div
              class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div class="relative">
                <div
                  class="md:absolute md:-right-6 w-12 h-12 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center"
                >
                  <PencilRulerIcon class="h-5 w-5 text-primary" />
                </div>
                <img
                  src="/images/generate/image_generate.png"
                  alt="Modifier ensemble"
                  class="rounded-lg shadow-md md:mr-8"
                />
              </div>
              <div>
                <h3 class="text-xl font-medium mb-2">Modifiez en temps réel</h3>
                <p class="text-muted-foreground">
                  Travaillez simultanément sur le même projet avec une
                  synchronisation en temps réel. Voyez les modifications des
                  autres membres instantanément.
                </p>
              </div>
            </div>

            <div
              class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div class="md:text-right order-2 md:order-1">
                <h3 class="text-xl font-medium mb-2">Commentez et annotez</h3>
                <p class="text-muted-foreground">
                  Laissez des commentaires précis directement sur des éléments
                  spécifiques du modèle 3D pour une communication claire et
                  contextuelle.
                </p>
              </div>
              <div class="relative order-1 md:order-2">
                <div
                  class="md:absolute md:-left-6 w-12 h-12 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center"
                >
                  <MessageSquareIcon class="h-5 w-5 text-primary" />
                </div>
                <img
                  src="/images/generate/image_generate.png"
                  alt="Commenter et annoter"
                  class="rounded-lg shadow-md md:ml-8"
                />
              </div>
            </div>

            <div
              class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div class="relative">
                <div
                  class="md:absolute md:-right-6 w-12 h-12 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center"
                >
                  <Share2Icon class="h-5 w-5 text-primary" />
                </div>
                <img
                  src="/images/generate/image_generate.png"
                  alt="Partager avec les clients"
                  class="rounded-lg shadow-md md:mr-8"
                />
              </div>
              <div>
                <h3 class="text-xl font-medium mb-2">
                  Partagez avec les clients
                </h3>
                <p class="text-muted-foreground">
                  Présentez votre travail aux clients avec un lien de partage
                  sécurisé, leur permettant de visualiser et commenter sans
                  accès complet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gestion des droits -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
        >
          <div>
            <h2 class="text-3xl font-bold mb-6">Gestion flexible des accès</h2>
            <p class="text-muted-foreground mb-6">
              Contrôlez précisément qui peut voir et modifier vos projets grâce
              à notre système avancé de permissions et de rôles.
            </p>
            <div class="space-y-4">
              <div class="flex gap-4 items-start">
                <div
                  class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
                >
                  <UserIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium mb-1">Administrateur</h3>
                  <p class="text-sm text-muted-foreground">
                    Contrôle total sur le projet, y compris les permissions des
                    autres utilisateurs.
                  </p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div
                  class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
                >
                  <EditIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium mb-1">Éditeur</h3>
                  <p class="text-sm text-muted-foreground">
                    Peut modifier le projet mais ne peut pas changer les
                    paramètres d'accès.
                  </p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div
                  class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
                >
                  <MessageSquareTextIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium mb-1">Commentateur</h3>
                  <p class="text-sm text-muted-foreground">
                    Peut visualiser et commenter mais ne peut pas modifier le
                    projet.
                  </p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div
                  class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
                >
                  <EyeIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium mb-1">Spectateur</h3>
                  <p class="text-sm text-muted-foreground">
                    Accès en lecture seule, parfait pour les clients ou parties
                    prenantes externes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-muted rounded-lg p-6">
            <div class="space-y-4">
              <h3 class="font-medium mb-2">Paramètres de partage</h3>

              <div class="space-y-2">
                <Label for="project-access">Niveau d'accès</Label>
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
                <Label for="expiration">Expiration du lien</Label>
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

              <div class="flex items-center space-x-2">
                <Checkbox id="password" />
                <label
                  for="password"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Protéger par mot de passe
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="download" />
                <label
                  for="download"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Autoriser le téléchargement
                </label>
              </div>

              <Button class="w-full">Créer un lien de partage</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Intégrations -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">Intégrations</h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Connectez VizHome à vos outils préférés pour un workflow sans
          interruption
        </p>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto"
        >
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Slack"
              class="h-10"
            />
          </div>
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Trello"
              class="h-10"
            />
          </div>
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Asana"
              class="h-10"
            />
          </div>
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Google Drive"
              class="h-10"
            />
          </div>
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Dropbox"
              class="h-10"
            />
          </div>
          <div
            class="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Microsoft Teams"
              class="h-10"
            />
          </div>
        </div>

        <div class="text-center mt-8">
          <Button variant="outline" size="sm" class="gap-1">
            Voir toutes les intégrations
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto"
        >
          <h2 class="text-3xl font-bold mb-4">
            Collaborez efficacement sur vos projets 3D
          </h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Améliorez la productivité de votre équipe et facilitez la
            communication avec vos clients grâce à nos outils de collaboration.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register"> Commencer gratuitement </NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <NuxtLink to="/pricing"> Voir nos offres </NuxtLink>
            </Button>
          </div>
        </div>
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
  EditIcon,
  MessageSquareTextIcon,
  EyeIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'
</script>
