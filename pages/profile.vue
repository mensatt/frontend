<template>
  <Header ref="header" :show-mensa="false" :fixed="true" :fixed-scrolling="true">
    <h2>Profil</h2>
  </Header>

  <div class="spacer" :style="{ height: `${headerHeight}px` }" />
  <div class="inner">
    <div class="account">
      <div class="image">
        <NuxtIcon name="person_filled" />
      </div>
      <span class="name">Gast</span>
      <span class="subtitle">Nicht angemeldet</span>
    </div>

    <h3>Einstellungen</h3>

    <label for="prices">Relevanter Preis</label>
    <div class="prices">
      <div class="price" :data-selected="inputPrice === 'student'" @click="inputPrice = 'student'">
        <span>€</span>
        <span>Studenten</span>
      </div>
      <div class="price" :data-selected="inputPrice === 'staff'" @click="inputPrice = 'staff'">
        <span>€€</span>
        <span>Mitarbeiter</span>
      </div>
      <div class="price" :data-selected="inputPrice === 'guest'" @click="inputPrice = 'guest'">
        <span>€€€</span>
        <span>Extern</span>
      </div>
    </div>

    <label for="languages">Sprache</label>
    <div class="languages">
      <div class="language" :data-selected="inputLanguage === 'de'" @click="inputLanguage = 'de'">
        <NuxtIcon name="flag_de" filled />
        <span>Deutsch</span>
      </div>
      <div class="language" :data-selected="inputLanguage === 'en'" @click="inputLanguage = 'en'">
        <NuxtIcon name="flag_gb" filled />
        <span>English</span>
      </div>
    </div>

    <label for="preferences">Gerichtspräferenzen</label>
    <div class="preferences">
      <UiToggle text="Fleisch ausblenden" />
      <UiToggle text="Fisch ausblenden" />
      <UiToggle text="Glutenhaltiges ausblenden" />
    </div>

    <label for="others">Sonstiges</label>
    <div class="others">
      <UiToggle text="Entwicklermodus" />
    </div>

    <h3>Information</h3>
    <p>Link to privacy policy</p>
    <p>Link to terms of service</p>
    <p>Mitwirkende / Authors</p>
    <p>Socials</p>
    <p>Copyright Mensatt</p>
  </div>
</template>

<script setup lang="ts">

const header = ref(null)
const { height: headerHeight } = useElementSize(header)

const inputPrice = useSettingPrice()
const inputLanguage = useSettingLanguage()

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
  margin: $main-content-padding;
  display: flex;
  align-items: center;
}

h3 {
  font-family: $font-header;
  font-size: 16pt;
  padding: 0;
  margin: calc($main-content-padding*2) 0 $main-content-padding 0;
  display: flex;
  align-items: center;
}

.account {
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
}

label {
  display: block;
  font-size: 10pt;
  font-family: $font-major;
  color: $color-sub;
  margin-bottom: $menu-item-margin;

  &[optional]::after {
    content: 'Optional';
    display: inline;
    margin-left: 5pt;
    font-size: 7pt;
    font-family: $font-major;
    padding: 1pt 5pt;
    background-color: $bg-light;
    color: #00000077;
    border-radius: 99pt;
  }
}

.prices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $menu-item-margin;
  border-radius: $menu-item-br;
  overflow: hidden;

  .price {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $menu-item-padding;
    background-color: $color-blue20;
    border-radius: 3pt;
    gap: 3pt;
    color: $color-blue;
    cursor: pointer;

    &[data-selected=true] {
      background-color: $color-blue;
      color: #ffffff;
    }

    span:first-child {
      font-size: 16pt;
      font-family: $font-major;
    }

    span:last-child {
      font-size: 8pt;
      font-family: $font-major;
    }
  }
}

.languages {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $menu-item-margin;
  border-radius: $menu-item-br;
  overflow: hidden;

  .language {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $menu-item-padding;
    background-color: $bg-light;
    border-radius: 3pt;
    gap: 3pt;
    color: $color-major;
    cursor: pointer;

    &[data-selected=true] {
      background-color: $bg-darker;
    }

    span:first-child {
      font-size: 16pt;
      font-family: $font-major;
    }

    span:last-child {
      font-size: 8pt;
      font-family: $font-major;
    }
  }
}
</style>