<template>
  <div>
    <UtilsStarIcon v-for="val of starValues" :percentage="val*100" />
    <span v-text="props.count" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stars: number
  count: number
}>()

const starValues = computed(() => {
  const out: number[] = []
  for (let i = 0; i < 5; i++) {
    if (props.stars < i) out.push(0)
    else if (props.stars > i+1) out.push(1)
    else out.push(props.stars % 1)
  }
  return out
})
</script>

<style scoped lang="scss">
div {
  height: $content-pills-height;
  background-color: $color-yellow40;
  border-radius: $card-item-br;
  width: fit-content;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: calc($content-pills-height * 0.25);
  user-select: none;
}

svg {
  height: calc($content-pills-height * 0.5);
}

span {
  color: $color-yellow;
  font-family: $font-major;
  font-size: 11pt;
  margin-left: calc($content-pills-height * 0.25);
  margin-right: calc($content-pills-height * 0.15);
}
</style>
