<template>
  <div v-if="loading">
    <SkeletonOccurrence
      v-for="i in 3"
      :key="i"
      :seed="i"
    />
  </div>

  <div v-else-if="error" class="no-list">
    <img src="~/assets/img/carrocket_down.svg" alt="">
    <span class="title" v-text="$t('occurrence_list_error_title')" />
    <span class="desc" v-text="error" />
  </div>

  <div v-else class="occurrences">
    <div v-if="occurrences.visible.length" class="visible-list">
      <OccurrenceCard
        v-for="occ of occurrences.visible"
        :key="occ.id"
        :data="occ"
      />
    </div>
    <div v-else-if="occurrences.hidden.length" class="no-list">
      <img src="~/assets/img/carrocket_down.svg" alt="">
      <span class="title" v-text="$t('occurrence_all_hidden_title')" />
      <span class="desc" v-text="$t('occurrence_all_hidden_desc')" />
    </div>
    <div v-else class="no-list">
      <img src="~/assets/img/carrocket_down.svg" alt="">
      <span class="title" v-text="$t('occurrence_list_empty_title')" />
      <span class="desc" v-text="$t('occurrence_list_empty_desc')" />
    </div>

    <div v-if="occurrences.hidden.length" :data-show-hidden="showHidden">
      <div class="toggle" @click="toggleHiddenItems()">
        <NuxtIcon name="expand_more" />
        <span v-text="$t('hidden_dish', occurrences.hidden.length)" />
      </div>
      <div class="hidden-list" v-if="showHidden">
        <OccurrenceCard
          v-for="occ of occurrences.hidden"
          :key="occ.id"
          :data="occ"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const filters = useFilters()

const props = defineProps<{
  mensa: string
  date: Date
}>()

const dataCleared = useState(`occurrence-list--${props.mensa}-${props.date}-dc`, () => false)
const { data, pending, error, refresh: apiRefresh } = await api.getOccurrences(props.mensa, props.date)

const loading = computed(() => pending.value || !data.value || dataCleared.value)

const showHidden = useState(`occurrence-list--${props.mensa}-${props.date}-sh`, () => false)

const occurrences = computed(() => {
  if (loading.value) return { visible: [], hidden: [] }
  return filters.filterOccurrences(data.value.occurrences)
})

function toggleHiddenItems() {
  showHidden.value = !showHidden.value

  nextTick(() => {
    if (showHidden.value)
      useGlobalScrollContainer().value?.scrollBy({ top: window.innerHeight/5*4, behavior: 'smooth' })
    else
      useGlobalScrollContainer().value?.scrollBy({ top: -1, behavior: 'smooth' })
  })
}

defineExpose({
  loading,
  refresh() {
    // why we're waiting half a second before actually refreshing?
    // mensatt api is so fast you don't even realise that the data was refreshed since there was no loading screen or anything
    // that's why we give it a bit of time to properly communicate to the user that we're fetching new data now
    // this does NOT impact first page load, that's still instant, we're just delaying data refreshing by a bit
    dataCleared.value = true
    setTimeout(() => {
      apiRefresh()
      nextTick(() => (dataCleared.value = false))
    }, 500)
  }
})
</script>

<style scoped lang="scss">
.occurrences {
}

.visible-list {
  min-height: calc(100vh - 90pt);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300pt, 1fr));
  gap: $main-content-padding;
}

.no-list {
  display: flex;
  min-height: calc(100vh - 90pt);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $main-content-padding;
  box-sizing: border-box;

  img {
    width: 30vw;
    height: 30vw;
    max-width: 100pt;
    max-height: 100pt;
  }

  .title {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-sub;
    text-align: center;
    text-wrap: balance;
    margin: calc($main-content-padding*3) 0 $main-content-padding 0;
  }

  .desc {
    font-family: $font-regular;
    font-size: 10pt;
    color: $color-minor;
    text-align: center;
    text-wrap: balance;
    margin-bottom: calc($main-content-padding*7);
  }
}

.toggle {
  width: 100%;
  height: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5pt;
  background-color: $bg-light;
  border-top: 1px solid $bg-dark;
  user-select: none;

  span {
    font-family: $font-regular;
    font-size: 9pt;
    color: $color-minor;
  }
}

.nuxt-icon {
  transition: transform .2s ease-out;

  [data-show-hidden=true] & {
    transform: scaleY(-1);
  }
}

.hidden-list {
  opacity: .7;
}
</style>

