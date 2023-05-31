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
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-family: $font-header;
  font-size: 18pt;
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
  padding: 10pt 16pt;
  font-family: $font-major;
  font-size: 9pt;
  margin: 0 10pt;
}
</style>
