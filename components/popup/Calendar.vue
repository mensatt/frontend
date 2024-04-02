<template>
  <div class="outer">
    <div class="months">
      <button @click="selectedMonth--">
        <Icon name="material-symbols:chevron-left-rounded" />
      </button>
      <h2
        class="title"
        @click="selectedMonth = new Date().getMonth()"
        v-text="monthName"
      />
      <button @click="selectedMonth++">
        <Icon name="material-symbols:chevron-right-rounded" />
      </button>
    </div>
    <div class="dates">
      <UtilsDatePicker
        :month="selectedMonth"
        :selected="globalSelectedDate"
        @next-month="selectedMonth++"
        @prev-month="selectedMonth--"
        @select="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
const globalSelectedDate = useGlobalSelectedDate()

defineProps<{
  close: (sel: Date) => any,
}>()

const selectedMonth = useState('calendar-popup--sel-month', () => new Date().getMonth())

const monthName = computed(() => {
  let year = new Date().getFullYear()
  let month = selectedMonth.value
  while (month >= 12) {
    month -= 12
    year++
  }
  while (month < 0) {
    month += 12
    year--
  }
  return `${i18n.t('month_' + month)} ${year}`
})
</script>

<style scoped lang="scss">
.dates {
  height: 300px;
}

.months {
  display: flex;
  justify-content: space-between;
  margin-bottom: calc($main-content-padding * 2);
  gap: $menu-item-margin;
  height: 25pt;
  padding: $menu-item-padding;
  border: 1px solid $bg-dark;
  border-radius: $menu-item-br;

  h2 {
    margin: 0;
    color: $color-green;
    font-size: 14pt;
    text-align: center;
    justify-content: center;
    border-radius: 99pt;
    cursor: pointer;
    transition: color .1s ease;

    &:hover {
      color: $color-greenH;
    }
  }

  button {
    aspect-ratio: 1;
    color: $bg-lighter;
    background-color: $color-green;
    border: none;
    outline: none;
    border-radius: 99pt;
    font-size: 18pt;
    cursor: pointer;
    transition: background-color .1s ease;

    &:hover {
      background-color: $color-greenH;
    }
  }
}
</style>
