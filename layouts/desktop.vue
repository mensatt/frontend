<template>
  <div class="app" view-mode="desktop" :experiments="devMode ? devExperiments.join(' ') : false">
    <DesktopHeader />
    <div ref="scrollcont" class="content" :data-scrollblocked="globalScrollBlock > 0">
      <slot />
    </div>
  </div>
</template>

<script setup lang=ts>
const scrollcont = ref<HTMLElement | null>(null)

const globalScroll = useGlobalScroll()
const globalScrollBlock = useGlobalScrollBlock()

const devMode = useSettingDevMode()
const devExperiments = useSettingDevExperiments()

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
