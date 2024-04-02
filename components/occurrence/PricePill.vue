<template>
  <div v-if="experiments.isEnabled('new_pills')" :data-has-price="!!priceRaw" class="new">
    <Icon name="material-symbols:payments-outline-rounded" />
    <span v-text="`${formatters.formatPrice(priceRaw)}€`" />
  </div>
  <div v-else :data-has-price="!!priceRaw" class="old">
    <span v-text="`${formatters.formatPrice(priceRaw)}€`" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const experiments = useExperiments()

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const formatters = useFormatters()
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
</script>

<style scoped lang="scss">
.old {
  height: $content-pills-height;
  background-color: $color-blue40;
  border-radius: $dish-tag-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
  user-select: none;

  span {
    color: $color-blue;
    font-family: $font-regular;
    font-size: 10pt;

    [data-has-price=false] & {
      color: $color-blue40;
    }
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
    color: $color-blue;
    font-family: $font-regular;
    font-size: 16pt;
  }

  span {
    color: $color-blue;
    font-family: $font-major;
    font-size: 10pt;
    margin: 0 calc($content-pills-height * 0.15);

    [data-has-price=false] & {
      color: $color-blue40;
    }
  }
}
</style>
