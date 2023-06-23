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

    <!-- <label for="languages">Sprache</label>
    <div class="languages">
      <div class="language" :data-selected="inputLanguage === 'de'" @click="inputLanguage = 'de'">
        <NuxtIcon name="flag_de" filled />
        <span>Deutsch</span>
      </div>
      <div class="language" :data-selected="inputLanguage === 'en'" @click="inputLanguage = 'en'">
        <NuxtIcon name="flag_gb" filled />
        <span>English</span>
      </div>
    </div> -->

    <label for="visual">Anzeige</label>
    <div class="visual">
      <div class="option" @click="openLanguageSelector">
        <div>
          <span class="name">Sprache</span>
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedLanguage?.name" />
        <NuxtIcon :name="selectedLanguage?.icon ?? ''" filled />
      </div>
      <div class="option" @click="openThemeSelector">
        <div>
          <span class="name">Farbschema</span>
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedTheme?.name" />
        <NuxtIcon :name="selectedTheme?.icon ?? ''" />
      </div>
    </div>

    <label for="preferences">Gerichtspräferenzen</label>
    <div class="preferences">
      <UiToggle text="Fleischgerichte ausblenden" v-model="inputHideMeat" />
      <UiToggle text="Fischgerichte ausblenden" v-model="inputHideFish" />
      <UiToggle text="Glutenhaltiges ausblenden" v-model="inputHideGluten" />
    </div>

    <label for="others">Sonstiges</label>
    <div class="others">
      <UiToggle text="Entwicklermodus" v-model="inputDevMode" />
      <div v-if="inputDevMode" class="option" @click="openBackendSelector">
        <div>
          <span class="name">Backend</span>
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedBackend?.name" />
        <NuxtIcon :name="selectedBackend?.icon ?? ''" />
      </div>
      <div v-if="inputDevMode" class="option" @click="devFullReload">
        <div>
          <span class="name">Full Reload (PWA)</span>
        </div>
        <span class="selected" v-text="''" />
        <NuxtIcon name="refresh" />
      </div>
    </div>

    <h3>Information</h3>

    <UiExternLink text="Privacy Policy" url="/privacy" />
    <!-- <UiExternLink text="Terms of Service" url="/terms" /> -->
    <UiExternLink text="Mitwirkende" url="/credits" />

    <div class="footer">
      <!-- SOCIALS -->
      <div class="socials">
        <NuxtLink to="https://discord.gg/wjeYsQQQ3R" target="_blank" class="social">
          <NuxtIcon name="brands/discord" />
        </NuxtLink>
        <NuxtLink to="https://github.com/mensatt" target="_blank" class="social">
          <NuxtIcon name="brands/github" />
        </NuxtLink>
        <NuxtLink href="mailto:hello@mensatt.de" target="_blank" class="social">
          <NuxtIcon name="brands/mail" />
        </NuxtLink>
      </div>
      <span>Copyright &copy; {{ new Date().getFullYear() }} Mensatt</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const popups = usePopups()

const header = ref(null)
const { height: headerHeight } = useElementSize(header)

const inputPrice = useSettingPrice()

const inputHideMeat = useSettingHideMeat()
const inputHideFish = useSettingHideFish()
const inputHideGluten = useSettingHideGluten()


//

const inputLanguage = useSettingLanguage()

const languageList = [
  { id: 'de', name: 'Deutsch', icon: 'flag_de', iconFilled: true },
  { id: 'en', name: 'English', icon: 'flag_gb', iconFilled: true },
] as const

const selectedLanguage = computed(() => languageList.find(search => (search.id === inputLanguage.value)))

async function openLanguageSelector() {
  const sel = await popups.open('select_option', {
    title: 'Sprache auswählen',
    options: [...languageList],
    selected: inputLanguage.value
  })
  if (sel)
    inputLanguage.value = sel
}

//

const inputTheme = useSettingColorMode().store

const themeList = [
  { id: 'auto', name: 'Automatisch', icon: 'theme_auto' },
  { id: 'light', name: 'Hell', icon: 'theme_light' },
  { id: 'dark', name: 'Dunkel', icon: 'theme_dark' },
] as const

const selectedTheme = computed(() => themeList.find(search => (search.id === inputTheme.value)))

async function openThemeSelector() {
  const sel = await popups.open('select_option', {
    title: 'Farbschema auswählen',
    options: [...themeList],
    selected: inputTheme.value
  })
  if (sel)
    setTimeout(() => (inputTheme.value = sel), 500)
}

//

const inputDevMode = useSettingDevMode()
const inputDevBackend = useSettingDevBackend()

const backendList = [
  { id: 'prod', name: 'api.mensatt.de (prod)', icon: 'rocket' },
  { id: 'dev', name: 'dev-api.mensatt.de (dev)', icon: 'labs' },
  { id: 'local', name: 'localhost:4000 (local)', icon: 'laptop' },
] as const

const selectedBackend = computed(() => backendList.find(search => (search.id === inputDevBackend.value)))

async function openBackendSelector() {
  const sel = await popups.open('select_option', {
    title: 'Select Backend',
    options: [...backendList],
    selected: inputDevBackend.value
  })
  if (sel)
    inputDevBackend.value = sel
}

function devFullReload() {
  location.reload()
}
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

.option {
  display: grid;
  grid-template-columns: 1fr auto auto;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: $menu-item-padding;
  margin-bottom: $menu-item-margin;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;
  background-color: $bg-light;
  cursor: pointer;

  span {
    pointer-events: none;
  }

  & > div .nuxt-icon {
    margin-left: 2pt;
  }

  .name {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-major;
  }

  .selected {
    font-family: $font-regular;
    font-size: 10pt;
    color: $color-sub;
  }

  .nuxt-icon {
    font-size: 12pt;
    color: $color-sub;
  }
}

.footer {
  .socials {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: $menu-item-margin;
    
    .social {
      background-color: $bg-light;
      border-radius: $menu-item-br;
      padding: $menu-item-padding;
      display: grid;
      place-items: center;
      color: $color-major;
    }
  }

  & > span {
    display: block;
    margin: 30pt 0;
    text-align: center;
    font-family: $font-regular;
    color: $color-sub;
    font-size: 10pt;
  }
}
</style>