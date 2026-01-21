<template>
  <div class="occurrence">
    <div class="image">
      <OccurrenceImageCarouselA v-if="experiments.isEnabled('image_carousel_a') && imageReviews.length" :image-reviews="imageReviews" />
      <OccurrenceImageCarouselB v-else-if="imageReviews.length" :image-reviews="imageReviews" />
      <p v-else v-text="$t('occurrence_no_image')" />
    </div>

    <div class="details">
      <h2 @click="showDetails(true)" v-text="formatters.localizeDishName(data.dish)" />
      <DevId :id="data.id" />

      <div class="pills" @click="showDetails(true)">
        <OccurrencePricePill :data="data" />
        <OccurrenceRatingPill
          :stars="data.dish.reviewData.metadata.averageStars || 0"
          :count="data.dish.reviewData.metadata.reviewCount"
        />
        <OccurrenceCaloriesPill v-if="showCalories" :data="data" />
        <OccurrenceTagPill v-for="tag of displayTags" :key="tag.key" :data="tag" />
      </div>

      <div class="comments" @click="showDetails(true)">
        <div v-for="review of comments" :key="review.id" class="comment">
          <span class="name" v-text="review.displayName || $t('occurrence_comment_author_anon')" />
          <span class="text" v-text="trimText(review.text)" />
        </div>
        <div v-if="!comments.length">
          <span class="none" v-text="$t('occurrence_no_comments')" />
        </div>
      </div>

      <div v-if="viewMode === 'desktop'" class="buttons">
        <UiButton :slim="true" :secondary="true" :text="$t('occurrence_show_details')" @click="showDetails(false)" />
        <UiButton :slim="true" :disabled="!userCanRate" :text="$t('occurrence_add_rating')" @click="rate()" />
      </div>
      <button v-else-if="userCanRate" class="rateme" @click="rate()">
        <Icon name="material-symbols:edit-square-outline" />
        {{ $t('occurrence_add_rating') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '~/utils/entities/occurrence'

const router = useRouter()
const popups = usePopups()
const viewMode = useViewMode()
const formatters = useFormatters()
const experiments = useExperiments()

const showCalories = useSettingShowCalories()

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const imageReviews = data.dish.reviewData.reviews
  .filter(rev => rev.images.length)

const comments = data.dish.reviewData.reviews
  .filter(rev => rev.text)
  .sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1)
  .slice(0, 5)
const userCanRate = new Date(data.date) <= new Date()

const displayTags = data.tags
  .filter(tag => tag.priority === 'MEDIUM' || tag.priority === 'HIGH')

function trimText(text: string): string {
  if (text.length > 300) return text.substring(0, 280) + '...'
  return text
}

function rate() {
  popups.open('rate_dish', { occurrence: data })
}

function showDetails(mobileOnly: boolean) {
  if (viewMode.value === 'mobile') {
    popups.open(
      'occurrence_details',
      { occurrence: data },
      undefined, // no positioning needed on mobile
      { strat: 'push', url: `/details/${data.id}`, revertOnClose: true } // we're changing the url to reflect the id
    )
  } else if (!mobileOnly) {
    router.push(`/details/${data.id}`)
  }
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

  [view-mode=desktop] & {
    border: 1px solid $bg-dark;
    border-radius: $menu-item-br;
    padding-bottom: 0;
  }
}

.image {
  [view-mode=desktop] & {
    pointer-events: unset;
    overflow: hidden;
    border-radius: $menu-item-br $menu-item-br 0 0;
  }

  & > * {
    aspect-ratio: 14/9;
    max-height: 50vh;
    object-fit: cover;
    width: 100%;
    background-color: $bg-dark;
    box-sizing: border-box;
    margin: 0;
  }

  & > img {
    display: block;
  }

  p {
    font-family: $font-regular;
    font-size: 11pt;
    color: $color-minor;
    display: grid;
    place-items: center;
    padding: $main-content-padding;
    user-select: none;
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
  padding: 8pt 14pt 9pt 14pt;
  font-family: $font-regular;
  font-size: 10pt;
  color: $bg-lighter;
  font-family: $font-major;
  font-size: 10pt;
  max-width: fit-content;
  // border: 1px solid $bg-darker;
  background-color: $color-green;
  margin-top: 10pt;
  border-radius: 999pt;
  transition: background-color .1s ease;
  cursor: pointer;

  .icon {
    font-size: 15pt;
    margin: -4pt;
    vertical-align: middle;
    margin-right: 2pt;
    transform: translateY(-1px);
  }

  &:hover {
    background-color: $color-green;
  }
}

.buttons {
  display: flex;
  gap: $menu-item-margin;
  justify-content: space-between;
  margin-top: 10pt;
}
</style>
