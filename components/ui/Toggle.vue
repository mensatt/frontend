<template>
  <div
    class="toggle"
    :data-active="modelValue"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span v-text="$t(text)" />
    <div class="button">
      <div class="inner" />
    </div>
  </div>
</template>

<script setup lang=ts>
defineProps<{
  text: string
  modelValue: boolean
}>()

const emit = defineEmits([ 'update:modelValue' ])
</script>

<style scoped lang=scss>
.toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  gap: $menu-item-padding;
  margin-bottom: $menu-item-margin;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;
  background-color: $bg-light;
  user-select: none;
  cursor: pointer;

  span {
    pointer-events: none;
    font-family: $font-major;
    font-size: 10pt;
    color: $color-minor;
    transition: color .2s ease;
  }

  .button {
    height: 20pt;
    margin: -10pt -3pt;
    width: 36pt;
    background-color: $bg-dark;
    border-radius: 999pt;
    transition: background-color .2s ease;

    .inner {
      width: 14pt;
      height: 14pt;
      border-radius: 999pt;
      background-color: $bg-darker;
      margin: 3pt;
      transition:
        background-color .2s ease,
        margin-left .2s ease;
    }
  }

  &[data-active=true] {
    span {
      color: $color-major;
    }

    .button {
      background-color: $color-green20;

      .inner {
        background-color: $color-green;
        margin-left: 18pt;
      }
    }
  }
}
</style>
