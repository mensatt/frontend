<template>
  <header>
    <NuxtLink to="/">
      <h1>
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
    </NuxtLink>

    <UtilsRelativeDateSelect v-model="activeDate" :days-count="6" />

    <!-- TODO button for date select dropdown (calendar) -->
    <!-- TODO button for profile / settings -->
  </header>
</template>

<script setup lang="ts">
const activeDate = useGlobalSelectedDate()
</script>

<style scoped lang="scss">
header {
  background-color: $bg-lighter;
  z-index: 10;
  width: 100%;
  user-select: none;
  view-transition-name: header-main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $global-header-height;
  border-bottom: 1px solid $bg-dark;

  a {
    text-decoration: none;
  }
}

h1 {
  font-family: $font-major;
  font-size: 11pt;
  color: $color-major;
  margin: calc($main-content-padding/2);
  padding: calc($main-content-padding/2) $main-content-padding;
  border-radius: 999pt;
  display: flex;
  align-items: center;
  line-height: 1em;
  background-color: $color-green20;
  transition: .1s ease background-color;
  cursor: pointer;

  img {
    width: 1.3em;
    height: 1.3em;
    margin-right: .4em;
  }

  a:hover > & {
    background-color: $color-green40;
  }
}
</style>
