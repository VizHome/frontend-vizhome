<template>
  <div>
    <header class="fixe sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <nav class="flex flex-col items-center justify-between px-4 py-2 lg:flex-row">
        <div class="flex justify-center items-center">
          <NuxtLink to="/">
            <strong class="ml-3 text-3xl">Viz.</strong>
          </NuxtLink>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <NuxtLink v-for="item in items" :to="item.ref">
            <Button variant="ghost" class="font-normal hover:font-semibold">
              {{ item.name }}
            </Button>
          </NuxtLink>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" class="font-normal hover:font-semibold">
                Help
                <Icon name="line-md:chevron-down" class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem class="font-normal hover:font-semibold">
                FAQ
              </DropdownMenuItem>
              <DropdownMenuItem class="font-normal hover:font-semibold">
                Support
              </DropdownMenuItem>
              <DropdownMenuItem class="font-normal hover:font-semibold">
                Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div class="flex justify-center items-center space-x-3">
          <ButtonTheme />
        
          <NuxtLink to="/auth">
            <Button variant="secondary">
              Get started for free
            </Button>
          </NuxtLink>

          <NuxtLink to="/auth">
            <Button>
              Sign In
            </Button>
          </NuxtLink>
        </div>
      </nav>
    </header>
    
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
                <a rel="noopener noreferrer" href="/about" class="hover:font-semibold">Models</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/prices" class="hover:font-semibold">Pricing</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/contact" class="hover:font-semibold">Contact</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="/faq" class="hover:font-semibold">FAQ</a>
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
              <a rel="noopener noreferrer" href="https://discord.gg/nXwJPMenUC" class="flex items-center">
                <Icon name="line-md:discord" class="w-5 h-5 hover:animate-bounce" />
              </a>
              <a rel="noopener noreferrer" href="https://github.com/VizHome" class="flex items-center">
                <Icon name="line-md:github" class="w-5 h-5 hover:animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="py-6 text-sm text-center">© 2024-{{ years }} VizHome. All rights reserved.❤️</div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import ButtonTheme from '@/components/vizhome/theme/ButtonTheme.vue';

// Declare the current year
const date = new Date;
const years = date.getFullYear();

// Import the Button component
const items = [
  { name: 'Discover', ref: '/' },
  { name: 'Demo', ref: '/demo' },
  { name: 'Models', ref: '/about' },
  { name: 'Prices', ref: '/prices' },
]

</script>