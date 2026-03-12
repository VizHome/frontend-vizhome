<template>
  <footer class="border-t">
    <div class="container mx-auto py-12 px-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div class="md:col-span-1">
          <NuxtLink to="/" class="inline-block mb-4">
            <span class="font-bold text-2xl"
              >Viz<span class="text-primary">Home</span></span
            >
          </NuxtLink>
          <p class="text-muted-foreground max-w-md mb-4">
            Solution d'intégration 3D architecturale par IA pour des rendus
            photoréalistes.
          </p>
          <div class="flex items-center gap-3 mt-4">
            <Button variant="outline" size="icon" aria-label="LinkedIn">
              <LinkedinIcon class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Twitter">
              <TwitterIcon class="h-4 w-4" />
            </Button>
            <a
              href="https://github.com/vizhome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" aria-label="GitHub">
                <GithubIcon class="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-medium text-base mb-3">Produit</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/features"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Fonctionnalités
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/pricing"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tarifs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-medium text-base mb-3">Entreprise</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/about"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                À propos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/testimonials"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Témoignages
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-medium text-base mb-3">Ressources</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/docs"
                class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Documentation
                <ArrowUpRight class="size-3" />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/docs/api"
                class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                API
                <ArrowUpRight class="size-3" />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-medium text-base mb-3">Légal</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/legal/terms-of-use"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Conditions d'utilisation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/legal/privacy-policy"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de confidentialité
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/legal/cookie-policy"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de cookies
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/legal/refund-cancellation-policy"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Remboursement et annulation
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
      >
        <p>
          © 2024-{{ new Date().getFullYear() }} VizHome - Tous droits réservés.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/legal/terms-of-use"
            class="hover:text-foreground transition-colors"
          >
            Conditions
          </NuxtLink>
          <NuxtLink
            to="/legal/privacy-policy"
            class="hover:text-foreground transition-colors"
          >
            Confidentialité
          </NuxtLink>
          <NuxtLink
            to="/legal/cookie-policy"
            class="hover:text-foreground transition-colors"
          >
            Cookies
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  ArrowUpRight,
} from 'lucide-vue-next'
</script>
