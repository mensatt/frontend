<template>
  <div class="outer">
    <h2 v-text="title" />
    <OccurrenceList
      ref="activeList"
      :mensa="mensa.id"
      :date="date"
    />
  </div>
</template>

<script setup lang="ts">
const mensa = useSelectedLocation()
const i18n = useI18n()

const props = defineProps<{
  close: () => any,
  date: Date
}>()

const title = computed(() => props.date.toLocaleDateString(i18n.locale.value, {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}))
</script>

<style scoped lang="scss">
.outer {
  min-height: 85vh;
  margin: 0 -20pt;

  h2 {
    padding: 10pt 20pt;
    text-align: center;
    display: block;
  }
}
</style>
