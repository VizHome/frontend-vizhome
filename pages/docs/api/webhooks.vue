<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Webhooks</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Intégration et automatisation avec les webhooks
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Les webhooks permettent d'intégrer VizHome à vos applications et
          services existants. Cette page explique comment configurer, utiliser
          et gérer les webhooks pour automatiser vos workflows et recevoir des
          notifications en temps réel sur les événements de votre compte
          VizHome.
        </p>
      </CardContent>
    </Card>

    <!-- Présentation des webhooks -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Qu'est-ce qu'un webhook ?</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Un webhook est un mécanisme qui permet à VizHome d'envoyer
            automatiquement des notifications à votre application lorsque
            certains événements se produisent. Contrairement à l'API où vous
            devez interroger régulièrement nos serveurs, les webhooks envoient
            des données immédiatement lorsqu'un événement spécifié se produit.
          </p>

          <div class="mb-6 overflow-x-auto">
            <img
              src="/images/generate/image_generate.png"
              alt="Diagramme webhook"
              class="w-full max-w-2xl mx-auto rounded-lg border"
            />
          </div>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Notification en temps réel</h3>
              <p class="text-sm text-muted-foreground">
                Recevez des notifications immédiates lorsqu'un événement
                important se produit dans votre compte VizHome.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Automatisation des processus</h3>
              <p class="text-sm text-muted-foreground">
                Déclenchez des actions automatiques dans vos systèmes externes
                en réponse aux événements VizHome.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Intégration simplifiée</h3>
              <p class="text-sm text-muted-foreground">
                Connectez facilement VizHome à d'autres applications sans avoir
                à développer des solutions complexes.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Réduction de la charge serveur</h3>
              <p class="text-sm text-muted-foreground">
                Évitez les requêtes répétées à notre API pour vérifier les
                changements, optimisant ainsi les performances.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Types d'événements -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Types d'événements disponibles</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome propose de nombreux types d'événements auxquels vous pouvez
            vous abonner via les webhooks :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">
                Événements liés aux projets
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">project.created</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un nouveau projet est créé dans votre
                    compte.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">project.updated</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un projet existant est modifié.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">project.deleted</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un projet est supprimé.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">project.shared</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un projet est partagé avec un autre
                    utilisateur.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Événements liés aux rendus
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">render.started</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un nouveau rendu commence à être calculé.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">render.completed</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un rendu est terminé avec succès.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">render.failed</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché si un rendu échoue pour une raison quelconque.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">render.exported</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un rendu est exporté dans un format
                    spécifique.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Événements liés aux modèles 3D
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">model.processing</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsque la génération d'un modèle 3D commence.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">model.completed</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un modèle 3D est généré avec succès.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">model.failed</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché si la génération d'un modèle 3D échoue.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">model.modified</h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un modèle 3D existant est modifié.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Événements liés au compte
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    account.subscription_updated
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsque l'abonnement du compte est modifié.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    account.quota_exceeded
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsque le quota de stockage ou de rendus est
                    atteint.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    account.team_member_added
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'un nouveau membre est ajouté à l'équipe.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    account.api_key_created
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Déclenché lorsqu'une nouvelle clé API est créée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Configuration des webhooks -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Configuration des webhooks</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour configurer un webhook dans VizHome, suivez ces étapes :
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                1
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">
                  Accédez aux paramètres de l'API
                </h3>
                <p class="text-sm text-muted-foreground">
                  Dans votre tableau de bord, allez dans
                  <span class="px-2 py-1 bg-muted rounded text-xs"
                    >Paramètres > API et intégrations > Webhooks</span
                  >.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                2
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Créez un nouveau webhook</h3>
                <p class="text-sm text-muted-foreground">
                  Cliquez sur
                  <span class="px-2 py-1 bg-muted rounded text-xs"
                    >+ Ajouter un webhook</span
                  >.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                3
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Configurez les détails</h3>
                <p class="text-sm text-muted-foreground">
                  Entrez l'URL de destination où VizHome enverra les
                  notifications, donnez un nom descriptif à votre webhook, et
                  sélectionnez les événements auxquels vous souhaitez vous
                  abonner.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                4
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">
                  Configurez la sécurité (optionnel)
                </h3>
                <p class="text-sm text-muted-foreground">
                  Définissez une clé secrète pour vérifier l'authenticité des
                  notifications reçues.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                5
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Activez le webhook</h3>
                <p class="text-sm text-muted-foreground">
                  Assurez-vous que le statut du webhook est défini sur "Actif"
                  et enregistrez la configuration.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium mb-3">
              Exemple d'interface de configuration
            </h3>
            <div class="border rounded-lg overflow-hidden">
              <img
                src="/images/generate/image_generate.png"
                alt="Interface de configuration webhook"
                class="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Structure des notifications -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Structure des notifications</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Les notifications envoyées par VizHome suivent une structure JSON
            standard qui comprend :
          </p>

          <div class="rounded-lg overflow-hidden border mb-6">
            <div class="bg-muted px-4 py-2 font-medium text-sm">
              Exemple de notification JSON
            </div>
            <div class="p-4 bg-muted/30 overflow-x-auto">
              <pre class="text-xs text-muted-foreground leading-relaxed">
{
  "id": "evt_12345abcde",
  "event_type": "render.completed",
  "created_at": "2023-06-15T14:30:45Z",
  "data": {
    "project_id": "proj_67890fghij",
    "render_id": "rend_54321klmno",
    "name": "Living Room - Angle 2",
    "type": "static",
    "resolution": "4K",
    "url": "https://storage.vizhome.com/renders/living-room-angle-2.jpg",
    "processing_time": 124.5,
    "metadata": {
      "camera_position": {"x": 1.2, "y": 1.6, "z": -3.5},
      "lighting_setup": "natural_daylight",
      "post_processing": true
    }
  },
  "account_id": "acc_98765pqrst"
}</pre
              >
            </div>
          </div>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Champs communs à tous les événements</h3>
              <ul class="space-y-1 text-sm text-muted-foreground mt-1">
                <li>
                  <span class="font-mono text-xs">id</span> : Identifiant unique
                  de l'événement
                </li>
                <li>
                  <span class="font-mono text-xs">event_type</span> : Type
                  d'événement (ex: render.completed)
                </li>
                <li>
                  <span class="font-mono text-xs">created_at</span> : Date et
                  heure de l'événement (ISO 8601)
                </li>
                <li>
                  <span class="font-mono text-xs">data</span> : Données
                  spécifiques à l'événement
                </li>
                <li>
                  <span class="font-mono text-xs">account_id</span> :
                  Identifiant de votre compte VizHome
                </li>
              </ul>
            </div>

            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Spécificités selon les événements</h3>
              <p class="text-sm text-muted-foreground">
                Le contenu du champ
                <span class="font-mono text-xs">data</span> varie en fonction du
                type d'événement. Consultez notre
                <NuxtLink to="/docs/api" class="text-primary hover:underline"
                  >documentation API complète
                </NuxtLink>
                pour les détails spécifiques à chaque type d'événement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Bonnes pratiques et sécurité -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Bonnes pratiques et sécurité</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">
                Vérification de la signature
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                Pour garantir l'authenticité des notifications reçues, VizHome
                inclut une signature HMAC dans l'en-tête
                <span class="font-mono text-xs">X-VizHome-Signature</span> :
              </p>
              <div class="rounded-lg overflow-hidden border mb-4">
                <div class="bg-muted px-4 py-2 font-medium text-sm">
                  Exemple de code de vérification (Node.js)
                </div>
                <div class="p-4 bg-muted/30 overflow-x-auto">
                  <pre class="text-xs text-muted-foreground leading-relaxed">
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(calculatedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  );
}

