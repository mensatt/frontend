<template>
  <template v-if="priceRaw">
    <div v-if="experiments.isEnabled('new_pills')" class="new">
      <Icon name="material-symbols:leaf-spark-rounded" />
      <span v-text="text" />
    </div>
    <div v-else class="old">
      <span v-text="text" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const experiments = useExperiments()

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
.old {
  height: $content-pills-height;
  background-color: $color-green40;
  border-radius: $dish-tag-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
  user-select: none;

  span {
    color: $color-green;
    font-family: $font-regular;
    font-size: 10pt;
  }
}


.new {
  height: $content-pills-height;
  background-color: $bg-dark;
  border-radius: $dish-tag-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25);
  user-select: none;

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
}
</style>
