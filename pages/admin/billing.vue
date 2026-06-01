<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
    <section>
      <h1 class="text-2xl font-bold tracking-tight">Billing</h1>
      <p class="text-sm text-muted-foreground">
        Subscriptions Stripe actives et factures récentes.
      </p>
    </section>

    <Alert v-if="stripeMode === 'no_djstripe'" variant="default">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Stripe non configuré</AlertTitle>
      <AlertDescription>
        Les listes sont vides car aucune sub ou facture n'a été synchronisée.
        Configure `STRIPE_TEST_SECRET_KEY` + run `setup_stripe_products`
        (voir <code>SETUP_KEYS.md</code>).
      </AlertDescription>
    </Alert>

    <!-- Subscriptions actives -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base">Subscriptions actives</CardTitle>
        <CardDescription>
          {{ subscriptions.length }}
          {{ subscriptions.length > 1 ? 'subscriptions actives' : 'subscription active' }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th class="px-4 py-2 text-left font-medium">User</th>
                <th class="px-4 py-2 text-left font-medium">Status</th>
                <th class="px-4 py-2 text-left font-medium">Période fin</th>
                <th class="px-4 py-2 text-left font-medium">Annule</th>
                <th class="px-4 py-2 text-left font-medium">Créée</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-if="isLoading">
                <td colspan="5" class="px-4 py-6 text-center text-muted-foreground">Chargement…</td>
              </tr>
              <tr v-else-if="subscriptions.length === 0">
                <td colspan="5" class="px-4 py-6 text-center text-muted-foreground">
                  Aucune subscription active.
                </td>
              </tr>
              <tr v-for="s in subscriptions" :key="s.id" class="hover:bg-muted/30">
                <td class="px-4 py-2 truncate max-w-[260px]">{{ s.user_email || '(sans user)' }}</td>
                <td class="px-4 py-2">
                  <Badge :class="statusClass(s.status)" variant="secondary">{{ s.status }}</Badge>
                </td>
                <td class="px-4 py-2 text-xs text-muted-foreground">
                  {{ s.current_period_end ? formatDate(s.current_period_end) : '—' }}
                </td>
                <td class="px-4 py-2">
                  <span v-if="s.cancel_at_period_end" class="text-amber-600 text-xs">Oui</span>
                  <span v-else class="text-muted-foreground text-xs">Non</span>
                </td>
                <td class="px-4 py-2 text-xs text-muted-foreground">
                  {{ s.created ? formatDate(s.created) : '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <!-- Invoices -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base">Factures récentes</CardTitle>
        <CardDescription>100 dernières factures toutes confondues.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th class="px-4 py-2 text-left font-medium">#</th>
                <th class="px-4 py-2 text-left font-medium">User</th>
                <th class="px-4 py-2 text-right font-medium">Montant</th>
                <th class="px-4 py-2 text-left font-medium">Status</th>
                <th class="px-4 py-2 text-left font-medium">Créée</th>
                <th class="px-4 py-2 text-left font-medium">Liens</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-if="isLoading">
                <td colspan="6" class="px-4 py-6 text-center text-muted-foreground">Chargement…</td>
              </tr>
              <tr v-else-if="invoices.length === 0">
                <td colspan="6" class="px-4 py-6 text-center text-muted-foreground">
                  Aucune facture.
                </td>
              </tr>
              <tr v-for="i in invoices" :key="i.id" class="hover:bg-muted/30">
                <td class="px-4 py-2 font-mono text-xs">{{ i.number || i.id.slice(0, 10) }}</td>
                <td class="px-4 py-2 truncate max-w-[200px]">{{ i.user_email || '—' }}</td>
                <td class="px-4 py-2 text-right tabular-nums">
                  {{ formatMoney(i.amount_paid, i.currency) }}
                </td>
                <td class="px-4 py-2">
                  <Badge :class="statusClass(i.status)" variant="secondary">{{ i.status }}</Badge>
                </td>
                <td class="px-4 py-2 text-xs text-muted-foreground">
                  {{ i.created ? formatDate(i.created) : '—' }}
                </td>
                <td class="px-4 py-2 text-xs flex gap-2">
                  <a
                    v-if="i.hosted_invoice_url"
                    :href="i.hosted_invoice_url"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                  >Stripe</a>
                  <a
                    v-if="i.invoice_pdf"
                    :href="i.invoice_pdf"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                  >PDF</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { CircleAlertIcon } from 'lucide-vue-next'

import { useAdminBilling } from '~/composables/useAdminBilling'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Billing — Admin VizHome' })

const { subscriptions, invoices, isLoading, stripeMode, loadAll } = useAdminBilling()

await loadAll()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function formatMoney(amount: number, currency: string): string {
  const value = (amount || 0) / 100
  try {
    return value.toLocaleString('fr-FR', {
      style: 'currency',
      currency: (currency || 'eur').toUpperCase(),
    })
  } catch {
    return `${value.toFixed(2)} ${(currency || '').toUpperCase()}`
  }
}

function statusClass(status: string): string {
  switch ((status || '').toLowerCase()) {
    case 'active':
    case 'paid':
      return 'bg-green-500/10 text-green-700 dark:text-green-400'
    case 'trialing':
      return 'bg-primary/10 text-primary'
    case 'past_due':
    case 'open':
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
    case 'canceled':
    case 'void':
      return 'bg-red-500/10 text-red-700 dark:text-red-400'
    default:
      return ''
  }
}
</script>
