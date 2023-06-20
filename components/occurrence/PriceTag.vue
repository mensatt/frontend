<template>
  <div>
    <span v-text="text" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { data } = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const priceRaw = data.priceStudent
const price = (priceRaw === null)
  ? '-- '
  : (priceRaw / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const text = `${price}€`
// const text = `${price}€ (stud)`
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: #375aa52f;
  border-radius: 3pt;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
}

span {
  color: #375aa5;
  font-family: $font-major;
  font-size: 11pt;
}
</style>
