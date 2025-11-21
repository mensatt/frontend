<template>
  <HeaderTag ref="headerTagEl" :hide-on-view-modes="[ 'desktop' ]">
    <UtilsHorizontalTabs
      :tabs="months"
      :active="selectedMonth"
      @select="i => (selectedMonth = i)"
    />
  </HeaderTag>

  <PageContent :no-padding="true" class="outer" :style="{ '--occupied': `${globalOccupiedVerticalSpace}px` }">
    <UtilsDatePicker
      :month="monthRel"
      :rows="6"
      @next-month="selectedMonth = Math.min(months.length-1, selectedMonth+1)"
      @prev-month="selectedMonth = Math.max(0, selectedMonth-1)"
      @select="openDay"
    />
  </PageContent>
</template>

<script setup lang="ts">
import type { TabData } from '../components/utils/HorizontalTabs.vue'

const viewMode = useViewMode()
const i18n = useI18n()
const popups = usePopups()

const globalHeaderFullHeight = useGlobalHeaderFullHeight()
const globalNavFullHeight = useGlobalNavFullHeight()
const headerTagEl = ref<HTMLElement | null>(null)
const { height: headerTagHeight } = useElementSize(headerTagEl)
const globalOccupiedVerticalSpace = computed(() => (globalHeaderFullHeight.value + globalNavFullHeight.value + headerTagHeight.value))

//

onMounted(handleDesktopView)
watch(viewMode, handleDesktopView)
function handleDesktopView() {
  if (viewMode.value !== 'desktop') return
  navigateTo('/')
}

//

const TODAY = new Date()

const MONTHS_PAST = 8
const MONTHS_FUTURE = 2

const months: TabData[] = []
const currentMonth = TODAY.getMonth()
for (let i = -MONTHS_PAST; i <= MONTHS_FUTURE; i++) {
  const month = currentMonth + i
  const monthMod = (month + 120) % 12
  const yearOffset = Math.floor(month / 12)
  const nameAddition = (yearOffset === 0) ? '' : `'${TODAY.getFullYear() - 2000 + yearOffset}`

  months.push({
    id: String(month),
    name: i18n.t('month_' + monthMod) + nameAddition,
    seperator: (monthMod === 11)
  })
}

const selectedMonth = useState('calendar--sel-month', () => MONTHS_PAST)
const monthRel = computed(() => (currentMonth - MONTHS_PAST + selectedMonth.value))

//

function openDay(date: Date) {
  popups.open('occurrences_for_day', { date })
}
</script>

<style scoped lang="scss">
.outer {
  height: calc(100vh - var(--occupied) - 1px);
  padding: $main-content-padding;
  box-sizing: border-box;
}
</style>
