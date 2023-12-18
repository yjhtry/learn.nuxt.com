<script setup lang="ts">
const { x, y } = useMouse()
const color = useColorMode()

function onToggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full">
    <div class="border-r border-base p-4">
      Col1
      <div text-red>
        Hello World! {{ `(${x}, ${y})` }}
        <button @click="onToggleDark">
          toggle dark
        </button>
      </div>
    </div>
    <div p-4>
      <TheWebContainer />
    </div>
  </div>
</template>
