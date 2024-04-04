<template>
  <div class="carousel">
    <NuxtImg
      v-for="review of imageReviews"
      :key="review.id"
      :src="review.images[0].id"
      provider="mensatt"
      sizes="mobile:100vw onecol:96vw twocol:49vw xl:500px xxl:800px"
    />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { imageReviews } = defineProps<{
  imageReviews: EntityOccurrence.Review[]
}>()
</script>

<style scoped lang="scss">
.carousel {
  height: 100%;
  width: 100%;
  overflow: scroll hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  display: flex;
  gap: 2pt;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
  scroll-snap-align: center;
  pointer-events: none;
}
</style>
