<template>
  <Header
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

const activeList = ref<any>(null)
const i18n = useI18n()

const relativeDayNames: Record<number, string> = {
  [-1]: i18n.t('yesterday'),
  [0]: i18n.t('today'),
  [1]: i18n.t('tomorrow')
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

  const intl = new Intl.DateTimeFormat(i18n.locale.value, { weekday: 'long' })
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
