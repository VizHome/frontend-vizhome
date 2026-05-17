<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Section visuelle à gauche (visible uniquement sur desktop) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="relative grid w-full place-content-center overflow-hidden">
        <p
          class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Bienvenue sur VizHome
        </p>

        <InteractiveGridPattern
          class="[mask-image:radial-gradient(550px_circle_at_center,white,transparent)] inset-0 h-[300%] skew-y-12"
        />
      </div>
    </div>

    <!-- Formulaire de connexion à droite -->
    <div
      class="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block">
            <AppLogo />
          </NuxtLink>
          <h2 class="text-2xl font-bold mt-6 mb-2">Connexion</h2>
          <p class="text-muted-foreground">Accédez à votre espace personnel</p>
        </div>

        <div class="space-y-6">
          <!-- Boutons de connexion sociale -->
          <div class="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" class="gap-2 h-11">
              <span>Google</span>
            </Button>
            <Button variant="outline" type="button" class="gap-2 h-11">
              <span>GitHub</span>
            </Button>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Ou avec votre email
              </span>
            </div>
          </div>

          <Card class="shadow-xl">
            <CardContent class="pt-6">
              <!-- Erreur globale -->
              <div
                v-if="submitError"
                class="mb-4 rounded-md bg-destructive/10 border border-destructive/30 px-4 py-2 text-sm text-destructive"
              >
                {{ submitError }}
              </div>

              <!-- Step 2 : challenge 2FA -->
              <form
                v-if="twoFactorChallenge"
                class="space-y-4"
                @submit.prevent="handle2faSubmit"
              >
                <div class="space-y-2">
                  <Label for="2fa-code" class="text-sm font-medium"
                    >Code de vérification 2FA</Label
                  >
                  <Input
                    id="2fa-code"
                    v-model="twoFactorCode"
                    type="text"
                    inputmode="numeric"
                    pattern="[0-9]{6}"
                    maxlength="6"
                    placeholder="123456"
                    autocomplete="one-time-code"
                  />
                  <p class="text-xs text-muted-foreground">
                    Saisis le code à 6 chiffres de ton application TOTP.
                  </p>
                </div>
                <Button
                  type="submit"
                  class="w-full h-11"
                  :disabled="isSubmitting || twoFactorCode.length !== 6"
                >
                  {{ isSubmitting ? 'Vérification…' : 'Valider le code' }}
                </Button>
              </form>

              <form
                v-else
                class="space-y-5"
                @submit.prevent="handleSubmit"
              >
                <div class="space-y-2">
                  <Label for="email" class="text-sm font-medium">Email</Label>
                  <div class="relative">
                    <MailIcon
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    />
                    <Input
                      id="email"
                      v-model="email"
                      type="email"
                      placeholder="votreemail@exemple.fr"
                      class="pl-10"
                      :class="{ 'ring-1 ring-destructive': formErrors.email }"
                    />
                  </div>
                  <p
                    v-if="formErrors.email"
                    class="text-xs text-destructive mt-1"
                  >
                    {{ formErrors.email }}
                  </p>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <Label for="password" class="text-sm font-medium"
                      >Mot de passe</Label
                    >
                    <Button variant="link" class="p-0 h-auto text-xs" as-child>
                      <NuxtLink :to="{ path: '/auth/forgot-password' }">
                        Mot de passe oublié?
                      </NuxtLink>
                    </Button>
                  </div>
                  <div class="relative">
                    <LockIcon
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    />
                    <Input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pl-10"
                      :class="{
                        'ring-1 ring-destructive': formErrors.password,
                      }"
                    />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2"
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
                  <p
                    v-if="formErrors.password"
                    class="text-xs text-destructive mt-1"
                  >
                    {{ formErrors.password }}
                  </p>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="remember" v-model:checked="rememberMe" />
                  <label
                    for="remember"
                    class="text-sm font-medium leading-none cursor-pointer"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <Button
                  type="submit"
                  class="w-full h-11"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Connexion…' : 'Se connecter' }}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div class="text-center text-sm">
            <span class="text-muted-foreground"
              >Vous n'avez pas de compte?</span
            >
            <NuxtLink
              to="/auth/register"
              class="text-primary hover:underline ml-1 font-medium"
            >
              Créer un compte
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  GithubIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-vue-next'
import { ref, reactive } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'none',
  middleware: 'guest',
})

const route = useRoute()
const auth = useAuth()
const { fetchMe } = useUser()

// État du formulaire
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')

// Gestion des erreurs
const formErrors = reactive({
  email: '',
  password: '',
})

// État 2FA (après step 1 du login)
const twoFactorChallenge = ref<string | null>(null)
const twoFactorCode = ref('')

const validateForm = () => {
  let isValid = true
  formErrors.email = ''
  formErrors.password = ''

  if (!email.value) {
    formErrors.email = "L'email est requis"
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    formErrors.email = "Format d'email invalide"
    isValid = false
  }

  if (!password.value) {
    formErrors.password = 'Le mot de passe est requis'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || isSubmitting.value) return
  submitError.value = ''
  isSubmitting.value = true
  try {
    const result = await auth.login(email.value, password.value)
    if (result.require2fa) {
      twoFactorChallenge.value = result.challengeToken
      return // affiche le champ 2FA
    }
    await fetchMe()
    toast.success(`Bienvenue ${result.user.first_name || result.user.email} !`)
    const redirect = (route.query.redirect as string) || '/render'
    await navigateTo(redirect)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string }; statusCode?: number }
    if (err?.statusCode === 429) {
      submitError.value = err.data?.detail || 'Trop de tentatives. Réessayez plus tard.'
    } else {
      submitError.value = err.data?.detail || 'Email ou mot de passe incorrect.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const handle2faSubmit = async () => {
  if (!twoFactorChallenge.value || twoFactorCode.value.length !== 6) return
  isSubmitting.value = true
  submitError.value = ''
  try {
    const user = await auth.verify2fa(twoFactorChallenge.value, twoFactorCode.value)
    await fetchMe()
    toast.success(`Bienvenue ${user.first_name || user.email} !`)
    const redirect = (route.query.redirect as string) || '/render'
    await navigateTo(redirect)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    submitError.value = err?.data?.detail || 'Code 2FA invalide.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
