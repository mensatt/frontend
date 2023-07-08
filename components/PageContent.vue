<template>
  <div class="page-content" :data-no-padding="noPadding ?? false">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  noPadding?: boolean
}>()
</script>

<style scoped lang="scss">
.page-content {
  view-transition-name: main-content;

  &[data-no-padding=false] {
    padding: $main-content-padding;

    & > div {
      margin-bottom: $main-content-padding;
    }
  }
}
</style>
