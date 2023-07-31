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
  for (let i = 1; i <= 5; i++) {
    if (i <= props.stars) out.push(1)
    else if (i <= props.stars + 1) out.push(props.stars % 1)
    else out.push(0)
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
