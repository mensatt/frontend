<template>
  <div
    v-if="!hide"
    class="header-tag"
    :style="{ top: `${globalHeaderHeight}px` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ViewMode } from '../composables/view'

const globalHeaderHeight = useGlobalHeaderHeight()
const viewMode = useViewMode()

const props = defineProps<{
  hideOnViewModes?: ViewMode[]
}>()

const hide = computed(() => props.hideOnViewModes?.includes(viewMode.value))
</script>

<style scoped lang="scss">
.header-tag {
  position: sticky;
  top: 0;
  z-index: 200;
  background-color: $bg-lighter;
  border-bottom: 1px solid $bg-dark;
  view-transition-name: header-tag;

  [view-mode=desktop] & {
    border: none;
    margin-bottom: calc(-1 * $main-content-padding);
    position: relative;
    top: 0 !important;
  }
}
</style>
