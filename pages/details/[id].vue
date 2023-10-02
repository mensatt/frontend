<template>
  <HeaderTag>
    <UtilsHorizontalTabs
      :tabs="mobileTabList.map(id => ({ id, name: $t(`occurrence_details_tab_${id}`) }))"
      :active="mobileTabSelected"
      @select="i => (mobileTabSelected = i)"
    />
  </HeaderTag>

  <PageContent>
    <h2 v-if="headerText" v-text="headerText" />
    <div v-else-if="mobileTabSelected === 0">
      <h2 v-text="dishName" />

      <div class="pills">
        <OccurrencePricePill :data="occ" />
        <OccurrenceRatingPill
          :stars="occ.dish.reviewData.metadata.averageStars || 0"
          :count="occ.dish.reviewData.metadata.reviewCount"
        />
        <OccurrenceCaloriesPill :data="occ" />
        <OccurrenceTagPill v-for="tag of displayTags" :key="tag.key" :data="tag" />
      </div>

      <hr>

      <p style="white-space: pre;overflow: scroll;">
        {{ data }}
      </p>
    </div>
    <div v-else-if="mobileTabSelected === 1">
      <template v-for="review of reviews" :key="review.id">
        <OccurrenceFullReview :data="review" />
        <div class="review-divider" />
      </template>
    </div>
  </PageContent>
</template>

<script setup lang="ts">
const api = useApi()
const route = useRoute()
const i18n = useI18n()

const mobileTabList = [ 'details', 'reviews', 'history' ]
const mobileTabSelected = useState(() => 0)

//

const { data, pending, error } = await api.getOccurrence(String(route.params.id))
const occ = computed(() => data.value?.occurrences?.[0])

//

const headerText = computed(() => {
  if (pending.value) return i18n.t('occurrence_details_loading')
  if (error.value) return i18n.t('occurrence_details_error')
  if (!data.value?.occurrences?.length) return i18n.t('occurrence_details_not_found')
  return null
})

//

const dishName = computed(() => {
  if (!occ.value?.dish) return ''

  if (i18n.locale.value === 'de' && occ.value.dish.nameDe)
    return occ.value.dish.nameDe
  if (i18n.locale.value === 'en' && occ.value.dish.nameEn)
    return occ.value.dish.nameEn

  return occ.value.dish.nameDe ?? occ.value.dish.nameEn
})

const displayTags = computed(() => occ.value?.tags
  .filter(tag => tag.priority !== 'HIDE') ?? [])

// reviews, sorted by time, new to old
const reviews = computed(() => occ.value?.dish
  .reviewData.reviews
  .map(r => ([ r, new Date(r.createdAt).getTime() ] as const))
  .sort(([,a], [,b]) => b - a)
  .map(([r]) => r))
</script>

<style scoped lang="scss">
h2 {
  margin: 0;
}

.pills {
  margin: $main-content-padding 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc($main-content-padding / 4);
}

.review-divider:not(:last-child) {
  height: 1px;
  width: calc(100% + $main-content-padding*2);
  background-color: $bg-dark;
  margin: $main-content-padding calc($main-content-padding * -1);
}
</style>
