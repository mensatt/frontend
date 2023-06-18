<template>
  <div>
    <div class="header">
      <h2>Donnerstag, 15. Juni</h2>
    </div>
    <OccurrenceList :mensa="mensa" :date="date" />
  </div>
</template>

<script setup lang="ts">
const mensa = 'eddfa64d-5f21-4515-97d4-d45e49168116'
const date = new Date('2023-06-15T18:51:42.712Z')
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
</style>
