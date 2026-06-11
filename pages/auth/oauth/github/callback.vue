<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
    <div class="w-full max-w-md text-center space-y-4">
      <AppLogo class="mx-auto" />

      <div v-if="state === 'loading'" class="flex flex-col items-center gap-3">
        <div
          class="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"
        />
        <p class="text-sm text-muted-foreground">
          Connexion GitHub en cours…
        </p>
      </div>

      <div v-else-if="state === 'error'" class="space-y-3">
        <p class="text-sm text-destructive">{{ errorMessage }}</p>
        <Button as-child variant="outline">
          <NuxtLink to="/auth/login">Retour à la connexion</NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'none', middleware: 'guest' })

const route = useRoute()
const auth = useAuth()
const { fetchMe } = useUser()

const state = ref<'loading' | 'error'>('loading')
const errorMessage = ref('')

onMounted(async () => {
  const code = route.query.code as string | undefined
  const returnedState = route.query.state as string | undefined
  const expectedState = sessionStorage.getItem('github_oauth_state')
  const redirect = sessionStorage.getItem('github_oauth_redirect') || '/render'
  sessionStorage.removeItem('github_oauth_state')
  sessionStorage.removeItem('github_oauth_redirect')

  if (!code) {
    state.value = 'error'
    errorMessage.value = 'Code OAuth manquant — autorisation refusée.'
    return
  }
  if (!returnedState || returnedState !== expectedState) {
    state.value = 'error'
    errorMessage.value = 'État OAuth invalide. Tentative de CSRF ?'
    return
  }

  try {
    const redirectUri = `${window.location.origin}/auth/oauth/github/callback`
    const user = await auth.loginGithub(code, redirectUri)
    await fetchMe()
    toast.success(`Bienvenue ${user.first_name || user.email} !`)
    await navigateTo(redirect)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    state.value = 'error'
    errorMessage.value = err?.data?.detail || 'Connexion GitHub échouée.'
  }
})

useSeo({
  title: 'Connexion GitHub',
  description:
    'Finalisation de la connexion via GitHub.',
})
</script>
