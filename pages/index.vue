<template>
  <HeaderTag>
    <UtilsRelativeDateSelect />
  </HeaderTag>
 
  <PageContent v-if="viewMode === 'desktop'">
    <OccurrenceList
      :key="mensa.id + activeDate"
      :mensa="mensa.id"
      :date="activeDate"
    />
  </PageContent>

  <PageContent v-else-if="viewMode === 'mobile'" :no-padding="true">
    <UtilsSwipePages>
      <template #active>
        <UtilsPullDownRefresh :disabled="!!activeList?.loading" @refresh="refresh()">
          <OccurrenceList
            ref="activeList"
            :key="mensa.id + activeDate"
            :mensa="mensa.id"
            :date="activeDate"
          />
        </UtilsPullDownRefresh>
      </template>
    </UtilsSwipePages>
  </PageContent>
</template>

<script setup lang="ts">
const activeList = ref<any>(null)
const mensa = useSelectedLocation()
const viewMode = useViewMode()

const activeDate = useGlobalSelectedDate()

function refresh() {
  activeList.value?.refresh?.()
}
</script>
