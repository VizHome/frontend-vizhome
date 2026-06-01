<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Section visuelle à gauche (visible uniquement sur desktop) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="relative grid w-full place-content-center overflow-hidden">
        <p
          class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Rejoins nous sur VizHome
        </p>

        <InteractiveGridPattern
          class="[mask-image:radial-gradient(550px_circle_at_center,white,transparent)] inset-0 h-[300%] skew-y-12"
        />
      </div>
    </div>

    <!-- Formulaire d'inscription à droite -->
    <div
      class="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block">
            <AppLogo />
          </NuxtLink>
          <h2 class="text-2xl font-bold mt-6 mb-2">Créer un compte</h2>
          <p class="text-muted-foreground">
            Commencez votre expérience de conception 3D
          </p>
        </div>

        <Card class="shadow-xl">
          <CardContent class="pt-6">
            <div
              v-if="submitError"
              class="mb-4 rounded-md bg-destructive/10 border border-destructive/30 px-4 py-2 text-sm text-destructive"
            >
              {{ submitError }}
            </div>
            <form class="space-y-5" @submit.prevent="handleSubmit">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="firstName" class="text-sm font-medium"
                    >Prénom</Label
                  >
                  <Input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    placeholder="Jean"
                    :class="{ 'ring-1 ring-destructive': formErrors.firstName }"
                  />
                  <p
                    v-if="formErrors.firstName"
                    class="text-xs text-destructive mt-1"
                  >
                    {{ formErrors.firstName }}
                  </p>
                </div>

                <div class="space-y-2">
                  <Label for="lastName" class="text-sm font-medium">Nom</Label>
                  <Input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    placeholder="Dupont"
                    :class="{ 'ring-1 ring-destructive': formErrors.lastName }"
                  />
                  <p
                    v-if="formErrors.lastName"
                    class="text-xs text-destructive mt-1"
                  >
                    {{ formErrors.lastName }}
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="pseudo" class="text-sm font-medium">
                  Pseudo
                  <span class="text-muted-foreground font-normal">
                    (public, immuable)
                  </span>
                </Label>
                <div class="relative">
                  <AtSignIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                    id="pseudo"
                    v-model="pseudo"
                    type="text"
                    autocomplete="username"
                    placeholder="jean_dupont"
                    class="pl-10"
                    :class="{ 'ring-1 ring-destructive': formErrors.pseudo }"
                    @input="onPseudoInput"
                  />
                </div>
                <p
                  v-if="formErrors.pseudo"
                  class="text-xs text-destructive mt-1"
                >
                  {{ formErrors.pseudo }}
                </p>
                <p v-else class="text-xs text-muted-foreground mt-1">
                  3 à 30 caractères, lettres/chiffres/-/_, commence par une lettre.
                  C'est ton identité publique (forum, support).
                </p>
              </div>

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
                <Label for="password" class="text-sm font-medium"
                  >Mot de passe</Label
                >
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
                    :class="{ 'ring-1 ring-destructive': formErrors.password }"
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

                <div class="mt-1">
                  <PasswordStrength :password="password" />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="confirmPassword" class="text-sm font-medium"
                  >Confirmer le mot de passe</Label
                >
                <div class="relative">
                  <LockIcon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="pl-10"
                    :class="{
                      'ring-1 ring-destructive': formErrors.confirmPassword,
                    }"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <EyeIcon
                      v-if="!showConfirmPassword"
                      class="h-4 w-4 text-muted-foreground hover:text-foreground"
                    />
                    <EyeOffIcon
                      v-else
                      class="h-4 w-4 text-muted-foreground hover:text-foreground"
                    />
                  </button>
                </div>
                <p
                  v-if="formErrors.confirmPassword"
                  class="text-xs text-destructive mt-1"
                >
                  {{ formErrors.confirmPassword }}
                </p>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  v-model="acceptTerms"
                  :class="{ 'ring-1 ring-destructive': formErrors.terms }"
                />
                <label for="terms" class="text-sm leading-tight cursor-pointer">
                  J'accepte les
                  <Button
                    variant="link"
                    class="p-0 h-auto text-primary"
                    as-child
                  >
                    <NuxtLink :to="{ path: '/legal/terms-of-use' }"
                      >Conditions d'utilisation</NuxtLink
                    >
                  </Button>
                  et la
                  <Button
                    variant="link"
                    class="p-0 h-auto text-primary"
                    as-child
                  >
                    <NuxtLink :to="{ path: '/legal/privacy-policy' }"
                      >Politique de confidentialité</NuxtLink
                    >
                  </Button>
                </label>
              </div>
              <p v-if="formErrors.terms" class="text-xs text-destructive mt-1">
                {{ formErrors.terms }}
              </p>

              <Button
                type="submit"
                class="w-full h-11"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Création du compte…' : "S'inscrire" }}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div class="text-center text-sm mt-6">
          <span class="text-muted-foreground">Vous avez déjà un compte?</span>
          <NuxtLink
            to="/auth/login"
            class="text-primary hover:underline ml-1 font-medium"
          >
            Se connecter
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  AtSignIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-vue-next'
import { ref, reactive, computed } from 'vue'
import { toast } from 'vue-sonner'

const auth = useAuth()
const { fetchMe } = useUser()

// État du formulaire
const firstName = ref('')
const lastName = ref('')
const pseudo = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)

