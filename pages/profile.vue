<template>
  <Header :show-mensa="false" :fixed="true" :fixed-scrolling="true">
    <h2 v-text="$t('profile_header')" />
  </Header>

  <div class="inner">
    <div class="account">
      <div class="image">
        <NuxtIcon name="person_filled" />
      </div>
      <span class="name" v-text="$t('profile_guest_name')" />
      <span class="subtitle" v-text="$t('profile_guest_subtitle')" />
    </div>

    <h3 v-text="$t('settings_header')" />

    <label for="prices" v-text="$t('settings_price_header')" />
    <div class="prices">
      <div class="price" :data-selected="inputPrice === 'student'" @click="inputPrice = 'student'">
        <span>€</span>
        <span v-text="$t('settings_price_group1')" />
      </div>
      <div class="price" :data-selected="inputPrice === 'staff'" @click="inputPrice = 'staff'">
        <span>€€</span>
        <span v-text="$t('settings_price_group2')" />
      </div>
      <div class="price" :data-selected="inputPrice === 'guest'" @click="inputPrice = 'guest'">
        <span>€€€</span>
        <span v-text="$t('settings_price_group3')" />
      </div>
    </div>

    <label for="visual" v-text="$t('settings_visual_header')" />
    <div class="visual">
      <div class="option" @click="openLanguageSelector">
        <div>
          <span class="name" v-text="$t('settings_visual_language')" />
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedLanguage?.name" />
        <NuxtIcon :name="selectedLanguage?.icon ?? ''" filled />
      </div>
      <div class="option" @click="openThemeSelector">
        <div>
          <span class="name" v-text="$t('settings_visual_theme')" />
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedTheme?.name" />
        <NuxtIcon :name="selectedTheme?.icon ?? ''" />
      </div>
    </div>

    <label for="preferences" v-text="$t('settings_preferences_header')" />
    <div class="preferences">
      <UiToggle :text="$t('settings_preferences_hide_meat')" v-model="inputHideMeat" />
      <UiToggle :text="$t('settings_preferences_hide_fish')" v-model="inputHideFish" />
      <UiToggle :text="$t('settings_preferences_hide_gluten')" v-model="inputHideGluten" />
    </div>

    <label for="others" v-text="$t('settings_others_header')" />
    <div class="others">
      <UiToggle :text="$t('settings_others_devmode')" v-model="inputDevMode" />
      <div v-if="inputDevMode" class="option" @click="openBackendSelector">
        <div>
          <span class="name">Backend</span>
          <NuxtIcon name="right" />
        </div>
        <span class="selected" v-text="selectedBackend?.name" />
        <NuxtIcon :name="selectedBackend?.icon ?? ''" />
      </div>
      <NuxtLink v-if="inputDevMode" class="option" to="/dev/info">
        <div>
          <span class="name">Build Info</span>
        </div>
        <span class="selected" v-text="`v${version.version} (${version.revision.slice(0, 7)})`" />
        <NuxtIcon name="right" />
      </NuxtLink>
      <div v-if="inputDevMode" class="option" @click="devFullReload">
        <div>
          <span class="name">Full Reload (PWA)</span>
        </div>
        <span class="selected" v-text="''" />
        <NuxtIcon name="refresh" />
      </div>
    </div>

    <h3 v-text="$t('info_header')" />

    <UiExternLink :text="$t('info_privacy')" url="/privacy" />
    <UiExternLink :text="$t('info_credits')" url="/credits" />

    <div class="footer">
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

      <span>Copyright &copy; {{ new Date().getFullYear() }} Mensatt<br>v{{version.version}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const popups = usePopups()

const version = useVersion()

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
  text-decoration: none;
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