// Dans votre gestionnaire de webhook
app.post('/webhook', (req, res) => {
  const payload = JSON.stringify(req.body);
  const signature = req.headers['x-vizhome-signature'];
  const webhookSecret = 'votre_clé_secrète';

  if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
    return res.status(401).send('Signature invalide');
  }

  // Traitement de l'événement...
  res.status(200).send('OK');
});</pre
                  >
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Gestion des retransmissions
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                VizHome peut parfois renvoyer des notifications si le serveur
                destination ne répond pas par un code 2xx. Pour éviter le
                traitement en double, utilisez l'identifiant unique
                <span class="font-mono text-xs">id</span> de l'événement.
              </p>
              <div class="border rounded-lg p-4 bg-primary/5 mb-4">
                <div class="flex items-start gap-3">
                  <InfoIcon class="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p class="text-sm font-medium">Idempotence</p>
                    <p class="text-sm text-muted-foreground mt-1">
                      Stockez temporairement les identifiants d'événements
                      traités pour ignorer les doublons potentiels. Nous
                      recommandons de conserver ces identifiants pendant au
                      moins 24 heures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Délai de réponse</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Votre endpoint doit répondre rapidement aux notifications (sous
                5 secondes idéalement). Si le traitement est long, accusez
                réception immédiatement et traitez l'événement de manière
                asynchrone.
              </p>
              <div class="flex flex-col md:flex-row gap-4">
                <div class="border rounded-lg p-3 flex-1">
                  <h4 class="text-sm font-medium mb-1 text-green-600">
                    Recommandé
                  </h4>
                  <pre class="text-xs text-muted-foreground">
