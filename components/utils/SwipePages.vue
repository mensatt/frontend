<!-- THIS IS NOT WORKING AT ALL YET, MIGHT NEED A COMPLETELY DIFFERENT APPROACH :/ -->

<template>
  <div
    ref="swiper"
    class="sp"
    :data-swiping="isSwiping && swipeValid"
  >
    <slot name="active" />
  </div>
</template>

<script setup lang=ts>
const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits([ 'direction', 'percent' ])

const threshold = 50

const swiper = ref<HTMLElement | null>(null)
const globalScrollBlock = useGlobalScrollBlock()
const globalGestureTracked = useGlobalGestureTracked()

const swipeValid = useState('sp-swipe-valid', () => false)
const adjustToThreshold = useState('sp-adjust-threshold', () => 0)

const { isSwiping, lengthX, direction } = useSwipe(swiper, {
  passive: true,
  threshold,
  onSwipeStart() {
    swipeValid.value = false
  },
  onSwipeEnd() {
    if (!swipeValid.value)
      return

    // // unblock scroll and gestures
    // globalScrollBlock.value--
    // globalGestureTracked.value--
  }
})

const visualDistance = computed(() => {
  if (!isSwiping.value || !swipeValid.value)
    return 0

  return -lengthX.value + adjustToThreshold.value
})

const outDirection = computed(() => (lengthX.value - adjustToThreshold.value) > 0 ? 1 : -1)
watch(outDirection, (dir) => emit('direction', dir))

const outPercent = computed(() => (-visualDistance.value / (window?.innerWidth ?? 1)))
watch(outPercent, (per) => emit('percent', per))

watch(direction, (dir) => {
  // if (dir !== 'left' && dir !== 'right') return
  // if (props.disabled) return
  // if (swipeValid.value) return // swiping was already initialized
  // if (globalGestureTracked.value > 0) return // another gesture is already happening
  
  // globalGestureTracked.value++
  // globalScrollBlock.value++
  // swipeValid.value = true
  // adjustToThreshold.value = (lengthX.value < 0) ? -threshold : threshold
})
</script>

<style scoped lang="scss">
.sp {
  position: relative;
}
</style>

