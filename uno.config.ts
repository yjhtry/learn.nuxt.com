import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['border-base', 'border-gray-200 dark:border-gray-800'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 !outline-none'],
    ['bg-base', 'bg-white dark:bg-[#020420]'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'DM Sans',
        mono: 'DM Mono',
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
  ],
})
