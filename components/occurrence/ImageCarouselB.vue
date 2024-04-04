<template>
  <div class="carousel">
    <NuxtImg
      :src="imageReviews[selected].images[0].id"
      provider="mensatt"
      sizes="mobile:100vw onecol:96vw twocol:49vw xl:500px xxl:800px"
      @click="tap()"
      @pointerdown="pause()"
      @pointerup="noDelta = true; resume()"
    />
    <div class="pages">
      <div v-for="_,idx of imageReviews.length" :key="idx" class="page">
        <div :style="{ width: `${getPageProgress(idx) * 100}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { imageReviews } = defineProps<{
  imageReviews: EntityOccurrence.Review[]
}>()

const selected = ref(0)
const progress = ref(0)
const noDelta = ref(false)

function getPageProgress(idx: number) {
  if (idx > selected.value) return 0
  if (idx < selected.value) return 1
  return progress.value
}

function tap() {
  selected.value = (selected.value + 1) % imageReviews.length
  progress.value = 0
}

const { pause, resume } = useRafFn(({ delta }) => {
  if (noDelta.value) {
    noDelta.value = false
    return
  }

  progress.value += delta / 4000
  if (progress.value >= 1)
    tap()
})
</script>

<style scoped lang="scss">
.carousel {
  height: 100%;
  width: 100%;
  position: relative;
}

img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
  display: block;
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
  background: linear-gradient(180deg, #00000055, #00000000);
  padding-bottom: 10pt;
}

.page {
  background-color: #ffffff88;
  height: 1pt;
  border-radius: 99pt;

  div {
    display: block;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>
