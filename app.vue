<template>
  <VitePwaManifest />
  <PopupsLayer />
  <NuxtLayout :name="viewMode">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// apply color mode
useSettingColorMode()

// load dayjs + plugins
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// viewport info
const viewMode = useViewMode()
// maximum screen width (px) for mobile view
const VIEW_MAX_WIDTH_MOBILE = 800

function trackViewMode() {
  // making sure we're showing the right view (mobile <-> desktop)

  const { width } = useWindowSize()
  if (width.value > VIEW_MAX_WIDTH_MOBILE)
    viewMode.value = 'desktop'

  watch(width, (val) => {
    if (val > VIEW_MAX_WIDTH_MOBILE)
      viewMode.value = 'desktop'
    else
      viewMode.value = 'mobile'
  })
}

async function backgroundTasks() {
  // backgroundTasks() gets executed once the main thread is idle or after 2 seconds
  // this way low priority tasks can be done once all the important rendering and loading work is done

  const api = useApi()

  // update local mensa list
  const locations = await api.getLocations()
  if (locations)
    useLocationList().value = locations
}

onMounted(() => {
  trackViewMode()

  if ('requestIdleCallback' in window)
    requestIdleCallback(backgroundTasks, { timeout: 2000 })
  else
    backgroundTasks()
})

const popups = usePopups()
useEventListener('popstate', (e) => {
  const allowedPopups = e.state.$popups ?? []
  for (const popup of popups.state) {
    if (allowedPopups.includes(popup.uuid)) continue

    popup.callback(null)
    popup.dismissed = true
    setTimeout(() => {
      const index = popups.state.findIndex(search => search.uuid === popup.uuid)
      popups.state.splice(index, 1)
    }, 1000)
  }
})
</script>

<!-- THIS IS GLOBAL CSS, NOT SCOPED. DO NOT ADD STYLES HERE! -->
<style lang="scss">
@import '~/assets/style/global.scss';
</style>
