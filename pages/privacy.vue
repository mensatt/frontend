<template>
  <Header ref="header" :show-mensa="false" :fixed="true" :fixed-scrolling="true">
    <h2>Datenschutz&shy;erklärung</h2>
  </Header>

  <div class="spacer" :style="{ height: `${headerHeight}px` }" />
  <div class="inner">
    <p>Hier wird es bald eine Datenschutzerklärung geben...</p>
  </div>
</template>

<script setup lang="ts">
const header = ref(null)
const { height: headerHeight } = useElementSize(header)
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
}
</style>
