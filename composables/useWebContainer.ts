import { WebContainer } from '@webcontainer/api'

let webContainer: WebContainer

export async function useWebContainer() {
  if (!webContainer)
    webContainer = await WebContainer.boot()

  return webContainer
}
