<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <component :is="currentThemeIcon" class="w-5 h-5" />
  </Button>
</template>

<script lang="ts" setup>
import { Sun, Moon, Monitor } from 'lucide-vue-next'

// Declare Color Mode
const colorMode = useColorMode()


const currentThemeIcon = computed(() => {
  if (colorMode.preference === 'system') {
    return Monitor
  } else {
    return colorMode.preference === 'dark'
      ? Sun
      : Moon
  }
})

function toggleTheme() {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark'
  } else if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
  }
}

</script>