<template>
  <div>
    <span v-text="`${price}€`" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const settingPrice = useSettingPrice()

const priceRaw = computed(() => {
  if (settingPrice.value === 'student')
    return data.priceStudent
  if (settingPrice.value === 'staff')
    return data.priceStaff
  if (settingPrice.value === 'guest')
    return data.priceGuest
  return 0
})
const price = computed(() => {
  if (priceRaw === null)
    return '-- '
  
  return (priceRaw.value / 100)
    .toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )
})
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: $color-blue20;
  border-radius: 3pt;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
}

span {
  color: $color-blue;
  font-family: $font-major;
  font-size: 11pt;
}
</style>
