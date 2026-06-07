<template>
  <div>
    <!-- En-tête -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">Questions fréquentes</h1>
        <p class="text-lg text-muted-foreground">
          Tout ce que vous devez savoir sur VizHome et nos services
        </p>
      </div>
    </section>

    <!-- Recherche -->
    <section class="py-8 px-6 border-b bg-muted/30">
      <div class="max-w-xl mx-auto">
        <div class="relative">
          <SearchIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Rechercher une question..."
            class="pl-9 rounded-full"
          />
        </div>
        <div v-if="searchQuery && filteredFAQs.length > 0" class="mt-6">
          <p class="text-sm text-muted-foreground mb-4">
            {{ filteredFAQs.length }} résultat(s) pour "{{ searchQuery }}"
          </p>
          <FAQAccordion :items="filteredFAQs" />
        </div>
        <div v-else-if="searchQuery" class="mt-6 text-center py-8">
          <p class="text-4xl mb-3">🔍</p>
          <h3 class="font-medium mb-1">Aucun résultat trouvé</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Essayez de modifier votre recherche ou contactez notre support
          </p>
          <Button variant="outline" class="rounded-full" as-child>
            <NuxtLink to="/contact">Contacter le support</NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Onglets par catégorie -->
    <section v-if="!searchQuery" class="py-10 px-6">
      <div class="max-w-3xl mx-auto">
        <Tabs default-value="general" class="w-full">
          <TabsList class="grid w-full grid-cols-5 rounded-full mb-6">
            <TabsTrigger value="general" class="rounded-full text-xs sm:text-sm"
              >Général</TabsTrigger
            >
            <TabsTrigger
              value="technical"
              class="rounded-full text-xs sm:text-sm"
              >Technique</TabsTrigger
            >
            <TabsTrigger value="pricing" class="rounded-full text-xs sm:text-sm"
              >Tarifs</TabsTrigger
            >
            <TabsTrigger
              value="security"
              class="rounded-full text-xs sm:text-sm"
              >Sécurité</TabsTrigger
            >
            <TabsTrigger value="support" class="rounded-full text-xs sm:text-sm"
              >Support</TabsTrigger
            >
          </TabsList>
          <TabsContent value="general"
            ><FAQAccordion :items="generalFAQs"
          /></TabsContent>
          <TabsContent value="technical"
            ><FAQAccordion :items="technicalFAQs"
          /></TabsContent>
          <TabsContent value="pricing"
            ><FAQAccordion :items="pricingFAQs"
          /></TabsContent>
          <TabsContent value="security"
            ><FAQAccordion :items="securityFAQs"
          /></TabsContent>
          <TabsContent value="support"
            ><FAQAccordion :items="supportFAQs"
          /></TabsContent>
        </Tabs>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-12 px-6 border-t bg-muted/30">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-xl font-bold mb-2">Vous ne trouvez pas de réponse ?</h2>
        <p class="text-muted-foreground mb-6">
          Notre équipe de support est disponible pour vous aider.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <Button class="rounded-full" as-child>
            <NuxtLink to="/contact">Contacter le support</NuxtLink>
          </Button>
          <Button variant="outline" class="rounded-full" as-child>
            <a href="mailto:support@vizhome.fr">support@vizhome.fr</a>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import FAQAccordion, { type FAQItem } from '@/components/FAQAccordion.vue'


const searchQuery = ref('')

const generalFAQs = [
  {
    question: "Qu'est-ce que VizHome ?",
    answer:
      "VizHome est une solution SaaS d'intégration 3D architecturale basée sur l'IA. Notre technologie permet de créer des rendus photoréalistes et des modèles 3D à partir de simples photos de vos espaces.",
  },
  {
    question: 'Comment fonctionne la technologie ?',
    answer:
      "Notre moteur d'IA analyse les photos que vous téléchargez pour comprendre la géométrie de l'espace, les textures, les matériaux et l'éclairage. Il génère ensuite un modèle 3D texturé qui peut être modifié et visualisé sous différents angles.",
  },
  {
    question: 'Qui peut utiliser VizHome ?',
    answer:
      "VizHome est conçu pour les architectes, designers d'intérieur, agents immobiliers, promoteurs et tout professionnel travaillant dans l'aménagement d'espaces. Notre version Freemium est également accessible aux particuliers et étudiants.",
  },
  {
    question: 'Faut-il des compétences techniques ?',
    answer:
      'Non, VizHome a été conçu pour être utilisé sans compétences techniques particulières. Notre interface intuitive vous guide à travers toutes les étapes de création et de personnalisation de vos rendus 3D.',
  },
  {
    question: 'Puis-je utiliser VizHome sur mobile ?',
    answer:
      'Oui, VizHome est accessible sur tous les appareils via notre application web responsive. Nous proposons également des applications natives iOS et Android pour une expérience optimisée sur mobile.',
  },
]

