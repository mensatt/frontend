<template>
  <div ref="imgEl" :style="{ aspectRatio }">
    <img :src="debouncedUrl" @load="onLoaded">
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

const api = useApi()

const loaded = ref(false)
function onLoaded() {
  if (loaded.value) return

  emit('loaded')
  loaded.value = true
}

const imgEl = ref<HTMLElement>()
const { width: realWidth, height: realHeight } = useElementSize(imgEl)

function getUrl(src: string) {
  const width = realWidth.value
  const height = props.dynamicHeight
    ? undefined
    : realHeight.value

  if (!width)
    return '#'

  return api.buildImageUrl(src, width, height)
}
const url = computed(() => getUrl(props.src))
const debouncedUrl = useDebounce(url, 1000)
</script>

<style scoped lang="scss">
div {
  width: 100%;
  height: 100%;
  position: relative;
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
