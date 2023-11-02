<template>
  <div class="outer">
    <div class="header">
      <UtilsHorizontalTabs
        :tabs="mobileTabList.map(id => ({ id, name: $t(`occurrence_details_tab_${id}`) }))"
        :active="mobileTabSelected"
        @select="i => (mobileTabSelected = i)"
      />
    </div>

    <div v-if="mobileTabSelected === 0">
      <DevId :id="occurrence.id" />
      <OccurrenceDetailsBreakdown :data="occurrence" />
    </div>
    <div v-else-if="mobileTabSelected === 1" class="review-container">
      <template v-for="review of reviews" :key="review.id">
        <OccurrenceDetailsFullReview :data="review" />
        <div class="review-divider" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const props = defineProps<{
  close: () => any,
  occurrence: EntityOccurrence.Occurrence
}>()

const mobileTabList = [ 'details', 'reviews' ]
const mobileTabSelected = useState(`occdetails-${props.occurrence.id}-tab`, () => 0)

// reviews, sorted by time, new to old
const reviews = computed(() => props.occurrence?.dish
  .reviewData.reviews
  .map(r => ([ r, new Date(r.createdAt).getTime() ] as const))
  .sort(([ ,a ], [ ,b ]) => b - a)
  .map(([ r ]) => r))
</script>

<style scoped lang="scss">
.outer {
  margin: calc($main-content-padding * -1);
  width: calc(100% + $main-content-padding*2);
}

.header {
  position: sticky;
  top: -1px;
  padding-top: 1px;
  background-color: $bg-lighter;
  width: calc(100% + $main-content-padding*4);
  margin: 0 calc($main-content-padding * -2);
  border-bottom: 1px solid $bg-dark;
}

.review-divider:not(:last-child) {
  height: 1px;
  width: calc(100% + $main-content-padding*4);
  margin: $main-content-padding calc($main-content-padding * -2);
  background-color: $bg-dark;
}

.review-container {
  min-height: 80vh;
  padding-top: $main-content-padding;
}
</style>
