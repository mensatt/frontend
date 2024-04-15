<template>
  <div class="carousel">
    <div ref="htmlEl" class="img" @click="tapped">
      <UiImage
        :src="imageReviews[selected].images[0].id"
        aspect-ratio="14 / 9"
        :preload="imageReviews.map(i => i.images[0].id)"
        @loaded="imageLoaded(); prefetch()"
      />
    </div>
    <div class="pages" :data-paused="paused">
      <div v-for="_,idx of imageReviews.length" :key="idx" class="page">
        <div :style="{ width: `${getPageProgress(idx) * 100}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { EntityOccurrence } from '../../utils/entities/occurrence'

const settingsAutoCycleImages = useSettingAutoCycleImages()
const api = useApi()

const { imageReviews } = defineProps<{
  imageReviews: EntityOccurrence.Review[]
}>()

const htmlEl = ref<HTMLElement>()
const { width: imgWidth, height: imgHeight } = useElementSize(htmlEl)

function isCycleAllowed() {
  if (imageReviews.length === 1) return false
  return true
}

function isAutoCycleEnabled() {
  if (imageReviews.length === 1) return false
  if (!settingsAutoCycleImages.value) return false
  return true
}

const selected = ref(0)
const progress = ref(0)
const paused = ref(imageReviews.length === 1)
const tappedAt = ref(0)
const skipNextIteration = ref(false)

function getPageProgress(idx: number) {
  if (idx > selected.value) return 0
  if (idx < selected.value) return 1
  return progress.value
}

function next() {
  if (!isCycleAllowed())
    return

  selected.value = (selected.value + 1) % imageReviews.length
  progress.value = 0
}

function previous() {
  if (!isCycleAllowed())
    return

  if (selected.value > 0)
    selected.value--
  progress.value = 0
}

const { pressed } = useMousePressed({ target: htmlEl })
watch(pressed, (val) => {
  if (val) pause()
  else resume()
})

function tapped(e: MouseEvent) {
  if (tappedAt.value) {
    const tappedDelta = Date.now() - tappedAt.value
    if (tappedDelta > 200)
      return
  }

  if (e.offsetX / (e.target as HTMLElement).offsetWidth < 0.2)
    previous()
  else
    next()
}

function pause() {
  if (!isAutoCycleEnabled()) return

  tPause()
  paused.value = true
  tappedAt.value = Date.now()
}

function resume() {
  if (!isAutoCycleEnabled()) return

  tappedAt.value = 0
  skipNextIteration.value = true
  tResume()
  paused.value = false
}

const { pause: tPause, resume: tResume } = useRafFn(({ delta }) => {
  if (skipNextIteration.value) {
    skipNextIteration.value = false
    return
  }

  progress.value += delta / 4000
  if (progress.value >= 1)
    next()
})

// indexes of images we've loaded already
const prefetched = ref(new Set([ selected.value ]))
// pre-fetching the next image in line
function prefetch(idx: number = (selected.value + 1)) {
  if (idx >= imageReviews.length) return
  if (prefetched.value.has(idx)) return
  if (!imgWidth.value || !imgHeight.value) return

  prefetched.value.add(idx)
  const src = api.buildImageUrl(imageReviews[idx].images[0].id, imgWidth.value, imgHeight.value)
  useImage({ src })
}
watch(selected, val => prefetch(val + 1))

onMounted(() => {
  tPause()
  progress.value = 0
})

function imageLoaded() {
  if (!paused.value && isAutoCycleEnabled() && progress.value === 0)
    tResume()
}
</script>

<style scoped lang="scss">
.carousel {
  height: 100%;
  width: 100%;
  position: relative;
}

.img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.pages {
  width: 100%;
  top: 0;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10pt, 1fr));
  gap: 3pt;
  padding: 3pt;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00000022, #00000000);
  padding-bottom: 20pt;
  transition: opacity .1s ease-out;

  &[data-paused=true] {
    opacity: 0;
    transition: opacity .1s ease-out .2s;
  }
}

.page {
  background-color: #ffffff88;
  height: 2px;
  border-radius: 99pt;
  overflow: hidden;

  div {
    display: block;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>
