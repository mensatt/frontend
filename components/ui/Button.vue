<template>
  <button
    :disabled="!!disabled"
    :data-loading="!!loading"
    :data-secondary="secondary"
    :data-slim="slim"
    @click="click()"
  >
    <NuxtIcon v-if="loading" name="animated/loading" filled />
    <span v-else v-text="text" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  loading?: boolean
  disabled?: boolean
  secondary?: boolean
  slim?: boolean
  triggerWhileDisabled?: boolean
}>()

const emit = defineEmits([ 'click' ])

function click() {
  if (!props.disabled || props.triggerWhileDisabled)
    emit('click')
}
</script>

<style scoped lang="scss">
button {
  background-color: $color-green;
  text-align: center;
  width: 100%;
  border-radius: 999pt;
  border: none;
  outline: none;
  padding: 8pt 10pt;
  transition: background-color .1s ease;
  user-select: none;
  cursor: pointer;
  flex: 1 1;

  & > * {
    color: $bg-lighter;
    font-family: $font-major;
    font-size: 10pt;
  }

  .nuxt-icon {
    font-size: 14pt;
  }

  &:disabled {
    background-color: $bg-dark;
    cursor: not-allowed;

    * { color: $bg-darker; }
  }

  &[data-slim=false] {
    height: $menu-item-outer-height;
    padding: 0 $menu-item-padding;
  }

  &[data-loading=true] {
    opacity: .6;
    cursor: not-allowed;
  }

  &[data-secondary=true] {
    border: 1pt solid $bg-darker;
    background-color: transparent;

    * { color: $color-minor; }

    &[data-slim=true] { padding: 7pt 9pt; }

    &:disabled {
      background-color: transparent;
      opacity: .5;
      cursor: not-allowed;
    }
  }

  [view-mode=desktop] &:hover:not(:disabled) {
    background-color: $color-greenH;
  }

  [view-mode=desktop] &[data-secondary=true]:hover:not(:disabled) {
    background-color: $bg-dark;
  }
}
</style>
