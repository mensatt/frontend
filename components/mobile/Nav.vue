<template>
  <nav ref="navEl">
    <NuxtLink
      v-for="tab of tabs"
      :key="tab.id"
      :to="localePath(tab.href)"
    >
      <div class="icon-wrapper">
        <Icon :name="tab.iconNormal" />
        <Icon :name="tab.iconActive" />
      </div>
      <span v-text="$t(tab.name)" />
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const tabs = [
  {
    id: 'home',
    name: 'nav_home',
    href: '/',
    iconNormal: 'material-symbols:home-outline-rounded',
    iconActive: 'material-symbols:home-rounded'
  },
  {
    id: 'calendar',
    name: 'nav_calendar',
    href: '/calendar',
    iconNormal: 'material-symbols:calendar-today-outline-rounded',
    iconActive: 'material-symbols:calendar-today-rounded'
  },
  {
    id: 'profile',
    name: 'nav_profile',
    href: '/profile',
    iconNormal: 'material-symbols:person-outline-rounded',
    iconActive: 'material-symbols:person-rounded'
  },
]

const navEl = ref<HTMLElement | null>(null)
const globalNavFullHeight = useGlobalNavFullHeight()
const { height } = useElementSize(navEl)
watch(height, val => (globalNavFullHeight.value = val))
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: $color-green20S;
  user-select: none;
  view-transition-name: header;
}

a {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  gap: 5pt;
  padding: 8pt 0;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;

  span {
    font-size: 8.5pt;
    font-family: $font-major;
    line-height: 1em;
    color: $color-header;
  }

  .icon-wrapper {
    position: relative;
    margin: 0;
    padding: 3pt 3pt;
    border-radius: 999pt;
    font-size: 14pt;
    height: 1em;
    width: 1em;

    .icon {
      position: absolute;
      color: $color-header;
      margin: 0;
      font-size: inherit;
    }

    .icon:last-child { display: none; }
  }

  &.router-link-active span {
    text-shadow: 0 0 0.5px #000000;
  }

  &.router-link-active .icon-wrapper {
    background-color: $color-green40;
    padding: 3pt 16pt;
    transition:
      background-color .3s cubic-bezier(0.16, 1, 0.3, 1),
      padding .3s cubic-bezier(0.16, 1, 0.3, 1);

    :first-child { display: none; }
    :last-child { display: unset; }
  }
}
</style>
