<template>
  <div class="carousel">
    <UiImage
      v-for="review of imageReviews"
      :key="review.id"
      :src="review.images[0].id"
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
  aspect-ratio: 14/9;
  scroll-snap-align: center;
  pointer-events: none;
}
</style>
