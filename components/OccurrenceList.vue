<template>
  <div v-if="pending">
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
    <Occurrence
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

const { data, pending, error } = await api.getOccurrences(props.mensa, props.date)
</script>

<style scoped lang="scss">
.occurrences {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
</style>

