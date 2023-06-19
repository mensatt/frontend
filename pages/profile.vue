<template>
  <div>
    <div class="header">
      <h2>Profile</h2>
    </div>

    <span>Not done yet</span>

    <p>Hier kommen folgende settings:</p>
    <p>- Studentenpreis / Mitarbeiterpreis / Extern</p>
    <p>- Sprache</p>
    <p>- Gerichtepräferenzen (z.B. veggie only -> alles mit fleisch wird ausgeblendet)</p>
    <p>- Tags hervorheben (z.B. "Glutenfrei" highligthen damit man es sofort sieht)</p>
    <p>- Developer mode (unter "advanced settings" o.ä.) (wenn aktiv zeig z.B. "dev.mensatt.de" und "localhost" in der mensaliste an + evtl weitere hidden features)</p>
    <p>Zusätzlich kommen hier buttons für socials (discord github mail) sowie links zu privacy policy und pipapo</p>
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