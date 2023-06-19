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

onMounted(() => {
  if ('requestIdleCallback' in window)
    requestIdleCallback(backgroundTasks, { timeout: 2000 })
  else
    backgroundTasks()
})
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

textarea, input[type="text"] {
  width: 100%;
  padding: $menu-item-padding;
  margin: 0;
  box-sizing: border-box;
  background-color: none;
  outline: none;
  resize: none;
  border: 1px solid $bg-darker;
  border-radius: $menu-item-br;
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-regular;

  &::placeholder {
    color: #00000055;
  }
}
</style>
