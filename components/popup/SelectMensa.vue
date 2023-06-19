<template>
  <div class="outer">
    <h2>Select Mensa</h2>
    <div class="options">
      <div
        v-for="opt of options"
        :key="opt.id"
        class="option"
        :data-selected="opt.id === current.id"
        @click="close(opt)"
      >
        <span v-text="opt.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityLocation } from '../../utils/entities/location'

const { close } = defineProps<{
  close: (mensa: EntityLocation.Location) => any,
  current: EntityLocation.Location
  options: EntityLocation.Location[]
}>()
</script>

<style scoped lang="scss">
.outer {
  color: black;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 5pt;
}

.option {
  background-color: #00000005;
  padding: 10pt;
  border-radius: 8pt;

  span {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-regular;
  }

  &[data-selected=true] {
    background-color: $color-green20;

    span {
      color: $color-major;
    }
  }
}
</style>
