<template>
  <div class="occurrence">
    <div class="image">
      <img v-if="imageUrl" :src="imageUrl" />
      <p v-else>No image uploaded</p>
    </div>

    <div class="details">
      <h2 v-text="data.dish.nameDe" />
      <div class="pills">
        <StarRating
          :stars="data.dish.reviewData.metadata.averageStars || 0"
          :count="data.dish.reviewData.metadata.reviewCount"
        />
        <TagPill v-for="tag of displayTags" :key="tag.key" :data="tag" />
      </div>
      <div class="comments">
        <div v-for="review of comments" :key="review.id" class="comment">
          <span class="name" v-text="review.displayName || '(anonymous)'" />
          <span class="text" v-text="review.text" />
        </div>
      </div>
      <button v-if="userCanRate" class="rateme" @click="rate()">Give a rating...</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '~/utils/entities/occurrence'

const api = useApi()

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const imageReviews = data.dish.reviewData.reviews
  .filter(rev => rev.images.length)
const randomImage = imageReviews.length
  ? imageReviews[~~(Math.random() * imageReviews.length)].images[0]
  : null
const imageUrl = randomImage
  ? api.getImageUrl(randomImage)
  : null

const comments = data.dish.reviewData.reviews
  .filter(rev => rev.text)
  .sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1)
  .slice(0, 5)
const userCanRate = new Date(data.date) <= new Date()

const displayTags = data.tags
  .filter(tag => tag.priority !== 'HIDE')

function rate() {
  alert('RATING!')
  console.log(data)
}
</script>

<style scoped lang="scss">
.occurrence {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: $bg-lighter;
  padding-bottom: calc($main-content-padding * 2);
  border-radius: $main-content-padding;
}

.image {
  & > * {
    aspect-ratio: 16/9;
    max-height: 50vh;
    object-fit: cover;
    width: 100%;
    background-color: $bg-light;
    box-sizing: border-box;
    margin: 0;
  }

  p {
    font-family: $font-regular;
    font-size: 11pt;
    display: grid;
    place-items: center;
    padding: $main-content-padding;
  }
}

.details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding: $main-content-padding;
}

h2 {
  margin: 0;
  font-family: $font-header;
  font-size: 18pt;
  color: $color-header;
  text-wrap: balance;
}

.pills {
  margin: $main-content-padding 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc($main-content-padding / 2);
}

.comments {
  span {
    margin: 0;
    font-size: 11pt;
    color: $color-minor;
  }

  .name {
    font-family: $font-major;

    &::after { content: ': '; }
  }

  .text {
    font-family: $font-regular;
  }
}

.rateme {
  all: unset;
  flex: 1 1;
  padding: 8pt;
  font-family: $font-regular;
  font-size: 11pt;
  color: $color-minor;
  border: 1px solid $bg-dark;
  margin-top: 10pt;
  border-radius: 3pt;
  transition: background-color .1s ease;
  cursor: text;

  &:hover {
    border-color: $bg-darker;
  }
}
</style>
