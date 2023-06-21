<template>
  <div
    class="toggle"
    :data-disabled="!!disabled"
  >
    <span v-text="text" />
  </div>
</template>

<script setup lang=ts>
const props = defineProps<{
  text: string
  disabled?: boolean
}>()
</script>

<style scoped lang=scss>
.toggle {
  background-color: $color-green;
  width: 100%;
  box-sizing: border-box;
  padding: $menu-item-padding;
  cursor: pointer;

  & > * {
    color: #ffffff;
    font-family: $font-major;
    font-size: 10pt;
  }

  .nuxt-icon {
    font-size: 14pt;
  }

  &[data-disabled=true] {
    background-color: $bg-darker;
    cursor: not-allowed;
  }

  &[data-loading=true] {
    opacity: .6;
    cursor: not-allowed;
  }
}
</style>
