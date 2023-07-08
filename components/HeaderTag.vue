<template>
  <div class="header-tag" :style="{ top: `${globalHeaderHeight}px` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const globalHeaderHeight = useGlobalHeaderHeight()
</script>

<style scoped lang="scss">
.header-tag {
  position: sticky;
  top: 0;
  z-index: 200;
  background-color: $bg-lighter;
  border-bottom: 1px solid $bg-dark;
  view-transition-name: header-tag;
}
</style>
