import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['border-base', 'border-rose  dark:border-gray:50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 !outline-none'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
