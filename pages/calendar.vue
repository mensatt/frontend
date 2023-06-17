<template>
  <div>
    <div class="header">
      <h2>Calendar</h2>
    </div>

    <span>Not done yet</span>

    <p>Hier kommt eine full-screen kalender seite um einen beliebigen tag anzuzeigen.</p>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: left;
  margin: 0 0 calc($main-content-padding * 1) 0;

  h2 {
    font-family: $font-header;
    font-size: 20pt;
    margin: 0 $main-content-padding;
    display: flex;
    align-items: center;
  }
}
</style>