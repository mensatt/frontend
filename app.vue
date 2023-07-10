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
</script>

<!-- THIS IS GLOBAL CSS, NOT SCOPED. DO NOT ADD STYLES HERE! -->
<style lang="scss">
@import '~/assets/style/global.scss';
</style>
