<template>
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
    <UiSelectable text="settings_visual_language" :iconFilled="true" :selected="selectedLanguage" :skip-value-t="true" @open="openLanguageSelector" />
    <UiSelectable text="settings_visual_theme" :selected="selectedTheme" @open="openThemeSelector" />
    <UiToggle text="settings_visual_show_calories" v-model="inputShowCalories" />
  </div>

  <label for="preferences" v-text="$t('settings_preferences_header')" />
  <div class="preferences">
    <UiToggle text="settings_preferences_hide_meat" v-model="inputHideMeat" />
    <UiToggle text="settings_preferences_hide_meat_dairy" v-model="inputHideMeatDairy" />
    <UiToggle text="settings_preferences_hide_fish" v-model="inputHideFish" />
    <UiToggle text="settings_preferences_hide_gluten" v-model="inputHideGluten" />
    <UiToggle text="settings_preferences_hide_lactose" v-model="inputHideLactose" />
  </div>

  <label for="others" v-text="$t('settings_others_header')" />
  <div class="others">
    <UiToggle text="settings_others_devmode" v-model="inputDevMode" />
    <UiSelectable v-if="inputDevMode" text="settings_others_dev_backend" :selected="selectedBackend" :skip-value-t="true" @open="openBackendSelector" />
    <UiExternLink v-if="inputDevMode" text="settings_others_dev_app_info" url="/dev/info" />
    <UiSelectable v-if="inputDevMode" text="settings_others_dev_full_reload" :selected="{ name: '', icon: 'refresh' }" :skip-value-t="true" @open="devFullReload" />
    <UiSelectable v-if="inputDevMode" text="settings_others_dev_experiments" :selected="{ name: `${inputDevExperiments.length} enabled`, icon: 'labs' }" :skip-value-t="true" @open="openExperimentMenu" />
    <UiToggle v-if="inputDevMode" text="settings_others_dev_show_ids" v-model="inputDevShowIds" />
  </div>
</template>


<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import { useThemes } from '../../utils/themes'

const popups = usePopups()

const inputPrice = useSettingPrice()
const inputHideMeat = useSettingHideMeat()
const inputHideMeatDairy = useSettingHideMeatDairy()
const inputHideFish = useSettingHideFish()
const inputHideGluten = useSettingHideGluten()
const inputHideLactose = useSettingHideLactose()
const inputShowCalories = useSettingShowCalories()

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
    title: 'settings_visual_language_select',
    options: [ ...languageList.value ],
    skipNameT: true,
    selected: locale.value
  })
  if (sel)
    setLocale(sel)
}

//

const inputTheme = useSettingColorMode().store

const themeList = useThemes().asChoicesList()

const selectedTheme = computed(() => themeList.find(search => (search?.id === inputTheme.value)))

async function openThemeSelector() {
  const sel = await popups.open('select_option', {
    title: 'settings_visual_theme_select',
    options: [ ...themeList ],
    selected: inputTheme.value
  })
  if (sel)
    setTimeout(() => (inputTheme.value = sel), 500)
}

//

const inputDevMode = useSettingDevMode()
const inputDevBackend = useSettingDevBackend()
const inputDevShowIds = useSettingDevShowIds()
const inputDevExperiments = useSettingDevExperiments()

const backendList = [
  { id: 'prod', name: 'api.mensatt.de (prod)', icon: 'rocket' },
  { id: 'dev', name: 'dev-api.mensatt.de (dev)', icon: 'labs' },
  { id: 'local', name: 'localhost:4000 (local)', icon: 'laptop' },
] as const

const selectedBackend = computed(() => backendList.find(search => (search.id === inputDevBackend.value)))

async function openBackendSelector() {
  const sel = await popups.open('select_option', {
    title: 'settings_others_dev_backend_select',
    options: [ ...backendList ],
    skipNameT: true,
    selected: inputDevBackend.value
  })

  if (sel) {
    inputDevBackend.value = sel
    devFullReload()
  }
}

const experiments = useExperiments()

async function openExperimentMenu() {
  const sel = await popups.open('toggle_options', {
    title: 'settings_others_dev_experiments',
    options: experiments.asChoicesList(),
    skipNameT: true,
    selected: inputDevExperiments.value
  })

  if (sel)
    inputDevExperiments.value = sel
}

function devFullReload() {
  location.reload()
}
</script>
