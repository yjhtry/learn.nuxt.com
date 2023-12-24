<template>
  <nav border="b base" text="lg" flex="~ gap-2 items-center" class="px6 py4 h-18">
    <NuxtLink href="/" title="Nuxt Playground" flex="~ items-baseline gap-2">
      <NuxtLogo h-5 />
      <span text-xl>Playground</span>
    </NuxtLink>
    <div flex-auto />
    <ColorThemeBtn />
    <NuxtLink
      p2 rounded
      hover:bg-gray:10
      href="https://github.com/yjhtry/learn.nuxt.com"
      target="_blank"
    >
      <div i-carbon-logo-github text-xl />
    </NuxtLink>
  </nav>
</template>
