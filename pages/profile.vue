<template>
  <HeaderTag>
    <h2 v-text="$t('profile_header')" />
  </HeaderTag>

  <PageContent>
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
      <UiSwitch
        :options="[
          { name: 'settings_price_group1', iconText: '€', value: 'student' },
          { name: 'settings_price_group2', iconText: '€€', value: 'staff' },
          { name: 'settings_price_group3', iconText: '€€€', value: 'guest' }
        ]"
        v-model="inputPrice"
      />
    </div>

    <label for="visual" v-text="$t('settings_visual_header')" />
    <div class="visual">
      <UiSelectable text="settings_visual_language" :iconFilled="true" :selected="selectedLanguage" @open="openLanguageSelector" />
      <UiSelectable text="settings_visual_theme" :selected="selectedTheme" @open="openThemeSelector" />
    </div>

    <label for="preferences" v-text="$t('settings_preferences_header')" />
    <div class="preferences">
      <UiToggle text="settings_preferences_hide_meat" v-model="inputHideMeat" />
      <UiToggle text="settings_preferences_hide_fish" v-model="inputHideFish" />
      <UiToggle text="settings_preferences_hide_gluten" v-model="inputHideGluten" />
    </div>

    <label for="others" v-text="$t('settings_others_header')" />
    <div class="others">
      <UiToggle :text="$t('settings_others_devmode')" v-model="inputDevMode" />
      <UiSelectable v-if="inputDevMode" text="settings_others_dev_backend" :selected="selectedBackend" @open="openBackendSelector" />
      <UiExternLink v-if="inputDevMode" text="settings_others_dev_app_info" url="/dev/info" />
      <UiSelectable v-if="inputDevMode" text="settings_others_dev_full_reload" :selected="{ name: '', icon: 'refresh' }" @open="devFullReload" />
    </div>

    <h3 v-text="$t('info_header')" />

    <UiExternLink text="info_privacy" url="/privacy" />
    <UiExternLink text="info_credits" url="/credits" />
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

    <div class="footer">
      <span>Copyright &copy; {{ new Date().getFullYear() }} Mensatt<br>v{{version.version}}</span>
    </div>
  </PageContent>
</template>

<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const popups = usePopups()
const version = useVersion()

const inputPrice = useSettingPrice()
const inputHideMeat = useSettingHideMeat()
const inputHideFish = useSettingHideFish()
const inputHideGluten = useSettingHideGluten()


//

const { locale, locales, setLocale } = useI18n()

const languageList = computed(() => {
  const list = locales.value as any as LocaleObject[]
  return list.map(l => ({
    id: l.code,
    name: l.name ?? '',
    icon: 'flag_' + l.code,
    iconFilled: true
  } as const))
})

const selectedLanguage = computed(() => languageList.value.find(search => (search.id === locale.value)))

async function openLanguageSelector() {
  const sel = await popups.open('select_option', {
    title: 'Sprache auswählen',
    options: [...languageList.value],
    selected: locale.value
  })
  if (sel)
    setLocale(sel)
}

//

const inputTheme = useSettingColorMode().store

const themeList = [
  { id: 'auto', name: 'theme_auto', icon: 'theme_auto' },
  { id: 'light', name: 'theme_light', icon: 'theme_light' },
  { id: 'dark', name: 'theme_dark', icon: 'theme_dark' },
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

.footer > span {
  display: block;
  margin: 30pt 0;
  text-align: center;
  font-family: $font-regular;
  color: $color-sub;
  font-size: 10pt;
}
</style>