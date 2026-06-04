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
            <Button
              variant="outline"
              type="button"
              class="gap-2 h-11"
              :disabled="!googleClientId || isOAuthLoading"
              :title="!googleClientId ? 'Google OAuth non configuré' : 'Continuer avec Google'"
              @click="handleGoogleLogin"
            >
              <!-- Logo Google officiel (multi-couleur, non disponible dans Lucide pour raisons de marque) -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                class="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              class="gap-2 h-11"
              :disabled="!githubClientId || isOAuthLoading"
              :title="!githubClientId ? 'GitHub OAuth non configuré' : 'Continuer avec GitHub'"
              @click="handleGithubLogin"
            >
              <GithubIcon class="h-5 w-5 shrink-0" />
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
                  <Checkbox id="remember" v-model="rememberMe" />
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
import { computed, onMounted, reactive, ref } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'none',
  middleware: 'guest',
})

const route = useRoute()
const auth = useAuth()
const { fetchMe } = useUser()
const config = useRuntimeConfig()

const googleClientId = computed(
  () => (config.public.googleClientId as string) || ''
)
const githubClientId = computed(
  () => (config.public.githubClientId as string) || ''
)
const isOAuthLoading = ref(false)

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

// ─── OAuth : Google Sign-In (flow id_token) ──────────────────────────────
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (resp: { credential: string }) => void
          }) => void
          prompt: (callback?: (notification: {
            isNotDisplayed: () => boolean
            isSkippedMoment: () => boolean
            getNotDisplayedReason: () => string
            getSkippedReason: () => string
          }) => void) => void
        }
      }
    }
  }
}

let _googleScriptLoaded = false

async function loadGoogleScript(): Promise<void> {
  if (_googleScriptLoaded) return
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      _googleScriptLoaded = true
      resolve()
    }
    script.onerror = () => reject(new Error('Échec chargement Google Sign-In'))
    document.head.appendChild(script)
  })
}

async function handleGoogleLogin() {
  if (!googleClientId.value || isOAuthLoading.value) return
  isOAuthLoading.value = true
  submitError.value = ''
  try {
    await loadGoogleScript()
    if (!window.google) throw new Error('Google SDK indisponible')

    window.google.accounts.id.initialize({
      client_id: googleClientId.value,
      callback: async (resp: { credential: string }) => {
        try {
          const user = await auth.loginGoogle(resp.credential)
          await fetchMe()
          toast.success(`Bienvenue ${user.first_name || user.email} !`)
          const redirect = (route.query.redirect as string) || '/render'
          await navigateTo(redirect)
        } catch (e: unknown) {
          const err = e as { data?: { detail?: string } }
          submitError.value = err?.data?.detail || 'Connexion Google échouée.'
        } finally {
          isOAuthLoading.value = false
        }
      },
    })
    // Notification callback : indispensable pour diagnostiquer les
    // silent-fail de prompt() (cookies tiers bloqués, cooldown, origin
    // non autorisée…). Sans ce listener, le bouton "ne fait rien" sans
    // explication visible côté UI.
    window.google.accounts.id.prompt((notification: {
      isNotDisplayed: () => boolean
      isSkippedMoment: () => boolean
      getNotDisplayedReason: () => string
      getSkippedReason: () => string
    }) => {
      if (notification.isNotDisplayed()) {
        const reason = notification.getNotDisplayedReason()
        submitError.value = explainGoogleReason(reason)
        isOAuthLoading.value = false
      } else if (notification.isSkippedMoment()) {
        const reason = notification.getSkippedReason()
        submitError.value = explainGoogleReason(reason)
        isOAuthLoading.value = false
      }
    })
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Erreur Google OAuth'
    isOAuthLoading.value = false
  }
}

/** Traduit les codes Google One Tap en messages user-friendly. */
function explainGoogleReason(reason: string): string {
  const map: Record<string, string> = {
    browser_not_supported: "Ce navigateur ne supporte pas Google Sign-In.",
    invalid_client: "Le client_id Google est invalide (vérifie .env + Google Cloud Console).",
    missing_client_id: "Le client_id Google n'est pas configuré.",
    unregistered_origin: "Cette origine n'est pas autorisée dans Google Cloud Console — ajoute "
      + window.location.origin + " dans \"Authorized JavaScript origins\".",
    opt_out_or_no_session: "Pas de session Google active dans ce navigateur, ou tu as opt-out. "
      + "Connecte-toi d'abord sur google.com puis réessaie.",
    suppressed_by_user: "Tu as refusé Google Sign-In récemment. Réessaie plus tard ou via un autre navigateur.",
    unknown_reason: "Google Sign-In n'a pas pu s'afficher (cookies tiers bloqués ?).",
    secure_http_required: "HTTPS requis (ou localhost).",
    issuing_failed: "Google a refusé d'émettre un token (config app invalide).",
    tap_outside: "Fenêtre Google fermée.",
    user_cancel: "Connexion annulée.",
    flow_restarted: "Flow Google relancé.",
  }
  return map[reason] || `Google Sign-In indisponible (${reason})`
}

// ─── OAuth : GitHub (flow authorization code) ────────────────────────────
function handleGithubLogin() {
  if (!githubClientId.value || isOAuthLoading.value) return
  const redirectUri = `${window.location.origin}/auth/oauth/github/callback`
  const state = crypto.randomUUID()
  sessionStorage.setItem('github_oauth_state', state)
  sessionStorage.setItem('github_oauth_redirect', (route.query.redirect as string) || '/render')

  const params = new URLSearchParams({
    client_id: githubClientId.value,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    state,
  })
  window.location.href = `https://github.com/login/oauth/authorize?${params}`
}
</script>