const technicalFAQs: FAQItem[] = [
  {
    question: 'Quels types de photos puis-je utiliser ?',
    answer:
      "Pour des résultats optimaux, utilisez des photos bien éclairées prises en mode paysage. Évitez les photos floues ou avec des objets en mouvement. Plus vous fournissez de photos d'un même espace sous différents angles, meilleurs seront les résultats.",
  },
  {
    question: "Quelles résolutions d'image sont supportées ?",
    answer:
      "VizHome accepte les images de 1 MP à 50 MP. Pour des résultats optimaux, nous recommandons des images d'au moins 12 MP. Une résolution plus élevée permet d'obtenir des textures plus détaillées.",
  },
  {
    question:
      "Puis-je modifier les matériaux et l'éclairage après la génération ?",
    answer:
      "Absolument ! Notre éditeur vous permet de modifier tous les aspects de votre rendu 3D, y compris les matériaux, les textures, l'éclairage, et même d'ajouter ou supprimer des meubles et objets.",
  },
  {
    question: "Quels formats d'export sont disponibles ?",
    answer:
      'Selon votre forfait, vous pouvez exporter en JPEG, PNG, TIFF pour les images, et en OBJ, FBX, GLTF pour les modèles 3D. Les vues 360° peuvent être exportées en format standard pour intégration web ou VR.',
  },
  {
    question: 'Est-ce que VizHome fonctionne hors ligne ?',
    answer:
      'Non, VizHome est un service cloud qui nécessite une connexion internet pour fonctionner. Cependant, une fois générés, vos rendus peuvent être téléchargés et utilisés hors ligne.',
  },
  {
    question: "Comment lancer un rendu via l'API ?",
    answer:
      "Notre API REST permet de générer des rendus IA de façon programmatique. Tu fais un POST sur /api/v1/renders/ avec un prompt, le backend répond 202 avec status \"pending\", puis tu poll /api/v1/renders/{id} toutes les 2 secondes jusqu'à status \"done\" ou \"failed\".",
    code: {
      language: 'bash',
      filename: 'create-render.sh',
      code: `# 1. Lance la génération (réponse 202 immédiate)
curl -X POST https://api.vizhome.fr/api/v1/renders/ \\
  -H "Authorization: Bearer $VIZHOME_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "prompt",
    "output_type": "2d",
    "prompt": "Salon scandinave avec parquet chêne et grandes baies"
  }'
# → { "id": 42, "status": "pending", ... }

# 2. Récupère le résultat (poll toutes les 2s)
curl https://api.vizhome.fr/api/v1/renders/42 \\
  -H "Authorization: Bearer $VIZHOME_TOKEN"
# → { "status": "done", "result_url": "https://cdn.vizhome.fr/..." }`,
    },
  },
  {
    question: 'Comment authentifier mes requêtes API ?',
    answer:
      'Toutes les routes /api/v1/* (sauf /auth/* et /billing/plans) requièrent un JWT dans le header Authorization. Tu obtiens un access token et un refresh token via /api/v1/auth/login. Le access token expire après 15 minutes — utilise /api/v1/auth/refresh pour le rafraîchir.',
    code: {
      language: 'bash',
      filename: 'auth-flow.sh',
      code: `# Login → récupère access + refresh tokens
TOKEN=$(curl -s -X POST https://api.vizhome.fr/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"toi@example.com","password":"..."}' \\
  | jq -r '.access')

# Utilise le token sur n'importe quel endpoint
curl https://api.vizhome.fr/api/v1/me/ \\
  -H "Authorization: Bearer $TOKEN"`,
    },
  },
]

