<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <component :is="currentThemeIcon" class="w-5 h-5" />
  </Button>
</template>

<script lang="ts" setup>
import { Sun, Moon } from 'lucide-vue-next'

// Declare Color Mode
const colorMode = useColorMode()

const currentThemeIcon = computed(() => {
  return colorMode.preference === 'dark' ? Sun : Moon
})

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>
