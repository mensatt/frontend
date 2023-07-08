<template>
  <div ref="parentEl" class="ht">
    <div>
      <div ref="tabsEl" class="tabs">
        <div
          v-for="tab, i of tabs"
          :key="tab.id"
          :style="{ '--active': (active === null) ? 0 : (1 - Math.min(1, Math.abs(active - i))) }"
          :data-seperator="tab.seperator && (i !== tabs.length-1)"
          @click="emit('select', i)"
        >
          <span v-text="tab.name" />
        </div>
      </div>

      <div class="indicator" :style="indicatorCss" />
    </div>
  </div>
</template>

<script setup lang="ts">
export type TabData = {
  id: string
  name: string
  seperator?: boolean
}

const props = defineProps<{
  tabs: TabData[]
  /** which element out of them is the active one. You may use decimals to smoothly transition */
  active: number | null
}>()

const emit = defineEmits([ 'select' ])

const tabsEl = ref<HTMLElement | null>(null)
const parentEl = ref<HTMLElement | null>(null)

function mix(a: number, b: number, ratio: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return min + (max-min) * ratio
}

// the computed value below will register this value as one of the inputs so updating this will force the computed to update too
// we need to update the computed manually here because we're making DOM changes in the onMounted() that are not reactive and thus are not detected by vue
const triggerUpdate = useState('horizontal-tabs--trigger', () => 0)

const indicatorCss = computed(() => {
  triggerUpdate.value;

  if (!parentEl.value) return {}
  if (!tabsEl.value) return {}
  if (props.active === null) return {}

  const scroll = parentEl.value.scrollLeft
  const parentBounds = parentEl.value.getBoundingClientRect()
  const lower = tabsEl.value.children[Math.floor(props.active)].getBoundingClientRect()
  const higher = tabsEl.value.children[Math.ceil(props.active)].getBoundingClientRect()
  const ratio = props.active % 1
  const padding = 13

  const left = mix(lower.left+padding, higher.left+padding, ratio) + scroll - parentBounds.left
  const width = mix(lower.width-padding*2, higher.width-padding*2, ratio)

  return {
    marginLeft: `${left}px`,
    width: `${width}px`
  }
})

onMounted(() => {
  if (!parentEl.value) return
  if (!tabsEl.value) return

  const firstEl = tabsEl.value.children[0].getBoundingClientRect()
  parentEl.value.scrollLeft = firstEl.width * 0.9

  for (const i of [ 10, 50, 100, 500, 1000 ])
    setTimeout(() => triggerUpdate.value++, i)
})
</script>

<style scoped lang="scss">
.ht {
  width: 100vw;
  height: 100%;
  overflow-x: scroll;
  
  & > div {
    height: 100%;
  }
}

.tabs {
  display: flex;
  width: fit-content;
  padding: 0 10pt;
  height: 100%;

  div {
    position: relative;
    padding: 10pt;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      font-family: $font-major;
      font-size: 11pt;
      color: $color-major;
      opacity: calc(0.7 + var(--active)*0.3);
      z-index: 10;
    }

    &[data-seperator=true] {
      margin-right: 10pt;
    }

    &[data-seperator=true]::after {
      content: '';
      position: absolute;
      right: -5pt;
      top: 10pt;
      height: calc(100% - 20pt);
      width: 1px;
      background-color: $bg-dark;
      pointer-events: none;
    }
  }
}

[view-mode="desktop"] .tabs div {
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc($main-content-padding/2);
    width: 100%;
    height: calc(100% - $main-content-padding);
    border-radius: 999pt;
    background-color: $bg-lighter;
    transition: .1s ease background-color;
  }

  &:hover:not(:focus)::before {
    background-color: $bg-dark;
  }
}

.indicator {
  margin-top: -3pt;
  height: 3pt;
  width: 0;
  background-color: $color-green;
  border-radius: 99pt 99pt 0 0;
  transition: all .1s ease-out;
}
</style>
