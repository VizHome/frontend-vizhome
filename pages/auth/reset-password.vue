<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="relative grid w-full place-content-center overflow-hidden">
        <p
          class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Nouveau mot de passe
        </p>
        <InteractiveGridPattern
          class="[mask-image:radial-gradient(550px_circle_at_center,white,transparent)] inset-0 h-[300%] skew-y-12"
        />
      </div>
    </div>

    <div
      class="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block">
            <AppLogo />
          </NuxtLink>
          <h2 class="text-2xl font-bold mt-6 mb-2">Réinitialisation</h2>
          <p class="text-muted-foreground">
            Choisissez un nouveau mot de passe pour votre compte.
          </p>
        </div>

        <Card v-if="!success" class="shadow-xl">
          <CardContent class="pt-6">
            <div
              v-if="error"
              class="mb-4 rounded-md bg-destructive/10 border border-destructive/30 px-4 py-2 text-sm text-destructive"
            >
              {{ error }}
            </div>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <div class="space-y-2">
                <Label for="password">Nouveau mot de passe</Label>
                <div class="relative">
                  <LockIcon
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="pl-10"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2"
                    @click="showPassword = !showPassword"
                  >
                    <EyeIcon
                      v-if="!showPassword"
                      class="h-4 w-4 text-muted-foreground hover:text-foreground"
                    />
                    <EyeOffIcon
                      v-else
                      class="h-4 w-4 text-muted-foreground hover:text-foreground"
                    />
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="passwordConfirm">Confirmer</Label>
                <div class="relative">
                  <LockIcon
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                class="w-full h-11"
                :disabled="loading || !canSubmit"
              >
                {{ loading ? 'Mise à jour…' : 'Définir le nouveau mot de passe' }}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div v-else class="text-center space-y-4">
          <p class="text-sm">
            ✓ Votre mot de passe a été mis à jour. Vous pouvez maintenant vous
            connecter.
          </p>
          <Button as-child class="w-full h-11">
            <NuxtLink to="/auth/login">Aller à la connexion</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'none', middleware: 'guest' })

const route = useRoute()
const auth = useAuth()

const uid = computed(() => (route.query.uid as string) || '')
const token = computed(() => (route.query.token as string) || '')

const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')

const canSubmit = computed(
  () =>
    password.value.length >= 8 &&
    password.value === passwordConfirm.value &&
    uid.value &&
    token.value
)

async function handleSubmit() {
  if (!canSubmit.value || loading.value) return
  error.value = ''
  loading.value = true
  try {
    await auth.resetPassword(
      uid.value,
      token.value,
      password.value,
      passwordConfirm.value
    )
    success.value = true
  } catch (e: unknown) {
    const err = e as { data?: Record<string, unknown> }
    const data = err?.data || {}
    if (data.token) error.value = 'Lien expiré ou déjà utilisé.'
    else if (data.uid) error.value = 'Lien invalide.'
    else if (data.password)
      error.value = Array.isArray(data.password)
        ? (data.password as string[]).join(' ')
        : String(data.password)
    else error.value = 'Impossible de réinitialiser le mot de passe.'
  } finally {
    loading.value = false
  }
}

useSeo({
  title: 'Reinitialiser le mot de passe',
  description:
    'Definissez un nouveau mot de passe pour votre compte VizHome.',
})
</script>
