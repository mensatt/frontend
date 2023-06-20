<template>
  <div
    ref="swiper"
    class="pdr"
    :data-swiping="isSwiping"
  >
    <div class="pdr-spacer" :style="css" :data-ready="swipePercent >= 1">
      <!-- Placeholder for an icon-based visual communicator -->
      <span>Aktualisieren</span>
    </div>
    <slot />
  </div>  
</template>

<script setup lang="ts">
const props = defineProps<{
  enabled?: boolean
}>()
const emit = defineEmits([ 'refresh' ])

const swiper = ref<HTMLElement | null>(null)
const globalScroll = useGlobalScroll()
const globalScrollBlock = useGlobalScrollBlock()

const swipeValid = useState('index-swipe-valid', () => false)
const swipePercent = computed(() => -lengthY.value / (window.innerHeight / 4))

const { isSwiping, lengthY, direction } = useSwipe(swiper, {
  passive: true,
  threshold: 1,
  onSwipeStart() {
    swipeValid.value = false
  },
  onSwipeEnd() {
    // unblock scroll
    if (swipeValid.value)
      globalScrollBlock.value--
    else
      return

    if (swipePercent.value >= 1)
      emit('refresh')
  }
})

watch(direction, (dir) => {
  if (dir !== 'down') return
  if (globalScroll.value !== 0) return
  if (!props.enabled) return

  swipeValid.value = true
})

const css = computed(() => {
  const active = (isSwiping.value && swipeValid.value && lengthY.value < 0)
  const visualFriction = window.innerHeight / 3
  const visualOffset = Math.log10((-lengthY.value+visualFriction)/visualFriction)*visualFriction
  const height = active ? `${visualOffset}px` : '0'

  return { height, '--percent': Math.min(swipePercent.value, 1) }
})
</script>

<style scoped lang="scss">
.pdr[data-swiping=false] .pdr-spacer {
  transition: height .1s ease-out;
}

.pdr-spacer {
  display: grid;
  width: 100%;
  place-items: center;
  overflow: hidden;

  span {
    font-family: $font-regular;
    color: $color-regular;
    opacity: var(--percent);
    transform: scale(calc(0.8 + var(--percent)/5));
  }

  &[data-ready=true] span {
    color: $color-major;
    text-shadow: 0 0 1px $color-major;
    animation: pop .1s ease-out 1;
  }

  @keyframes pop {
    0% { transform: scale(1) }
    50% { transform: scale(1.05) }
    100% { transform: scale(1) }
  }
}
</style>
