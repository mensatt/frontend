<template>
  <div>
    <span v-text="display" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { data } = defineProps<{
  data: EntityOccurrence.Tag
}>()

// const display = data.shortName || data.name
const display = data.name
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: $bg-dark;
  border-radius: $card-item-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);
  user-select: none;
}

span {
  color: $color-minor;
  font-family: $font-major;
  font-size: 9pt;
}
</style>
