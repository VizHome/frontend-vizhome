<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col gap-6">
    <!-- Header simple (breadcrumb "Nouveau ticket" fourni par layout) -->
    <div>
      <h1 class="text-xl font-semibold tracking-tight">Ouvrir un ticket</h1>
      <p class="text-sm text-muted-foreground">
        Décris ton problème en détail — plus c'est précis, plus on peut t'aider vite.
      </p>
    </div>

    <Card>
      <CardContent class="pt-6">
        <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-1.5">
            <Label for="subject">Sujet</Label>
            <Input
              id="subject"
              v-model="subject"
              type="text"
              placeholder="Ex : Mon rendu IA reste bloqué en pending"
              maxlength="200"
              :class="{ 'ring-1 ring-destructive': errors.subject }"
            />
            <p v-if="errors.subject" class="text-xs text-destructive">{{ errors.subject }}</p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="flex flex-col gap-1.5">
              <Label for="category">Catégorie</Label>
              <Select v-model="category">
                <SelectTrigger id="category" class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="(label, key) in CATEGORY_LABELS"
                    :key="key"
                    :value="key"
                  >
                    {{ label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col gap-1.5">
              <Label for="priority">Priorité</Label>
              <Select v-model="priority">
                <SelectTrigger id="priority" class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="(label, key) in PRIORITY_LABELS"
                    :key="key"
                    :value="key"
                  >
                    {{ label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="body">Description détaillée</Label>
            <Textarea
              id="body"
              v-model="body"
              rows="8"
              placeholder="Décris le contexte, ce que tu as essayé, le message d'erreur si applicable…"
              maxlength="10000"
              :class="{ 'ring-1 ring-destructive': errors.body }"
            />
            <p class="text-xs text-muted-foreground text-right tabular-nums">
              {{ body.length }} / 10 000
            </p>
            <p v-if="errors.body" class="text-xs text-destructive">{{ errors.body }}</p>
          </div>

          <Alert v-if="submitError" variant="destructive">
            <CircleAlertIcon class="size-4" />
            <AlertDescription>{{ submitError }}</AlertDescription>
          </Alert>

          <div class="flex items-center justify-end gap-2">
            <Button as-child variant="ghost" type="button">
              <NuxtLink to="/support">Annuler</NuxtLink>
            </Button>
            <Button
              type="submit"
              class="rounded-full gap-1.5"
              :disabled="isSubmitting"
            >
              <SendIcon class="size-3.5" />
              {{ isSubmitting ? 'Envoi…' : 'Ouvrir le ticket' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { CircleAlertIcon, SendIcon } from 'lucide-vue-next'
import { reactive, ref } from 'vue'
import { toast } from 'vue-sonner'

import type { TicketCategory, TicketPriority } from '~/composables/useSupport'

definePageMeta({
  layout: 'support',
  middleware: 'auth',
  ssr: false,
})

useHead({ title: 'Nouveau ticket — VizHome Support' })

const router = useRouter()
const { createTicket, CATEGORY_LABELS, PRIORITY_LABELS } = useSupport()

const subject = ref('')
const body = ref('')
const category = ref<TicketCategory>('other')
const priority = ref<TicketPriority>('medium')
const errors = reactive<{ subject: string; body: string }>({ subject: '', body: '' })
const submitError = ref<string | null>(null)
const isSubmitting = ref(false)

function validate(): boolean {
  errors.subject = ''
  errors.body = ''
  let ok = true
  if (subject.value.trim().length < 5) {
    errors.subject = 'Au moins 5 caractères.'
    ok = false
  }
  if (body.value.trim().length < 20) {
    errors.body = 'Décris ton problème en au moins 20 caractères.'
    ok = false
  }
  return ok
}

async function onSubmit() {
  if (!validate() || isSubmitting.value) return
  submitError.value = null
  isSubmitting.value = true
  try {
    const ticket = await createTicket({
      subject: subject.value.trim(),
      category: category.value,
      priority: priority.value,
      body: body.value.trim(),
    })
    toast.success('Ticket créé. On revient vers toi vite.')
    await router.push(`/support/${ticket.id}`)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; body?: string[]; subject?: string[] } }
    submitError.value =
      err.data?.detail ||
      err.data?.subject?.[0] ||
      err.data?.body?.[0] ||
      'Création du ticket échouée.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
