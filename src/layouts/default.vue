<template>
  <div>
    <nav class="py-2 px-3 flex justify-between items-center">
      <div class="flex justify-center items-center">
        <NuxtLink to="/">
          <strong class="text-3xl">Viz.</strong>
        </NuxtLink>
      </div>
      <div class="flex justify-center items-center space-x-4">
        <NuxtLink v-for="item in items" :to="item.ref">
          <Button variant="ghost">
            {{ item.name }}
          </Button>
        </NuxtLink>
      </div>
      <div class="flex justify-center items-center space-x-2">
        <NuxtLink to="/render">
            <GradientButton :border-radius="12" :border-width="2" class="text-white font-semibold">
              View now ✨
            </GradientButton>  
        </NuxtLink>

        <NuxtLink to="/auth">
          <Button>
            <Icon name="mdi:login" class="w-5 h-5" />
            Login
          </Button>
        </NuxtLink>
      </div>
    </nav>
    <slot />
    <footer class="px-4 divide-y">
      <div class="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div class="lg:w-1/3">
          <a rel="noopener noreferrer" href="#" class="flex justify-center space-x-3 lg:justify-start">
            <span class="text-3xl font-bold">Viz.</span>
          </a>
        </div>
        <div class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div class="space-y-3">
            <h3 class="tracking-wide uppercase font-semibold">Product</h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">Models</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">Pricing</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">Contact</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">FAQ</a>
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="tracking-wide uppercase font-semibold">Company</h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">Privacy</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:font-semibold">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="uppercase font-semibold">Developers</h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#" class="flex items-center space-x-1 hover:font-semibold">
                  <Icon name="material-symbols-light:arrow-outward-rounded" class="w-4 h-4" />
                  <span>API</span>
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="flex items-center space-x-1 hover:font-semibold">
                  <Icon name="material-symbols-light:arrow-outward-rounded" class="w-4 h-4" />
                  <span>Documentation</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div class="flex justify-start space-x-3">
              <a rel="noopener noreferrer" href="https://discord.gg/nXwJPMenUC" class="flex items-center p-1 hover:animate-bounce">
                <Icon name="line-md:discord" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="py-6 text-sm text-center">© 2024-2025 VizHome. All rights reserved.</div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import GradientButton from '@/components/inspira-ui/gradient-button/GradientButton.vue';
const items = [
  { name: 'Models', ref: '/about' },
  { name: 'Prices', ref: '/prices' },
  { name: 'Documentation', ref: '/docs' },
  { name: 'Contact', ref: '/contact' },
]
</script>