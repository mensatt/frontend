<template>
  <UtilsHorizontalTabs
    :tabs="listOfDates"
    :active="selectedDate"
    @select="i => (selectedDate = i)"
  />
</template>

<script setup lang="ts">
import { TabData } from '../utils/HorizontalTabs.vue'

const props = defineProps<{
  modelValue?: number | null
  daysPast?: number
  daysCount?: number
  showCalendar?: boolean
}>()

const emit = defineEmits([ 'update:modelValue', 'openCalendar' ])

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
let i = -(props.daysPast ?? 1)
while (listOfDates.length < (props.daysCount ?? 7)) {
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

if (props.showCalendar) {
  listOfDates.at(-1)!.seperator = true
  listOfDates.push({
    id: 'calendar',
    name: i18n.t('desktop_calendar'),
    icon: 'calendar_outline',
    onClickOverride() {
      emit('openCalendar')
    }
  })
}

const selectedDate = useState<number | null>('rel-date-sel--selected-date', () => (isWeekend(new Date()) || TODAY.getHours() < 17) ? 1 : 2)
watch(selectedDate, val => emit('update:modelValue', val))
onMounted(() => emit('update:modelValue', selectedDate.value))
watch(props, val => (val.modelValue !== undefined) ? (selectedDate.value = val.modelValue) : {})

const activeDate = computed(() => new Date(listOfDates[selectedDate.value ?? 0].id))
const globalSync = useGlobalSelectedDate()
watch(activeDate, val => (globalSync.value = val))
onMounted(() => (globalSync.value = activeDate.value))
</script>
