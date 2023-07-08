<template>
  <div class="occurrence">
    <div class="image">
      <img v-if="imageUrl" :src="imageUrl" />
      <p v-else v-text="$t('occurrence_no_image')" />
    </div>

    <div class="details">
      <h2 v-text="dishName" />

      <div class="pills">
        <OccurrencePriceTag :data="data" />
        <OccurrenceStarRating
          :stars="data.dish.reviewData.metadata.averageStars || 0"
          :count="data.dish.reviewData.metadata.reviewCount"
        />
        <OccurrenceTagPill v-for="tag of displayTags" :key="tag.key" :data="tag" />
      </div>

      <div class="comments">
        <div v-for="review of comments" :key="review.id" class="comment">
          <span class="name" v-text="review.displayName || $t('occurrence_comment_author_anon')" />
          <span class="text" v-text="trimText(review.text)" />
        </div>
        <div v-if="!comments.length">
          <span class="none" v-text="$t('occurrence_no_comments')" />
        </div>
      </div>

      <div v-if="viewMode === 'desktop'" class="buttons">
        <button class="details" @click="rate()" v-text="$t('occurrence_show_details')" />
        <button class="rate" :disabled="!userCanRate" @click="rate()" v-text="$t('occurrence_add_rating')" />
      </div>
      <button v-else-if="userCanRate" class="rateme" @click="rate()" v-text="$t('occurrence_add_rating')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '~/utils/entities/occurrence'

const api = useApi()
const popups = usePopups()
const i18n = useI18n()
const viewMode = useViewMode()

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const dishName = computed(() => {
  if (i18n.locale.value === 'de' && data.dish.nameDe)
    return data.dish.nameDe
  if (i18n.locale.value === 'en' && data.dish.nameEn)
    return data.dish.nameEn

  return data.dish.nameDe ?? data.dish.nameEn
})

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

function trimText(text: string): string {
  if (text.length > 300) return text.substring(0, 280) + '...'
  return text
}

function rate() {
  popups.open('rate_dish', { occurrence: data })
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
  padding-bottom: calc($main-content-padding * 3);
  height: fit-content;
}

.image {
  pointer-events: none;

  & > * {
    display: block;
    aspect-ratio: 16/9;
    max-height: 50vh;
    object-fit: cover;
    width: 100%;
    background-color: $bg-dark;
    box-sizing: border-box;
    margin: 0;
    user-select: none;
  }

  p {
    font-family: $font-regular;
    font-size: 11pt;
    color: $color-minor;
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
  font-size: 14pt;
  color: $color-header;
  text-wrap: balance;
}

.pills {
  margin: $main-content-padding 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc($main-content-padding / 4);
}

.comments {
  .comment:not(:last-child) {
    margin-bottom: 5pt;
  }

  span {
    margin: 0;
    font-size: 10pt;
    color: $color-sub;
  }

  .name {
    font-family: $font-major;

    &::after { content: ': '; }
  }

  .text {
    font-family: $font-regular;
  }

  .none {
    font-family: $font-regular;
    color: $color-minor;
  }
}

.rateme {
  all: unset;
  flex: 1 1;
  padding: 8pt 10pt;
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-minor;
  border: 1px solid $bg-darker;
  margin-top: 10pt;
  border-radius: $menu-item-br;
  transition: background-color .1s ease;
  cursor: pointer;

  &:hover {
    border-color: $bg-darker;
  }
}

.buttons {
  display: flex;
  gap: $menu-item-margin;
  justify-content: space-between;

  button {
    all: unset;
    flex: 1 1;
    padding: 8pt 10pt;
    font-size: 10pt;
    margin-top: 10pt;
    box-sizing: border-box;
    font-family: $font-major;
    color: $bg-lighter;
    text-align: center;
    border-radius: 999pt;
    cursor: pointer;
    transition: background-color .1s ease;

    &.details {
      padding: 7pt 9pt;
      border: 1pt solid $bg-darker;
      color: $color-minor;

      &:hover {
        background-color: $bg-dark;
      }
    }

    &.rate {
      background-color: $color-green;

      &:disabled {
        background-color: $bg-dark;
        cursor: not-allowed;
        color: $bg-darker;
      }

      &:hover:not(:disabled) { background-color: $color-greenH; }
    }
  }
}

@media screen and (min-width: $view-min-width-desktop) {
  .occurrence {
    border: 1px solid $bg-dark;
    border-radius: $menu-item-br;
    padding-bottom: 0;
  }

  .image {
    overflow: hidden;
    border-radius: $menu-item-br $menu-item-br 0 0;
  }
}
</style>
