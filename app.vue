<template>
  <VitePwaManifest />
  <PopupsLayer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

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
