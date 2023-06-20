<template>
  <div>
    <div class="header">
      <h2>Donnerstag, 22. Juni</h2>
    </div>

    <UtilsPullDownRefresh :enabled="refreshAllowed" @refresh="refresh()">
      <OccurrenceList
        ref="primaryList"
        :key="mensa.id + date"
        :mensa="mensa.id"
        :date="date"
      />
    </UtilsPullDownRefresh>
  </div>
</template>

<script setup lang="ts">
const mensa = useSelectedLocation()
const date = new Date('2023-06-22T18:51:42.712Z')

const primaryList = ref<any>(null)
const refreshAllowed = useState('index--refresh-allowed', () => true)

function refresh() {
  refreshAllowed.value = false
  primaryList.value?.refresh()
  setTimeout(() => (refreshAllowed.value = true), 500)
}
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
