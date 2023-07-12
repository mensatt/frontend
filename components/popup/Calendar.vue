<template>
  <div class="outer">
    {{ selectedMonth }}
    <UtilsDatePicker
      :month="selectedMonth"
      @next-month="selectedMonth++"
      @prev-month="selectedMonth--"
      @select=""
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  close: (success: boolean) => any,
}>()

const selectedMonth = useState('calendar-popup--sel-month', () => new Date().getMonth())
</script>

<style scoped lang="scss">
.outer {
  height: 350px;
}
</style>