const pricingFAQs = [
  {
    question: 'Puis-je essayer VizHome avant de payer ?',
    answer:
      "Oui, notre forfait Freemium vous permet d'essayer gratuitement les fonctionnalités de base. Nous proposons également un essai gratuit de 14 jours du forfait Pro sans engagement.",
  },
  {
    question: 'Comment fonctionne la facturation ?',
    answer:
      'Nous proposons des abonnements mensuels ou annuels, avec une réduction de 20% pour les paiements annuels. Les paiements sont sécurisés et nous acceptons toutes les cartes de crédit majeures ainsi que PayPal.',
  },
  {
    question: 'Puis-je changer de forfait à tout moment ?',
    answer:
      'Oui, vous pouvez passer à un forfait supérieur à tout moment. Le changement prend effet immédiatement et la différence est calculée au prorata. Pour passer à un forfait inférieur, le changement prendra effet à la fin de votre période de facturation.',
  },
  {
    question: 'Y a-t-il des frais cachés ?',
    answer:
      "Non, tous nos tarifs sont transparents et incluent toutes les fonctionnalités mentionnées. Il n'y a pas de frais supplémentaires sauf si vous dépassez les limites de votre forfait.",
  },
  {
    question:
      "Proposez-vous des tarifs spéciaux pour les établissements d'enseignement ?",
    answer:
      "Oui, nous offrons des remises pour les établissements d'enseignement et les étudiants. Contactez notre équipe commerciale pour plus d'informations.",
  },
]

const securityFAQs = [
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer:
      "Oui, toutes les données sont chiffrées en transit et au repos. Nous utilisons des serveurs sécurisés et respectons les meilleures pratiques de l'industrie en matière de sécurité des données.",
  },
  {
    question: 'Qui peut voir mes projets ?',
    answer:
      "Seuls vous et les personnes avec qui vous choisissez de partager vos projets peuvent y accéder. Nous ne partageons jamais vos projets avec d'autres utilisateurs sans votre autorisation explicite.",
  },
  {
    question: 'Conservez-vous les droits sur mes créations ?',
    answer:
      "Non, vous conservez tous les droits sur vos créations. Nous n'utilisons pas vos données pour entraîner nos modèles d'IA sans votre consentement explicite.",
  },
  {
    question: 'Comment puis-je supprimer mes données ?',
    answer:
      'Vous pouvez supprimer vos projets à tout moment depuis votre tableau de bord. Si vous souhaitez supprimer complètement votre compte et toutes vos données, vous pouvez le faire depuis les paramètres de votre compte.',
  },
  {
    question: 'VizHome est-il conforme au RGPD ?',
    answer:
      "Oui, VizHome est entièrement conforme au Règlement Général sur la Protection des Données (RGPD) de l'Union Européenne. Vous pouvez consulter notre politique de confidentialité pour plus de détails.",
  },
]

const supportFAQs = [
  {
    question: 'Comment puis-je contacter le support ?',
    answer:
      "Vous pouvez contacter notre équipe de support via le formulaire de contact sur notre site, par email à support@vizhome.fr, ou par chat en direct disponible dans l'application pour les utilisateurs Pro et Entreprise.",
  },
  {
    question: 'Quels sont les horaires du support ?',
    answer:
      "Notre support par email et formulaire est disponible 24/7. Le chat en direct est disponible du lundi au vendredi de 9h à 18h (CET). Les utilisateurs Entreprise bénéficient d'un support téléphonique dédié.",
  },
  {
    question: 'Proposez-vous des formations ?',
    answer:
      "Oui, nous organisons régulièrement des webinaires gratuits d'introduction. Les forfaits Pro et Entreprise incluent également l'accès à notre bibliothèque de tutoriels vidéo.",
  },
  {
    question: "Y a-t-il une communauté d'utilisateurs ?",
    answer:
      'Oui, nous avons un forum communautaire actif où les utilisateurs peuvent échanger des conseils et astuces. Nous sommes également présents sur Discord.',
  },
  {
    question: 'Comment suggérer de nouvelles fonctionnalités ?',
    answer:
      'Vous pouvez soumettre vos idées via notre portail de suggestions de fonctionnalités accessible depuis votre compte, ou directement à notre équipe produit via feedback@vizhome.fr.',
  },
]

const allFAQs = computed(() => [
  ...generalFAQs,
  ...technicalFAQs,
  ...pricingFAQs,
  ...securityFAQs,
  ...supportFAQs,
])

const filteredFAQs = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return allFAQs.value.filter(
    faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
  )
})
</script>
