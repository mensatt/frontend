<template>
  <div
    ref="swiper"
    class="sp"
  >
    <slot name="active" />
  </div>
</template>

<script setup lang=ts>
const props = defineProps<{
  enabled?: boolean
}>()

const threshold = 50

const swiper = ref<HTMLElement | null>(null)

const { isSwiping, lengthX, direction } = useSwipe(swiper, {
  passive: true,
  threshold,
})

watch(direction, (dir) => {
  if (dir !== 'left' && dir !== 'right') return
  if (props.enabled === false) return

})
</script>
