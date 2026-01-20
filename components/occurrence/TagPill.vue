<template>
  <div>
    <span v-if="data.shortName" class="icon" v-text="data.shortName" />
    <span v-text="data.name" />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const { data } = defineProps<{
  data: EntityOccurrence.Tag
}>()
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: $bg-dark;
  border-radius: $dish-tag-br;
  corner-shape: squircle;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25) calc($content-pills-height * 0.40);
  user-select: none;
}

.icon {
  color: $color-regular;
  font-family: $font-regular;
  font-size: 11pt;
  transform: translateX(calc($content-pills-height * -0.15));
}

span {
  color: $color-minor;
  font-family: $font-major;
  font-size: 9pt;
}
</style>
