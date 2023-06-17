<template>
  <VitePwaManifest />
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
}

::-webkit-scrollbar {
  display: none;
  width: 0px;
}
</style>