# Répondre immédiatement
return 200, puis traiter en arrière-plan</pre
                  >
                </div>
                <div class="border rounded-lg p-3 flex-1">
                  <h4 class="text-sm font-medium mb-1 text-red-600">
                    À éviter
                  </h4>
                  <pre class="text-xs text-muted-foreground">
# Traitement synchrone long
traiter(), puis return 200</pre
                  >
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Test des webhooks</h3>
              <p class="text-sm text-muted-foreground mb-3">
                VizHome propose un outil de test pour simuler des événements
                sans avoir à les déclencher réellement :
              </p>
              <ol class="list-decimal list-inside space-y-2 text-sm ml-2">
                <li>Accédez à la page de gestion des webhooks</li>
                <li>Sélectionnez le webhook à tester</li>
                <li>Cliquez sur "Tester" et choisissez un type d'événement</li>
                <li>
                  Visualisez la réponse et les logs pour vérifier le bon
                  fonctionnement
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Exemples d'intégration -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Exemples d'intégration</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Voici quelques cas d'usage courants pour l'intégration des webhooks
            VizHome :
          </p>

          <div class="space-y-4">
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Notification client automatique</h3>
              <p class="text-sm text-muted-foreground">
                Utilisez l'événement
                <span class="font-mono text-xs">render.completed</span> pour
                envoyer automatiquement un email à vos clients dès qu'un rendu
                est terminé, avec un lien direct vers l'image.
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Zapier</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Mailchimp</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >SendGrid</span
                >
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Intégration CRM</h3>
              <p class="text-sm text-muted-foreground">
                Connectez VizHome à votre CRM pour mettre à jour automatiquement
                le statut des projets clients lorsqu'un modèle 3D est généré ou
                qu'un rendu est terminé.
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Salesforce</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >HubSpot</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Pipedrive</span
                >
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Synchronisation de fichiers</h3>
              <p class="text-sm text-muted-foreground">
                Sauvegardez automatiquement vos rendus et modèles 3D sur votre
                propre serveur ou service de stockage dès qu'ils sont terminés.
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Dropbox</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Google Drive</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >AWS S3</span
                >
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Notifications d'équipe</h3>
              <p class="text-sm text-muted-foreground">
                Envoyez des notifications à votre équipe via Slack ou Teams
                lorsque des projets sont créés, partagés ou lorsque des rendus
                sont terminés.
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Slack</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Microsoft Teams</span
                >
                <span class="px-2 py-1 bg-primary/10 rounded-full text-xs"
                  >Discord</span
                >
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Pages associées -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Pages associées</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink to="/docs/api">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">API</CardTitle>
              <CardDescription>Documentation de l'API RESTful</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Utilisez notre API pour intégrer VizHome à vos applications.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/rendus">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Rendus</CardTitle>
              <CardDescription
                >Création d'images professionnelles</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Découvrez comment générer des rendus qui pourront déclencher des
                webhooks.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/projets">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Projets</CardTitle>
              <CardDescription>Gestion de vos projets</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Apprenez à gérer vos projets qui généreront des événements
                webhook.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>
