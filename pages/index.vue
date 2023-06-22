<template>
  <Header
    ref="header"
    :show-mensa="true"
    :fixed="true"
    :fixed-scrolling="true"
  >
    <UtilsHorizontalTabs
      :tabs="listOfDates"
      :active="selectedDate"
      @select="i => (selectedDate = i)"
    />
  </Header>

  <UtilsSwipePages>
    <template #active>
      <div class="spacer" :style="{ height: `${headerHeight}px` }" />
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
</template>

<script setup lang="ts">
import { TabData } from '../components/utils/HorizontalTabs.vue'

const header = ref(null)
const { height: headerHeight } = useElementSize(header)

const activeList = ref<any>(null)

// TODO(localization)
const relativeDayNames: Record<number, string> = {
  [-1]: 'Gestern',
  [0]: 'Heute',
  [1]: 'Morgen'
}

//

const TODAY = new Date()
const DAY_MILLIS = 24 * 60 * 60 * 1000

function isWeekend(date: Date): boolean {
  return (date.getDay() === 0) || (date.getDay() === 6)
}

const listOfDates: TabData[] = []
let i = -1
while (listOfDates.length < 7) {
  const date = new Date(TODAY.getTime() + i * DAY_MILLIS)

  // is it the weekend? then check next day
  if (isWeekend(date)) {
    if (listOfDates.length === 0) i--
    else i++
    continue
  }

  // TODO(localization) use user language here
  const intl = new Intl.DateTimeFormat('de-DE', { weekday: 'long' })
  listOfDates.push({
    id: date.toISOString(),
    name: relativeDayNames[i] ?? intl.format(date),
    seperator: (date.getDay() === 5) // freitag
  })
  i++
}

const selectedDate = useState('index--selected-date', () => (isWeekend(new Date()) || TODAY.getHours() < 17) ? 1 : 2)

const mensa = useSelectedLocation()
const activeDate = computed(() => new Date(listOfDates[selectedDate.value].id))

function refresh() {
  activeList.value?.refresh?.()
}
</script>

<style scoped lang="scss">
h2 {
  font-family: $font-header;
  font-size: 20pt;
  margin: 0 $main-content-padding;
  padding-bottom: $main-content-padding;
  display: flex;
  align-items: center;
}
</style>
