<template>
  <div class="outer">
    <h2 v-text="$t(title)" />
    <div class="options">
      <div
        v-for="opt of options"
        :key="opt.id"
        class="option"
        :data-selected="localSelected.has(opt.id)"
        @click.self="toggle(opt)"
      >
        <NuxtIcon :name="localSelected.has(opt.id) ? 'checkbox_checked' : 'checkbox_blank'" />
        <span class="name" v-text="skipNameT ? opt.name : $t(opt.name)" />
      </div>
    </div>
    <UiButton text="Save & Close" @click="close([ ...localSelected.values() ])" />
  </div>
</template>

<script setup lang="ts" generic="T extends string">
const props = defineProps<{
  close: (selected: T[]) => any,
  title: string
  options: ({
    id: T
    name: string
  })[]
  skipNameT?: boolean
  selected?: T[]
}>()

const localSelected = useState<Set<T>>(() => new Set([]))

onMounted(() => {
  if (props.selected)
    localSelected.value = new Set(props.selected)
})

function toggle(opt: { id: T }) {
  if (!opt) return
  if (localSelected.value.has(opt.id))
    localSelected.value.delete(opt.id)
  else
    localSelected.value.add(opt.id)
}
</script>

<style scoped lang="scss">
.outer {
  color: black;

  button {
    margin-top: $menu-item-padding !important;
  }
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
  grid-template-columns: auto 1fr;
  gap: $menu-item-padding;
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

  .nuxt-icon {
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

    .nuxt-icon {
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
