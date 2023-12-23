<script setup lang="ts">
const color = useColorMode()

function onToggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button icon-btn @click="onToggleDark">
    <div i-carbon-sun dark:i-carbon-moon />
  </button>
</template>
