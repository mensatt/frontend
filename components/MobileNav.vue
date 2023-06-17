<template>
  <nav>
    <NuxtLink
      v-for="tab of tabs"
      :key="tab.id"
      :to="tab.href"
    >
      <div class="icon">
        <NuxtIcon :name="tab.iconNormal" />
        <NuxtIcon :name="tab.iconActive" />
      </div>
      <span v-text="tab.name" />
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const tabs = [
  {
    id: 'today',
    name: 'Heute',
    href: '/',
    iconNormal: 'home_outline',
    iconActive: 'home_filled'
  },
  {
    id: 'calendar',
    name: 'Kalender',
    href: '/calendar',
    iconNormal: 'calendar_outline',
    iconActive: 'calendar_filled'
  },
  {
    id: 'profile',
    name: 'Profil',
    href: '/profile',
    iconNormal: 'person_outline',
    iconActive: 'person_filled'
  },
]

const active = 'today'
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

  span {
    font-size: 8.5pt;
    font-family: $font-major;
    line-height: 1em;
    color: $color-header;
  }

  .icon {
    position: relative;
    margin: 0;
    padding: 3pt 16pt;
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

  // &.router-link-active span {
  //   font-family: $font-header;
  // }

  &.router-link-active .icon {
    background-color: $color-green40;

    :first-child { display: none; }
    :last-child { display: unset; }
  }
}
</style>
