<template>
  <div
    class="selectable"
    @click="emit('open')"
  >
    <div>
      <span class="name" v-text="$t(text)" />
      <NuxtIcon name="right" />
    </div>

    <span class="selected" v-text="selected ? $t(selected.name) : ''" />

    <NuxtIcon v-if="iconFilled" :name="selected?.icon ?? ''" filled />
    <NuxtIcon v-else :name="selected?.icon ?? ''" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  iconFilled?: boolean
  selected: {
    readonly name: string
    readonly icon: string
  } | null | undefined
}>()

const emit = defineEmits([ 'open' ])
</script>

<style scoped lang=scss>
.selectable {
  display: grid;
  grid-template-columns: 1fr auto auto;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: $menu-item-padding;
  margin-bottom: $menu-item-margin;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;
  background-color: $bg-light;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
}

span {
  pointer-events: none;
}

.selectable > div .nuxt-icon {
  margin-left: 2pt;
}

.name {
  font-family: $font-major;
  font-size: 10pt;
  color: $color-major;
}

.selected {
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-sub;
}

.nuxt-icon {
  font-size: 12pt;
  color: $color-sub;
}
</style>
