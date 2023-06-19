<template>
  <div class="popup" :data-dismissed="data.dismissed">
    <div class="curtain" @click="close(null)" />
    <div class="content" ref="outer" :data-scrolllock="scrollY === 0 && lengthY < 0">
      <div
        ref="inner"
        class="inner"
        :style="innerCss"
        :data-swiping="isSwiping"
      >
        <div class="handle">
          <div />
        </div>
        <div class="rendered">
          <component
            :is="rendered"
            :close="close"
            v-bind="data.data ?? {}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PopupInternally } from '../../utils/popups';

const { data } = defineProps<{
  data: PopupInternally
}>()

const emit = defineEmits([ 'destruct' ])

const rendered = PopupComponents[data.id]

function close(payload: any) {
  data.callback(payload)
  emit('destruct')
}

//

const inner = ref<HTMLElement | null>(null)
const outer = ref<HTMLElement | null>(null)

const containerHeight = computed(() => inner.value?.offsetHeight)
const screenHeight = computed(() => window.innerHeight)
const innerHeightClamped = computed(() => Math.min(containerHeight.value ?? 0, screenHeight.value * 0.8))

const { y: scrollY } = useScroll(outer)
let offsetOnScrollStart = 0

const { isSwiping, lengthY } = useSwipe(inner, {
  passive: true,
  threshold: 10,
  onSwipeStart() {
    offsetOnScrollStart = scrollY.value
  },
  onSwipeEnd() {
    if (-(lengthY.value + scrollY.value) > innerHeightClamped.value/4)
      close(null)
  }
})

const swipeOffset = computed(() => {
  if (!isSwiping.value) return '0px'
  if (lengthY.value >= 0) return '0px'
  if (scrollY.value > 0) return '0px'
  return `${-lengthY.value - offsetOnScrollStart}px`
})
const innerCss = computed(() => ({
  '--offset': swipeOffset.value,
  '--own-height-clamped': `${innerHeightClamped.value}px`
}))
</script>

<style scoped lang="scss">
.popup, .curtain, .content {
  display: block;
  position: absolute;
  inset: 0;
}

.popup {
  pointer-events: all;
}

[data-dismissed=true] {
  &, * { pointer-events: none !important; }
}

.curtain {
  background-color: #00000044;
  animation: curtain-in .2s ease-out 1;
  transition: background-color .2s ease;
  pointer-events: all;

  [data-dismissed=true] & {
    background-color: #00000000;
  }

  @keyframes curtain-in {
    from { background-color: #00000000; }
    to { background-color: #00000044; }
  }
}

.content {
  pointer-events: none;
  height: 100dvh;
  overflow-y: scroll;

  &[data-scrolllock=true] {
    overflow-y: visible;
  }
}

.inner {
  pointer-events: all;
  width: 100%;
  background-color: $bg-lighter;
  height: fit-content;
  min-height: 30vh;
  top: calc(100dvh - var(--own-height-clamped) + var(--offset));
  position: absolute;
  border-top-left-radius: 30pt;
  border-top-right-radius: 30pt;
  box-sizing: border-box;
  animation: inner-in .2s cubic-bezier(0, 0.55, 0.45, 1) 1;

  &[data-swiping=false] {
    transition: top .1s ease-out;
  }

  [data-dismissed=true] & {
    top: 100dvh;
    transition: top .2s cubic-bezier(0.11, 0, 0.5, 0);
  }

  @keyframes inner-in {
    from { top: 100dvh; }
    to { top: calc(100dvh - var(--own-height-clamped)); }
  }
}

.handle {
  display: flex;
  justify-content: center;
  padding: 15pt;

  div {
    display: block;
    width: 15vw;
    height: 3pt;
    border-radius: 99pt;
    background-color: $color-minor;
  }
}

.rendered {
  padding: 0 20pt 20pt 20pt;
}
</style>