// Sanitize input pseudo : minuscule + retire les chars non autorisés à la volée
function onPseudoInput() {
  pseudo.value = pseudo.value.replace(/[^a-zA-Z0-9_-]/g, '')
}
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')

// Gestion des erreurs
const formErrors = reactive({
  firstName: '',
  lastName: '',
  pseudo: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: '',
})

// Regex unique (cohérente avec le validator backend)
const PSEUDO_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/

// Validation
const validateForm = () => {
  let isValid = true

  // Réinitialiser les erreurs
  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = ''
  })

  // Prénom
  if (!firstName.value.trim()) {
    formErrors.firstName = 'Le prénom est requis'
    isValid = false
  }

  // Nom
  if (!lastName.value.trim()) {
    formErrors.lastName = 'Le nom est requis'
    isValid = false
  }

  // Pseudo
  if (!pseudo.value.trim()) {
    formErrors.pseudo = 'Le pseudo est requis'
    isValid = false
  } else if (!PSEUDO_REGEX.test(pseudo.value.trim())) {
    formErrors.pseudo =
      '3-30 caractères : commence par une lettre, puis lettres/chiffres/-/_'
    isValid = false
  }

  // Email
  if (!email.value) {
    formErrors.email = "L'email est requis"
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    formErrors.email = "Format d'email invalide"
    isValid = false
  }

  // Mot de passe
  if (!password.value) {
    formErrors.password = 'Le mot de passe est requis'
    isValid = false
  } else if (password.value.length < 8) {
    formErrors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    isValid = false
  }

  // Confirmation du mot de passe
  if (password.value !== confirmPassword.value) {
    formErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    isValid = false
  }

  // Conditions d'utilisation
  if (!acceptTerms.value) {
    formErrors.terms = "Vous devez accepter les conditions d'utilisation"
    isValid = false
  }

  return isValid
}

// Fonction de soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm() || isSubmitting.value) return
  submitError.value = ''
  isSubmitting.value = true
  try {
    const user = await auth.register({
      email: email.value.trim().toLowerCase(),
      pseudo: pseudo.value.trim(),
      password: password.value,
      password_confirm: confirmPassword.value,
      first_name: firstName.value.trim(),
      last_name: lastName.value.trim(),
    })
    await fetchMe()
    toast.success(`Compte créé. Bienvenue ${user.pseudo || user.email} !`)
    await navigateTo('/render')
  } catch (e: unknown) {
    const err = e as { data?: Record<string, unknown>; statusCode?: number }
    if (err?.statusCode === 429) {
      submitError.value = "Trop d'inscriptions depuis cette IP. Réessayez plus tard."
    } else if (err?.data) {
      // Mappe les erreurs DRF par champ
      const data = err.data
      Object.entries(data).forEach(([field, messages]) => {
        const msg = Array.isArray(messages) ? messages.join(' ') : String(messages)
        if (field === 'email') formErrors.email = msg
        else if (field === 'pseudo') formErrors.pseudo = msg
        else if (field === 'password') formErrors.password = msg
        else if (field === 'password_confirm') formErrors.confirmPassword = msg
        else if (field === 'first_name') formErrors.firstName = msg
        else if (field === 'last_name') formErrors.lastName = msg
        else submitError.value = msg
      })
    } else {
      submitError.value = "Erreur lors de l'inscription."
    }
  } finally {
    isSubmitting.value = false
  }
}

definePageMeta({
  layout: 'none',
  middleware: 'guest',
})

// Composant pour indiquer la force du mot de passe
const PasswordStrength = defineComponent({
  props: {
    password: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const strengthPercent = computed(() => {
      if (!props.password) return 0

      let strength = 0
      const password = props.password

      // Longueur minimale
      if (password.length >= 8) strength += 25

      // Contient des chiffres
      if (/\d/.test(password)) strength += 25

      // Contient des minuscules et des majuscules
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25

      // Contient des caractères spéciaux
      if (/[^a-zA-Z0-9]/.test(password)) strength += 25

      return strength
    })

    const strengthClass = computed(() => {
      const strength = strengthPercent.value
      if (strength < 25) return 'bg-destructive'
      if (strength < 50) return 'bg-orange-500'
      if (strength < 75) return 'bg-yellow-500'
      return 'bg-green-500'
    })

    const strengthText = computed(() => {
      const strength = strengthPercent.value
      if (strength === 0) return ''
      if (strength < 25) return 'Très faible'
      if (strength < 50) return 'Faible'
      if (strength < 75) return 'Moyen'
      if (strength < 100) return 'Fort'
      return 'Très fort'
    })

    return {
      strengthPercent,
      strengthClass,
      strengthText,
    }
  },
  template: `
        <div v-if="password" class="mt-1">
          <div class="h-1 w-full bg-muted/50 rounded-full">
            <div 
              class="h-1 rounded-full transition-all duration-300" 
              :class="strengthClass"
              :style="{ width: strengthPercent + '%' }"
            ></div>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-muted-foreground">Sécurité</span>
            <span class="text-xs font-medium" :class="strengthClass">{{ strengthText }}</span>
          </div>
        </div>
      `,
})
</script>

<style scoped>
:root {
  --animate-aurora: aurora 60s linear infinite;
}

@keyframes aurora {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }
  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}
</style>
