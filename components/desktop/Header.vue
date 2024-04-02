<template>
  <header>
    <NuxtLink to="/" @click="resetActiveDate()">
      <h1>
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
    </NuxtLink>

    <div ref="relDateSelectOuterEl" class="dates">
      <UtilsRelativeDateSelect
        ref="relDateSelectInnerEl"
        v-model="selectedDay"
        :days-count="6"
        :show-calendar="true"
        @click="gotoIndex()"
        @open-calendar="clickCalendar()"
      />
    </div>

    <div class="spacer" />

    <div ref="mensaButtonEl" class="location" @click="clickMensa()">
      {{ selectedLocation.name }}
    </div>

    <div ref="profileButtonEl" class="profile" @click="clickProfile()">
      <Icon name="material-symbols:person-2-outline-rounded" />
      {{ $t('desktop_profile') }}
    </div>
  </header>
</template>

<script setup lang="ts">
const selectedDay = useState<number | null>(() => 1)
const router = useRouter()
const selectedLocation = useSelectedLocation()
const popups = usePopups()
const globalSelectedDate = useGlobalSelectedDate()

const relDateSelectOuterEl = ref<HTMLElement | null>(null)
const relDateSelectInnerEl = ref<HTMLElement | null>(null)
const mensaButtonEl = ref<HTMLElement | null>(null)
const profileButtonEl = ref<HTMLElement | null>(null)

//

const route = useRoute()
watch(route, (val) => {
  if (val.name !== 'index')
    selectedDay.value = null
  else if (selectedDay.value === null)
    selectedDay.value = 1
})

function resetActiveDate() {
  selectedDay.value = 1
}

function gotoIndex() {
  if (route.name === 'index')
    return
  router.push({ path: '/' })
}

//

async function clickCalendar() {
  const elPos = relDateSelectOuterEl.value?.getBoundingClientRect()
  const popupPos = elPos ? {
    top: elPos.bottom + 5,
    left: elPos.right - 300,
    width: 450
  } : undefined

  const date = await popups.open('calendar', {}, popupPos)
  if (!date) return

  if (!relDateSelectInnerEl.value) return
  const rds = relDateSelectInnerEl.value as any
  const index = rds.indexOfDate(date)

  selectedDay.value = (index === -1) ? 6 : index
  globalSelectedDate.value = date
}

async function clickMensa() {
  const elPos = mensaButtonEl.value?.getBoundingClientRect()
  const popupPos = elPos ? {
    top: elPos.bottom + 5,
    right: window.innerWidth - elPos.right,
    width: 350
  } : undefined

  const options = useLocationList().value
  const mensa = await popups.open('select_mensa', {
    current: selectedLocation.value,
    options
  }, popupPos)
  if (mensa)
    selectedLocation.value = mensa
}

function clickProfile() {
  const elPos = profileButtonEl.value?.getBoundingClientRect()
  const popupPos = elPos ? {
    top: elPos.bottom + 5,
    right: window.innerWidth - elPos.right,
    width: 350
  } : undefined

  popups.open('profile_settings', {}, popupPos)
}
</script>

<style scoped lang="scss">
header {
  background-color: $bg-lighter;
  z-index: 10;
  width: 100%;
  user-select: none;
  view-transition-name: header-main;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  height: $global-header-height;
  border-bottom: 1px solid $bg-dark;

  a {
    text-decoration: none;
  }
}

h1 {
  font-family: $font-major;
  font-size: 11pt;
  color: $color-major;
  margin: calc($main-content-padding/2);
  padding: calc($main-content-padding/2) $main-content-padding;
  border-radius: 999pt;
  display: flex;
  align-items: center;
  line-height: 1em;
  background-color: $color-green20;
  transition: .1s ease background-color;
  cursor: pointer;

  img {
    width: 1.3em;
    height: 1.3em;
    margin-right: .4em;
  }

  a:hover > & {
    background-color: $color-green40;
  }
}

.spacer {
  flex: 1 1 0%;
}

.dates {
  width: 30pt;
  max-width: fit-content;
  flex: 1 1 100%;
}

.location, .profile {
  font-family: $font-major;
  font-size: 9pt;
  color: $color-sub;
  margin: calc($main-content-padding/2);
  padding: calc($main-content-padding/2) $main-content-padding;
  border-radius: 999pt;
  display: flex;
  align-items: center;
  line-height: 1em;
  border: 1px solid $bg-dark;
  gap: calc($main-content-padding/2);
  cursor: pointer;
  transition:
    background-color .1s ease,
    color .1s ease;

  &:hover {
    background-color: $bg-light;
    color: $color-major;
  }

  .icon {
    font-size: 1.3em;
    margin: -.2em;
  }
}
</style>
