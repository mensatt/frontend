<template>
  <header>
    <h1>
      <img src="~/assets/img/logo.svg" alt="">
      Mensatt
    </h1>
    <div class="mensa">
      Techfak
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $bg-lighter;
}

h1 {
  font-family: $font-major;
  font-size: 11pt;
  margin: $main-content-padding;
  display: flex;
  align-items: center;
  line-height: 1em;

  img {
    width: 1.3em;
    height: 1.3em;
    margin-right: .4em;
  }
}

.mensa {
  display: grid;
  align-items: center;
  border: 1px solid $bg-dark;
  border-radius: 99pt;
  padding: 6pt 12pt;
  font-family: $font-major;
  font-size: 9pt;
  margin: 0 6pt;
}
</style>
