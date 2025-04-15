<template>
  <div class="py-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Conditions de Remboursement & Annulation</h1>

      <div class="prose prose-sm dark:prose-invert max-w-none">
        <div class="text-center mb-8">
          <p class="text-lg">VizHome - Conditions de Remboursement & Annulation</p>
          <p class="text-muted-foreground">Date d'effet : 19/11/2024</p>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Cette politique définit les conditions de remboursement et d'annulation des services proposés par VizHome.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Annulation d'un Abonnement</h2>

        <Card class="mb-6">
          <CardContent class="pt-6 space-y-4">
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <UserMinusIcon class="h-5 w-5 text-primary" />
              </div>
              <p>Les abonnements peuvent être annulés à tout moment depuis votre compte utilisateur.</p>
            </div>
            <Separator />
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <CalendarIcon class="h-5 w-5 text-primary" />
              </div>
              <p>Toute annulation prendra effet à la fin de la période de facturation en cours.</p>
            </div>
            <Separator />
            <div class="flex items-start gap-3">
              <div class="min-w-[24px]">
                <BanknoteIcon class="h-5 w-5 text-primary" />
              </div>
              <p>Aucun remboursement n'est effectué pour les périodes d'abonnement déjà payées.</p>
            </div>
          </CardContent>
        </Card>

        <h2 class="text-xl font-bold mt-8 mb-4">Remboursements</h2>

        <div class="space-y-4 mb-6">
          <Alert>
            <AlertTitle>Politique de remboursement</AlertTitle>
            <AlertDescription>
              Aucun remboursement n'est accordé sauf en cas d'erreur de facturation ou de dysfonctionnement avéré du
              service.
            </AlertDescription>
          </Alert>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-base flex items-center gap-2">
                  <ClockIcon class="h-5 w-5 text-primary" />
                  Délai de demande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm">
                  Les demandes de remboursement doivent être soumises sous 14 jours après la transaction concernée.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-base flex items-center gap-2">
                  <CreditCardIcon class="h-5 w-5 text-primary" />
                  Processus de remboursement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm">
                  Si un remboursement est approuvé, le montant sera crédité sur le moyen de paiement initial sous 10
                  jours ouvrables.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Exceptions</h2>

        <div class="space-y-3 mb-6">
          <div class="bg-muted/40 rounded-lg p-4 flex items-start gap-3">
            <div class="min-w-[24px]">
              <PercentIcon class="h-5 w-5 text-muted-foreground" />
            </div>
            <p>Les promotions et réductions ne sont pas remboursables.</p>
          </div>

          <div class="bg-muted/40 rounded-lg p-4 flex items-start gap-3">
            <div class="min-w-[24px]">
              <AlertTriangleIcon class="h-5 w-5 text-amber-500" />
            </div>
            <p>En cas de violation des conditions d'utilisation, aucun remboursement ne sera accordé.</p>
          </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Modification de la Politique</h2>
        <p>
          VizHome se réserve le droit de modifier cette politique à tout moment. Toute modification sera notifiée aux
          utilisateurs concernés.
        </p>

        <h2 class="text-xl font-bold mt-8 mb-4">Contact</h2>

        <Card class="bg-card border shadow-sm mb-6">
          <CardHeader>
            <CardTitle class="flex items-center justify-center gap-2">
              <MailQuestionIcon class="h-5 w-5 text-primary" />
              Besoin d'aide ?
            </CardTitle>
          </CardHeader>
          <CardContent class="text-center">
            <p class="mb-4">
              Pour toute question ou demande de remboursement, contactez-nous à :
            </p>
            <Button variant="outline" as-child>
              <a href="mailto:billing@vizhome.com">billing@vizhome.com</a>
            </Button>
          </CardContent>
        </Card>

        <div class="bg-muted/30 rounded-lg p-6 mt-8">
          <div class="flex items-start gap-3">
            <div class="min-w-[24px]">
              <InfoIcon class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="font-medium mb-2">Informations complémentaires</h3>
              <p class="text-sm text-muted-foreground">
                Si vous souhaitez annuler votre abonnement, connectez-vous à votre compte, accédez à la section
                "Abonnement"
                dans les paramètres et cliquez sur "Annuler l'abonnement". Vous pourrez continuer à utiliser les
                services
                jusqu'à la fin de votre période de facturation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-4">
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/terms-of-use">
            Conditions Générales
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/legal/specific-service-terms">
            Conditions Spécifiques
          </NuxtLink>
        </Button>
        <Button variant="outline" as-child>
          <NuxtLink to="/pricing">
            Nos Tarifs
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserMinusIcon, CalendarIcon, BanknoteIcon, ClockIcon, CreditCardIcon,
  PercentIcon, AlertTriangleIcon, MailQuestionIcon, InfoIcon
} from 'lucide-vue-next'
</script>

<style scoped></style>