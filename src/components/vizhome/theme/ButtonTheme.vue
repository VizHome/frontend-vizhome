<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <Icon :name="currentThemeIcon" class="w-5 h-5" />
  </Button>
</template>

<script lang="ts" setup>
// Declare Color Mode
const colorMode = useColorMode();


const currentThemeIcon = computed(() => {
  if (colorMode.preference === 'system') {
    return 'line-md:computer';
  } else {
    return colorMode.preference === 'dark'
      ? 'line-md:sunny-loop'
      : 'line-md:moon-loop';
  }
});

function toggleTheme() {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark';
  } else if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
  } 
}

</script>