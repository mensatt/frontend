<template>
  <div class="app">
    <div class="content">
      <Header />
      <slot />
    </div>
    <MobileNav />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

.content {
  overflow-y: scroll;
}
</style>
