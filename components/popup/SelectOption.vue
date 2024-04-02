<template>
  <div class="outer">
    <h2 v-text="$t(title)" />
    <div class="options">
      <div
        v-for="opt, i of options"
        :key="opt ? opt.id : i-100"
        class="option"
        :data-selected="opt ? (opt.id === selected) : false"
        :data-divider="opt === null"
        @click.self="opt ? close(opt.id) : {}"
      >
        <span v-if="opt" class="name" v-text="skipNameT ? opt.name : $t(opt.name)" />
        <Icon v-if="opt && opt.icon && opt.iconFilled" :name="opt.icon" filled />
        <Icon v-else-if="opt && opt.icon" :name="opt.icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  close: (selected: T) => any,
  title: string
  options: ({
    id: T
    name: string
    icon?: string
    iconFilled?: boolean
  } | null)[]
  skipNameT?: boolean
  selected?: T
}>()
</script>

<style scoped lang="scss">
.outer {
  color: black;
}

.options {
  display: flex;
  flex-direction: column;
  gap: $menu-item-margin;
}

.option {
  background-color: $bg-light;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;
  display: grid;
  grid-template-columns: 1fr auto;
  transition: background-color .1s ease;
  cursor: pointer;

  &[data-divider=true] {
    cursor: default;
    padding: 0;
    height: calc($menu-item-padding*2 - $menu-item-margin);
    background-color: transparent;
  }

  .name {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-regular;
    pointer-events: none;
    user-select: none;
  }

  .icon {
    padding: 9pt;
    margin: -10pt;
    font-size: calc(1em + 2pt);
    color: $color-minor;
    user-select: none;
  }

  &[data-selected=true] {
    background-color: $color-green20;

    .name {
      color: $color-major;
    }

    .icon:not([filled]) {
      color: $color-green;
    }
  }

  [view-mode=desktop] &[data-selected=true][data-divider=false]:hover {
    background-color: $color-green40;
  }

  [view-mode=desktop] &[data-selected=false][data-divider=false]:hover {
    background-color: $bg-dark;
  }
}
</style>
