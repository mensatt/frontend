<template>
  <header :style="{ top: `${-commonOffset}px` }">
    <div ref="commonEl" class="common">
      <h1 @click="clickTest">
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
      <div v-if="showMensa" class="mensa" @click="clickMensa">
        {{ selectedLocation?.name ?? '-' }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const pagesWhereShowMensa = [ 'index', 'calendar' ]
const showMensa = computed(() => pagesWhereShowMensa.includes(String(route.name)))

//

const popups = usePopups()
const selectedLocation = useSelectedLocation()
const globalHeightTracker = useGlobalHeaderHeight()
const globalFullHeightTracker = useGlobalHeaderFullHeight()

const commonEl = ref(null)
const { height: commonElHeight } = useElementSize(commonEl)
watch(commonElHeight, val => {
  globalFullHeightTracker.value = val
  globalHeightTracker.value = (val - commonOffset.value)
})

// THIS GUY. WE NEED THIS GUY!!!!!!!!
const commonOffset = useState('header--common-offset', () => 0)
const globalScrollLastVal = useState('header--globals-lastval', () => 0)

onMounted(() => {
  globalFullHeightTracker.value = commonElHeight.value
  globalHeightTracker.value = commonElHeight.value

  commonOffset.value = 0
  const globalScroll = useGlobalScroll()
  watch(globalScroll, (scroll) => {
    const delta = scroll - globalScrollLastVal.value
    globalScrollLastVal.value = scroll

    let newVal = commonOffset.value + delta
    if (newVal < 0) newVal = 0
    else if (newVal > commonElHeight.value) newVal = commonElHeight.value

    commonOffset.value = newVal
    globalHeightTracker.value = commonElHeight.value - newVal
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
  position: sticky;
  padding: 0;
  background-color: $bg-lighter;
  z-index: 10;
  width: 100%;
  user-select: none;
  view-transition-name: header-main;
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
  color: $color-major;
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
  color: $color-major;
}
</style>
