<template>
  <div class="app" view-mode="desktop">
    <DesktopNav />
    <div ref="scrollcont" class="content" :data-scrollblocked="globalScrollBlock > 0">
      DESKTOP DESKTOP DEKSOTPM SEDOEPM DEPSKEOP!
      <slot />
    </div>
  </div>
</template>

<script setup lang=ts>
const scrollcont = ref<HTMLElement | null>(null)

const globalScroll = useGlobalScroll()
const globalScrollBlock = useGlobalScrollBlock()

const { y } = useScroll(scrollcont)
watch(y, val => (globalScroll.value = val))

const gsc = useGlobalScrollContainer()
onMounted(() => (gsc.value = scrollcont.value))
</script>

<style scoped lang="scss">
.app {
  display: grid;
  height: 100dvh;
  width: 100dvw;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  overflow: hidden;
}

.content {
  overflow-y: scroll;
  background-color: $bg-lighter;

  &[data-scrollblocked=true] {
    overflow-y: hidden;
  }
}
</style>
