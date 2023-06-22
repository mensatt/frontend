<template>
  <div class="outer">
    <h2 v-text="title" />
    <div class="options">
      <div
        v-for="opt of options"
        :key="opt.id"
        class="option"
        :data-selected="opt.id === selected"
        @click.self="close(opt.id)"
      >
        <span class="name" v-text="opt.name" />
        <NuxtIcon v-if="opt.icon && opt.iconFilled" :name="opt.icon" filled />
        <NuxtIcon v-else-if="opt.icon" :name="opt.icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  close: (selected: T) => any,
  title: string
  options: {
    id: T
    name: string
    icon?: string
    iconFilled?: boolean
  }[]
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

  .name {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-regular;
    pointer-events: none;
  }

  .nuxt-icon {
    padding: 9pt;
    margin: -10pt;
    font-size: calc(1em + 2pt);
    color: $color-minor;
  }

  &[data-selected=true] {
    background-color: $color-green20;

    .name {
      color: $color-major;
    }

    .nuxt-icon:not([filled]) {
      color: $color-green;
    }
  }
}
</style>
