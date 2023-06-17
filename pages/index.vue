<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const { data, pending, error } = await api.getOccurrences('eddfa64d-5f21-4515-97d4-d45e49168116', new Date('06-08-2023'))

</script>

<style scoped lang="scss">
.occurrences {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
</style>
