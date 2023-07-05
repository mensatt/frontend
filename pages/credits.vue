<template>
  <Header :show-mensa="false" :fixed="true" :fixed-scrolling="true">
    <h2>Mitwirkende</h2>
  </Header>

  <div class="inner">
    <p>Mensatt &lt;3</p>
    <h3>Mensatt Core Team</h3>
    <p>- Tobias Gessler (Backend & Organization)</p>
    <p>- Louis Duemler (Backend & Infrastructure)</p>
    <p>- Kevin Kollenda (Scraper & Backend)</p>
    <p>- Benedikt Nerb (Frontend & Devops)</p>
    <p>- Andreas May (Frontend & Design)</p>

    <h3>Special Thanks</h3>
    <p>- Lars</p>
    <p>- Matthias</p>
    <p>- Freddi</p>
    <p>- Jannik</p>

    <h3>We use and love</h3>
    <p>- Nuxt, Vue & VueUse</p>
    <p>- Go & Gin</p>
    <p>- GraphQl</p>
    <p>- Spezi</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.inner {
  padding: $main-content-padding;
}

.inner > div {
  margin-bottom: $main-content-padding;
}

h2 {
  font-family: $font-header;
  font-size: 20pt;
  color: $color-header;
  margin: $main-content-padding;
  display: flex;
  align-items: center;
}

h3 {
  font-family: $font-header;
  font-size: 16pt;
  color: $color-header;
  padding: 0;
  margin: calc($main-content-padding*2) 0 $main-content-padding 0;
  display: flex;
  align-items: center;
}

p {
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-regular;
  margin: 3pt 0;
}
</style>
