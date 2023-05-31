<template>
  <div class="tag">
    <span v-text="display" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../utils/entities/occurrence'

const props = defineProps<{
  data: EntityOccurrence.Tag
}>()

const display = props.data.shortName || props.data.name
</script>

<style scoped lang="scss">
.tag {
  height: $content-pills-height;
  background-color: $bg-dark;
  border-radius: 999pt;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.5);

  span {
    color: $color-regular;
    font-family: $font-major;
    font-size: 9pt;
  }
}
</style>
