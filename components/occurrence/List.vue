<template>
  <div v-if="loading">
    <SkeletonOccurrence
      v-for="i in 3"
      :key="i"
      :seed="i"
    />
  </div>
  <div v-else-if="error">
    <!-- TODO -->
    Error!<br>
    {{ error }}
  </div>
  <div v-else class="occurrences">
    <OccurrenceCard
      v-for="occ of occurrences.visible"
      :key="occ.id"
      :data="occ"
    />

    <div
      v-if="occurrences.hidden.length"
      :data-show-hidden="showHidden"
    >
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
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

