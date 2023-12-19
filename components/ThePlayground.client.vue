<script setup lang="ts">
import 'xterm/css/xterm.css'

type Status = 'init' | 'mount' | 'install' | 'ready' | 'start' | 'error'
const iframe = ref<HTMLIFrameElement>()
const wcUrl = ref<string>()
const error = shallowRef<{ message: string }>()
const status = ref<Status>('init')
const stream = shallowRef<ReadableStream<string>>()

function loadFiles() {
  const rawFiles = import.meta.glob(['../templates/**/*.*', '!../templates/**/node_modules'], { eager: true, as: 'raw' })
  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, contents]) => [
      path.replace('../templates/basic/', ''),
      {
        file: { contents },
      },
    ]),
  )

  return files
}

async function startDevServer() {
  const wc = await useWebContainer()

  status.value = 'mount'

  await wc.mount(loadFiles())

  wc.on('server-ready', (_, url) => {
    (wcUrl.value = url)
    status.value = 'ready'
  })

  wc.on('error', (err) => {
    error.value = err
    status.value = 'error'
  })

  status.value = 'install'
  const installProcess = await wc.spawn('npm', ['install'])
  stream.value = installProcess.output

  const installExitCode = await installProcess.exit

  if (installExitCode) {
    error.value = {
      message: `Unable to run npm install, exit as ${installExitCode}`,
    }

    throw new Error('Unable to run npm install')
  }

  status.value = 'start'
  const devProcess = await wc.spawn('npm', ['run', 'dev'])
  stream.value = devProcess.output
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
  <div h-full flex flex-col>
    <iframe v-show="status === 'ready'" ref="iframe" w-full h-full />
    <div v-if="status !== 'ready'" w-full h-full flex flex-col gap-2 items-center justify-center>
      <div i-eos-icons-bubble-loading icon-btn text-2xl />
      {{ status }}ing...
    </div>
    <TerminalOutput :stream="stream" />
  </div>
</template>
