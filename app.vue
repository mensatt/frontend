<template>
  <VitePwaManifest />
  <PopupsLayer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
async function backgroundTasks() {
  // backgroundTasks() gets executed once the main thread is idle or after 2 seconds
  // this way low priority tasks can be done once all the important rendering and loading work is done

  const api = useApi()

  // update local mensa list
  const locations = await api.getLocations()
  if (locations)
    useLocationList().value = locations
}
onMounted(() => requestIdleCallback(backgroundTasks, { timeout: 2000 }))
</script>

<style lang="scss">
body {
  @include theme-light;

  padding: 0;
  margin: 0;
  overflow-y: scroll;
  position: fixed;
}

html, body {
  overscroll-behavior: none;
}

::-webkit-scrollbar {
  display: none;
  width: 0px;
}

* {
  font-display: swap;
}

// POPUP DEFAULT STYLING

.popup h2 {
  font-family: $font-header;
  font-size: 16pt;
  color: $color-major;
  margin: 0 0 $main-content-padding 0;
  padding: 0;
}
</style>
