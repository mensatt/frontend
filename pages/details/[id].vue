<template>
  <HeaderTag :hide-on-view-modes="[ 'desktop' ]">
    <UtilsHorizontalTabs
      :tabs="mobileTabList.map(id => ({ id, name: $t(`occurrence_details_tab_${id}`) }))"
      :active="mobileTabSelected"
      @select="i => (mobileTabSelected = i)"
    />
  </HeaderTag>

  <PageContent v-if="viewMode === 'mobile'">
    <h2 v-if="headerText" v-text="headerText" />
    <div v-else-if="mobileTabSelected === 0">
      <h2 v-text="formatters.localizeDishName(occ.dish)" />
      <DevId :id="occ.id" />
      <OccurrenceDetailsBreakdown :data="occ" />
    </div>
    <div v-else-if="mobileTabSelected === 1">
      <template v-for="review of reviews" :key="review.id">
        <OccurrenceDetailsFullReview :data="review" />
        <div class="review-divider" />
      </template>
    </div>
  </PageContent>

  <!-- <PageContent v-else class="page-desktop"> -->
  <PageContent v-else-if="occ" class="page-desktop">
    <div class="details">
      <h2 v-if="headerText" v-text="headerText" />
      <h2 v-else v-text="formatters.localizeDishName(occ.dish)" />
      <DevId :id="occ.id" />
      <OccurrenceDetailsBreakdown :data="occ" />
    </div>
    <div class="reviews">
      <OccurrenceDetailsFullReview
        v-for="review of reviews"
        :key="review.id"
        :data="review"
      />
    </div>
  </PageContent>
</template>

<script setup lang="ts">
const api = useApi()
const route = useRoute()
const i18n = useI18n()
const viewMode = useViewMode()
const formatters = useFormatters()

const mobileTabList = [ 'details', 'reviews' ]
const mobileTabSelected = useState(`occdetails-${route.params.id}-tab`, () => 0)

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

// reviews, sorted by time, new to old
const reviews = computed(() => occ.value?.dish
  .reviewData.reviews
  .map(r => ([ r, new Date(r.createdAt).getTime() ] as const))
  .sort(([,a], [,b]) => b - a)
  .map(([r]) => r))
</script>

<style scoped lang="scss">
h2 {
  margin: 0 0 $main-content-padding 0;
}

.review-divider:not(:last-child) {
  height: 1px;
  width: calc(100% + $main-content-padding*2);
  background-color: $bg-dark;
  margin: $main-content-padding calc($main-content-padding * -1);
}

.page-desktop {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $main-content-padding;
  max-width: 1200pt !important;
  margin: 0 auto;

  .reviews {
    column-count: 2;
    column-gap: $main-content-padding;
    column-fill: balance;

    & > * {
      border: 1px solid $bg-dark;
      border-radius: $menu-item-br;
      padding: $menu-item-padding;
      margin-bottom: $main-content-padding;
      height: fit-content;
      break-inside: avoid-column;
    }
  }
}

@media screen and (max-width: 1100px) {
  .page-desktop {
    grid-template-columns: 1fr 1fr;

    .reviews { column-count: 1; }
  }
}
</style>
