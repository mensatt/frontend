<template>
  <div>
    <span v-text="`${price}€`" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'
import {formatPrice} from "~/utils/price";

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
  return null
})

const price = computed(() => {
  return formatPrice(priceRaw.value)
})
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: $color-blue20;
  border-radius: $card-item-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
  user-select: none;
}

span {
  color: $color-blue;
  font-family: $font-major;
  font-size: 11pt;
}
</style>
