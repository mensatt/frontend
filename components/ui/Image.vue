<template>
  <div ref="imgEl" :style="{ aspectRatio }">
    <img :src="url" @load="onLoaded">
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** image id */
  src: string
  /** ratio */
  aspectRatio?: string
  /** will not specify the image height and just see how it goes */
  dynamicHeight?: boolean
}>()

const emit = defineEmits<{
  loaded: []
}>()

const loaded = ref(false)
function onLoaded() {
  if (loaded.value) return

  emit('loaded')
  loaded.value = true
}

const api = useApi()
const url = computed(() => api.buildImageUrl(props.src, document.body.clientWidth))

// const imgEl = ref<HTMLElement>()
// const { width: realWidth, height: realHeight } = useElementSize(imgEl)

// function getUrl(src: string) {
//   const width = realWidth.value
//   const height = props.dynamicHeight
//     ? undefined
//     : realHeight.value

//   if (!width)
//     return '#'

//   return api.buildImageUrl(src, width, height)
// }
// const url = computed(() => getUrl(srcCopy.value))
</script>

<style scoped lang="scss">
div {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  position: absolute;
  inset: 0;
}

.preload {
  opacity: 0;
  width: 1px;
  height: 1px;
}
</style>
