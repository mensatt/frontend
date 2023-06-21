<template>
  <header
    :data-fixed="!!fixed"
    :style="{ top: `${-commonOffset}px` }"
  >
    <div ref="commonEl" class="common">
      <h1 @click="clickTest">
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
      <div v-if="showMensa" class="mensa" @click="clickMensa">
        {{ selectedLocation?.name ?? '-' }}
      </div>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  showMensa: boolean
  fixed?: boolean
  fixedScrolling?: boolean
}>()

const popups = usePopups()
const selectedLocation = useSelectedLocation()

const commonEl = ref(null)
const { height: commonElHeight } = useElementSize(commonEl)

const commonOffset = useState('header--common-offset', () => 0)
const globalScrollLastVal = useState('header--globals-lastval', () => 0)

onMounted(() => {
  if (!props.fixedScrolling) return

  commonOffset.value = 0
  const globalScroll = useGlobalScroll()
  watch(globalScroll, (scroll) => {
    const delta = scroll - globalScrollLastVal.value
    globalScrollLastVal.value = scroll

    let newVal = commonOffset.value + delta
    if (newVal < 0) newVal = 0
    else if (newVal > commonElHeight.value) newVal = commonElHeight.value

    commonOffset.value = newVal
  })
})

async function clickMensa() {
  const options = useLocationList().value
  const mensa = await popups.open('select_mensa', {
    current: selectedLocation.value,
    options
  })
  if (mensa)
    selectedLocation.value = mensa
}

async function clickTest() {
  popups.open('test', { a: 1 })
}
</script>

<style scoped lang="scss">
header {
  padding: 0;
  background-color: $bg-lighter;
  border-bottom: 1px solid $bg-dark;
  z-index: 10;
  width: 100%;
  // position: sticky;
  // top: -$global-header-height;
  
  &[data-fixed=true] {
    position: fixed;
  }
}

.common {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $global-header-height;
}

h1 {
  font-family: $font-major;
  font-size: 11pt;
  margin: $main-content-padding;
  display: flex;
  align-items: center;
  line-height: 1em;

  img {
    width: 1.3em;
    height: 1.3em;
    margin-right: .4em;
  }
}

.mensa {
  display: grid;
  align-items: center;
  border: 1px solid $bg-dark;
  border-radius: 99pt;
  padding: 6pt 12pt;
  font-family: $font-major;
  font-size: 9pt;
  margin: 0 6pt;
  white-space: nowrap;
  overflow: hidden;
}
</style>
