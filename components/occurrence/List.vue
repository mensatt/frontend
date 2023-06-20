<template>
  <div v-if="loading">
    <SkeletonOccurrence
      v-for="i in 3"
      :key="i"
      :seed="i"
    />
  </div>
  <div v-else-if="error">
    Error!<br>
    {{ error }}
  </div>
  <div v-else class="occurrences">
    <OccurrenceCard
      v-for="occ of data.occurrences"
      :key="occ.id"
      :data="occ"
    />
  </div>
</template>

<script setup lang="ts">
const api = useApi()

const props = defineProps<{
  mensa: string
  date: Date
}>()

const dataCleared = useState(`occurrence-list--${props.mensa}-${props.date}-dc`, () => false)
const { data, pending, error, refresh: apiRefresh } = await api.getOccurrences(props.mensa, props.date)

const loading = computed(() => pending.value || dataCleared.value)

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
</style>

