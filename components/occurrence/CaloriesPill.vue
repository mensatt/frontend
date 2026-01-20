<template>
  <div v-if="priceRaw">
    <Icon name="material-symbols:leaf-spark-rounded" />
    <span v-text="text" />
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

const text = computed(() => `${Math.round(data.kcal / (priceRaw.value / 100))} kcal/€`)
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: color-mix(in srgb, $bg-lighter, $color-green 15%);
  border-radius: $dish-tag-br;
  corner-shape: squircle;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25);
  user-select: none;
}

.icon {
  color: $color-green;
  font-family: $font-regular;
  font-size: 16pt;
}

span {
  color: $color-green;
  font-family: $font-major;
  font-size: 10pt;
  margin: 0 calc($content-pills-height * 0.15);
}
</style>
