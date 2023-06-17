<template>
  <div>
    <div class="header">
      <h2>Montag, 19. Juni</h2>
    </div>

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
const { data, pending, error } = await api.getOccurrences('eddfa64d-5f21-4515-97d4-d45e49168116', new Date('2023-06-19T18:51:42.712Z'))

</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: left;
  margin: 0 0 calc($main-content-padding * 1) 0;

  h2 {
    font-family: $font-header;
    font-size: 20pt;
    margin: 0 $main-content-padding;
    display: flex;
    align-items: center;
  }
}

.occurrences {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
</style>
