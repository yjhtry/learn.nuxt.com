<script setup lang="ts">
type Status = 'init' | 'mounting' | 'installing' | 'ready' | 'start' | 'error'
const iframe = ref<HTMLIFrameElement>()
const wcUrl = ref<string>()
const error = shallowRef<{ message: string }>()
const status = ref<Status>('init')

async function startDevServer() {
  const wc = await useWebContainer()

  status.value = 'mounting'
  await wc.mount({
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'web-container',
          version: '1.0.0',
          scripts: {
            dev: 'nuxt dev',
          },
          dependencies: {
            nuxt: 'latest',
          },
        }, null, 2),
      },
    },
  })

  wc.on('server-ready', (_, url) => {
    (wcUrl.value = url)
    status.value = 'ready'
  })

  wc.on('error', (err) => {
    error.value = err
    status.value = 'error'
  })

  status.value = 'installing'
  const installProcess = await wc.spawn('npm', ['install'])
  const installExitCode = await installProcess.exit

  if (installExitCode) {
    error.value = {
      message: `Unable to run npm install, exit as ${installExitCode}`,
    }

    throw new Error('Unable to run npm install')
  }

  status.value = 'start'
  await wc.spawn('npm', ['run', 'dev'])
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

watchEffect(() => {
  if (error.value)
    // eslint-disable-next-line no-console
    console.log(error.value.message)
})

watchEffect(() => {
  if (status.value)
    // eslint-disable-next-line no-console
    console.log(status.value)
})

onMounted(startDevServer)
</script>

<template>
  <iframe v-show="status === 'ready'" ref="iframe" w-full h-full />
  <div v-show="status !== 'ready'" w-full h-full flex gap-2 items-center justify-center>
    <div i-eos-icons-bubble-loading icon-btn text-2xl />
    {{ status }}
  </div>
</template>
