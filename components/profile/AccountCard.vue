<template>
  <div class="account-card">
    <div class="image">
      <NuxtIcon name="person_filled" />
    </div>
    <span class="name" v-text="$t('profile_guest_name')" />
    <span class="subtitle" v-text="$t('profile_guest_subtitle')" />
    <div v-if="false" class="buttons">
      <UiButton :text="$t('register')" :slim="true" :secondary="true" />
      <UiButton :text="$t('login')" :slim="true" />
    </div>
  </div>
</template>

<script setup lang=ts>
// const experiments = useExperiments()
</script>

<style scoped lang="scss">
.account-card {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto auto 1fr;
  column-gap: $main-content-padding;
  row-gap: 2pt;

  .image {
    width: 60pt;
    height: 60pt;
    background-color: $bg-dark;
    border-radius: 99pt;
    display: grid;
    place-items: center;
    font-size: 30pt;
    color: $color-minor;
    grid-row: 1 / span 4;
  }

  .name {
    font-family: $font-major;
    font-size: 16pt;
    color: $color-major;
    grid-row: 2;
  }

  .subtitle {
    font-family: $font-regular;
    font-size: 10pt;
    color: $color-sub;
    grid-row: 3;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $menu-item-margin;
    margin-top: $main-content-padding;
    grid-column: 1 / span 2;
  }
}
</style>
