<template>
  <header>
    <div>
      <h1>
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
      <div class="mensa">
        Techfak
      </div>
    </div>
    <div>
      <h2>Montag, 30. April</h2>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
header {
  margin: 0 0 calc($main-content-padding * 1) 0;
  padding: 0;
  background-color: $bg-lighter;

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div:last-child {
    display: flex;
    justify-content: left;
  }
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

h2 {
  font-family: $font-header;
  font-size: 20pt;
  margin: 0 $main-content-padding;
  display: flex;
  align-items: center;
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
