<template>
  <img ref="imgEl" :src="url">
</template>

<script setup lang="ts">
const props = defineProps<{
  /** image id */
  src: string
  /** will not specify the image height and just see how it goes */
  dynamicHeight?: boolean
}>()

const granularity = 100

const api = useApi()
const experiments = useExperiments()

const imgEl = ref<HTMLElement>()
const { width: realWidth, height: realHeight } = useElementSize(imgEl)

const widthMin = ref(0)
const computedWidth = computed(() => Math.max(widthMin.value, Math.ceil(realWidth.value / granularity) * granularity))
watch(computedWidth, val => (widthMin.value = val))

const heightMin = ref(0)
const computedHeight = computed(() => Math.max(heightMin.value, Math.ceil(realHeight.value / granularity) * granularity))
watch(computedHeight, val => (heightMin.value = val))

const url = computed(() => {
  const width = computedWidth.value
  const height = props.dynamicHeight
    ? undefined
    : computedHeight.value

  if (!width)
    return '#'

  if (experiments.isEnabled('show_ref_images'))
    return `https://dummyimage.com/${width ?? 999}x${height ?? 999}`
  return api.getImageServingUrl(props.src, { width, height })
})
</script>
