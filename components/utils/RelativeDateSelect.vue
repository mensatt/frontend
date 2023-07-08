<template>
  <UtilsHorizontalTabs
    :tabs="listOfDates"
    :active="selectedDate"
    @select="i => (selectedDate = i)"
  />
</template>

<script setup lang="ts">
import { TabData } from '../utils/HorizontalTabs.vue'

const { daysPast = 1, daysCount = 7 } = defineProps<{
  modelValue: Date
  daysPast?: number
  daysCount?: number
}>()

const emit = defineEmits([ 'update:modelValue' ])

//

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
let i = -daysPast
while (listOfDates.length < daysCount) {
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

const selectedDate = useState('rel-date-sel--selected-date', () => (isWeekend(new Date()) || TODAY.getHours() < 17) ? 1 : 2)

const activeDate = computed(() => new Date(listOfDates[selectedDate.value].id))
watch(activeDate, val => emit('update:modelValue', val))
onMounted(() => emit('update:modelValue', activeDate.value))
</script>
