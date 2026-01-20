<template>
  <NuxtLink class="external-link ui-connect" :to="localePath(url)">
    <span v-text="$t(text)" />
    <Icon name="material-symbols:chevron-right-rounded" />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  url: string
}>()

const localePath = useLocalePath()
</script>

<style scoped lang="scss">
.external-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  gap: $menu-item-padding;
  margin-bottom: $menu-item-margin;
  padding: calc($menu-item-padding * 1.2);
  border-radius: $menu-item-br;
  background-color: $bg-light;
  text-decoration: none;
  user-select: none;
  cursor: pointer;

  span {
    pointer-events: none;
    font-family: $font-major;
    font-size: 10pt;
    color: $color-major;
    transition: color .2s ease;
  }

  .icon {
    font-size: 14pt;
    color: $color-sub;
    margin: -10pt 0;
  }

  .ui-connect ~ & {
    border-top-left-radius: $menu-item-br-connected;
    border-top-right-radius: $menu-item-br-connected;
  }

  &:has(~ .ui-connect) {
    border-bottom-left-radius: $menu-item-br-connected;
    border-bottom-right-radius: $menu-item-br-connected;
  }
}
</style>
