<template>
  <nav>
    <NuxtLink
      v-for="tab of tabs"
      :key="tab.id"
      :to="localePath(tab.href)"
    >
      <div class="icon">
        <NuxtIcon :name="tab.iconNormal" />
        <NuxtIcon :name="tab.iconActive" />
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
    iconNormal: 'home_outline',
    iconActive: 'home_filled'
  },
  {
    id: 'calendar',
    name: 'nav_calendar',
    href: '/calendar',
    iconNormal: 'calendar_outline',
    iconActive: 'calendar_filled'
  },
  {
    id: 'profile',
    name: 'nav_profile',
    href: '/profile',
    iconNormal: 'person_outline',
    iconActive: 'person_filled'
  },
]

const active = 'home'
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: $color-green20;
}

a {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  gap: 4pt;
  padding: 6pt 0;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;

  span {
    font-size: 8.5pt;
    font-family: $font-major;
    line-height: 1em;
    color: $color-header;
  }

  .icon {
    position: relative;
    margin: 0;
    padding: 3pt 3pt;
    border-radius: 999pt;
    font-size: 14pt;
    height: 1em;
    width: 1em;

    .nuxt-icon {
      position: absolute;
      color: $color-header;
      margin: 0;
      font-size: inherit;
    }

    .nuxt-icon:last-child { display: none; }
  }

  &.router-link-active span {
    text-shadow: 0 0 0.5px #000000;
  }

  &.router-link-active .icon {
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
