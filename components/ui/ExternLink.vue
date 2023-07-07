<template>
  <NuxtLink class="external-link" :to="localePath(url)">
    <span v-text="$t(text)" />
    <NuxtIcon name="right" />
  </NuxtLink>
</template>

<script setup lang=ts>
defineProps<{
  text: string
  url: string
}>()

const localePath = useLocalePath()
</script>

<style scoped lang=scss>
.external-link {
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
  text-decoration: none;
  cursor: pointer;

  span {
    pointer-events: none;
    font-family: $font-major;
    font-size: 10pt;
    color: $color-major;
    transition: color .2s ease;
  }

  .nuxt-icon {
    font-size: 14pt;
    color: $color-sub;
    margin: -10pt 0;
  }
}
</style>
