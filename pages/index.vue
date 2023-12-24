<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full">
    <div class="border-r border-base p-4">
      Col1
      <div text-red>
        Hello World! {{ `(${x}, ${y})` }}
      </div>
    </div>
    <div h-full of-hidden>
      <ThePlayground />
    </div>
  </div>
</template>
