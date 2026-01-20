<template>
  <div :data-count="props.count">
    <Icon name="material-symbols:star-rounded" />
    <span v-if="!!props.stars" v-text="`${props.stars.toPrecision(2)} / 5`" />
    <span v-else>- / 5</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stars: number
  count: number
}>()
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  // background-color: $bg-dark;
  background-color: color-mix(in srgb, $bg-lighter, $color-yellow 15%);
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
  color: $color-yellow;
  font-family: $font-regular;
  font-size: 16pt;
}

span {
  color: $color-yellow;
  font-family: $font-major;
  font-size: 10pt;
  margin: 0 calc($content-pills-height * 0.15);

  [data-count="0"] & {
    color: $color-yellow60;
  }
}
</style>
