<script setup lang="ts">
const { x, y } = useMouse()
const color = useColorMode()

function onToggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div text-red>
    Hello World! {{`(${ x  }, ${y})`}}
    <button @click="onToggleDark">toggle dark</button>
  </div>
</template>
