<template>
  <div>
    <div class="header">
      <h2>Profile</h2>
    </div>

    <span>Not done yet</span>

    <p>Hier kommen folgende settings:</p>
    <p>- Studentenpreis / Mitarbeiterpreis / Extern</p>
    <p>- Gerichtepräferenzen (z.B. veggie only -> alles mit fleisch wird ausgeblendet)</p>
    <p>- Tags hervorheben (z.B. "Glutenfrei" highligthen damit man es sofort sieht)</p>
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