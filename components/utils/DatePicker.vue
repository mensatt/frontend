<template>
  <div
    class="dates"
    :style="{ '--rows': Math.ceil(dates.length/5) }"
  >
    <span v-text="$t('weekday_mon')" />
    <span v-text="$t('weekday_tue')" />
    <span v-text="$t('weekday_wed')" />
    <span v-text="$t('weekday_thu')" />
    <span v-text="$t('weekday_fri')" />
    <div
      v-for="date, i of dates"
      :key="i"
      :data-type="date.type"
      :data-today="date.today"
      @click="clickDate(date)"
    >
      <span v-text="date.date.getDate()" />
    </div>
  </div>
</template>


<script setup lang="ts">
type DateType = {
  date: Date
  type: 'prev' | 'next' | 'selectable'
  today: boolean
}

// 

const props = defineProps<{
  month: number
}>()

const emit = defineEmits([ 'nextMonth', 'prevMonth', 'select' ])

//

const TODAY = new Date()
const DAY_MILLIS = 24 * 60 * 60 * 1000

function isWeekend(date: Date): boolean {
  return (date.getDay() === 0) || (date.getDay() === 6)
}

const dates = computed(() => {
  let year = TODAY.getFullYear()
  let month = props.month
  while (month < 0) {
    month += 12
    year -= 1
  }
  while (month > 11) {
    month -= 12
    year += 1
  }

  const monthOne = new Date(year, month, 1)
  const monthLength = new Date(year, month+1, 0).getDate()
  const out: DateType[] = []

  if (!isWeekend(monthOne)) {
    // fill in days from prev month which still appear on this page
    for (let prevMonth = 0; prevMonth < monthOne.getDay(); prevMonth++) {
      const date = new Date(monthOne.getTime() + (prevMonth - monthOne.getDay()) * DAY_MILLIS)
      if (isWeekend(date)) continue
      out.push({ date, type: 'prev', today: false })
    }
  }

  for (let counter = 0; counter < monthLength; counter++) {
    const date = new Date(monthOne.getTime() + counter * DAY_MILLIS)
    if (isWeekend(date)) continue
    const today = (TODAY.getDate() === date.getDate())
      && (TODAY.getMonth() === date.getMonth())
      && (TODAY.getFullYear() === date.getFullYear())
    out.push({ date, type: 'selectable', today })
  }

  for (let counter = 0; counter < 14; counter++) {
    const date = new Date(monthOne.getTime() + (monthLength + counter) * DAY_MILLIS)
    if (isWeekend(date)) continue
    out.push({ date, type: 'next', today: false })
  }

  return out.slice(0, 5 * 6)
})

function clickDate(date: DateType) {
  if (date.type === 'prev')
    emit('prevMonth')
  else if (date.type === 'next')
    emit('nextMonth')
  else
    emit('select', date.date)
}
</script>

<style scoped lang="scss">
.dates {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto repeat(var(--rows), 1fr);
  place-items: center;
  box-sizing: border-box;
  gap: 5pt;
  height: 100%;

  & > span {
    padding: 2pt 0 6pt 0;
    font-family: $font-major;
    font-size: 10pt;
    color: $color-minor;
  }

  & > div {
    background-color: $bg-dark;
    border-radius: 999pt;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    transition: all .2s ease-out;

    span {
      font-family: $font-major;
      font-size: 11pt;
      color: $color-major;
      user-select: none;
      cursor: inherit;
    }

    &[data-type="selectable"] {
      cursor: pointer;
    }

    &[data-type="prev"],
    &[data-type="next"] {
      opacity: .3;

      span {
        color: $color-minor;
      }
    }

    &[data-today=true] {
      background-color: $color-green40;

      span {
        color: $color-green;
      }
    }

    [view-mode=desktop] &[data-type="selectable"]:hover {
      background-color: $bg-darker;
    }
    [view-mode=desktop] &[data-type="selectable"][data-today=true]:hover {
      background-color: $color-green40;
    }
  }
}
</style>