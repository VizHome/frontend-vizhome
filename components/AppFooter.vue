<template>
  <footer class="border-t bg-background mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1 flex flex-col gap-4">
          <NuxtLink to="/">
            <AppLogo />
          </NuxtLink>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Solution d'intégration 3D architecturale par IA pour des rendus
            photoréalistes.
          </p>
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              aria-label="LinkedIn"
            >
              <LinkedinIcon class="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              aria-label="Twitter"
            >
              <TwitterIcon class="h-4 w-4" />
            </Button>
            <a
              href="https://github.com/vizhome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8"
                aria-label="GitHub"
              >
                <GithubIcon class="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <!-- Produit -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-semibold">Produit</p>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink
                to="/features"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Fonctionnalités</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/pricing"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Tarifs</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >FAQ</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/render"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Éditeur 3D
                <ArrowUpRightIcon class="h-3 w-3" />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Ressources -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-semibold">Ressources</p>
          <ul class="flex flex-col gap-2">
            <li>
              <a
                :href="docsUrl"
                target="_blank"
                rel="noopener"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Documentation
                <ArrowUpRightIcon class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                :href="`${docsUrl}/api`"
                target="_blank"
                rel="noopener"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                API
                <ArrowUpRightIcon class="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                :href="`${docsUrl}/getting-started/architecture`"
                target="_blank"
                rel="noopener"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Architecture
                <ArrowUpRightIcon class="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Entreprise -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-semibold">Entreprise</p>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink
                to="/about"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >À propos</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Contact</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/testimonials"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Témoignages</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Légal -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-semibold">Légal</p>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink
                to="/legal/terms-of-use"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >CGU</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/legal/privacy-policy"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Confidentialité</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/legal/cookie-policy"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Cookies</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/legal/refund-cancellation-policy"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Remboursements</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/legal/responsible-use-policy"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >Usage responsable</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
      >
        <p>
          © 2024–{{ new Date().getFullYear() }} VizHome. Tous droits réservés.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/legal/terms-of-use"
            class="hover:text-foreground transition-colors"
            >Conditions</NuxtLink
          >
          <NuxtLink
            to="/legal/privacy-policy"
            class="hover:text-foreground transition-colors"
            >Confidentialité</NuxtLink
          >
          <NuxtLink
            to="/legal/cookie-policy"
            class="hover:text-foreground transition-colors"
            >Cookies</NuxtLink
          >
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
  ArrowUpRightIcon,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const config = useRuntimeConfig()
const docsUrl = (config.public.docsUrl as string) || 'http://localhost:3001'
</script>
