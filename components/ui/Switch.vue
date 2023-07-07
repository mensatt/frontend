<template>
  <div
    class="switch"
    :style="{ '--optcount': options.length }"
  >
    <div
      v-for="opt of options"
      :key="opt.value"
      class="option"
      :data-selected="modelValue === opt.value"
      @click="emit('update:modelValue', opt.value)"
    >
      <span v-if="opt.iconText" v-text="opt.iconText" />
      <NuxtIcon v-else-if="opt.iconName" :name="opt.iconName" />
      <span v-text="$t(opt.name)" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  options: {
    iconName?: string
    iconText?: string
    name: string
    value: T
  }[]
  modelValue: T
}>()

const emit = defineEmits([ 'update:modelValue' ])
</script>

<style scoped lang=scss>
.switch {
  display: grid;
  grid-template-columns: repeat(var(--optcount), 1fr);
  gap: $menu-item-margin;
  border-radius: $menu-item-br;
  overflow: hidden;
  width: 100%;
  user-select: none;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $menu-item-padding;
  background-color: $color-blue20;
  border-radius: 3pt;
  gap: 3pt;
  color: $color-blue;
  cursor: pointer;

  &[data-selected=true] {
    background-color: $color-blue;
    color: #ffffff;
  }
}

span:first-child {
  font-size: 16pt;
  font-family: $font-major;
}

span:last-child {
  font-size: 8pt;
  font-family: $font-major;
}
</style>
