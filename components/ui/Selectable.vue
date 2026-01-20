<template>
  <div
    class="selectable ui-connect"
    @click="emit('open')"
  >
    <div>
      <span class="name" v-text="$t(text)" />
      <Icon name="material-symbols:chevron-right-rounded" />
    </div>

    <span class="selected" v-text="selected ? (skipValueT ? selected.name : $t(selected.name)) : ''" />

    <Icon v-if="iconFilled" :name="selected?.icon ?? ''" filled />
    <Icon v-else :name="selected?.icon ?? ''" />
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
  /** skips localizing the value -> value will get shown without $t function call */
  skipValueT?: boolean
}>()

const emit = defineEmits([ 'open' ])
</script>

<style scoped lang="scss">
.selectable {
  display: grid;
  grid-template-columns: 1fr auto auto;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: $menu-item-padding;
  margin-bottom: $menu-item-margin;
  padding: calc($menu-item-padding * 1.2);
  border-radius: $menu-item-br;
  background-color: $bg-light;
  text-decoration: none;
  user-select: none;
  cursor: pointer;

  .ui-connect ~ & {
    border-top-left-radius: $menu-item-br-connected;
    border-top-right-radius: $menu-item-br-connected;
  }

  &:has(~ .ui-connect) {
    border-bottom-left-radius: $menu-item-br-connected;
    border-bottom-right-radius: $menu-item-br-connected;
  }
}

span {
  pointer-events: none;
}

.selectable > div .icon {
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

.icon {
  font-size: 12pt;
  color: $color-sub;
}
</style>
