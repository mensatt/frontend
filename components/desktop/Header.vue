<template>
  <header>
    <NuxtLink to="/" @click="resetActiveDate()">
      <h1>
        <img src="~/assets/img/logo.svg" alt="">
        Mensatt
      </h1>
    </NuxtLink>

    <UtilsRelativeDateSelect
      class="dates"
      :days-count="6"
      :showCalendar="true"
      @click="gotoIndex()"
      v-model="selectedDay"
    />

    <div class="location" @click="clickMensa()">
      {{ selectedLocation.name }}
    </div>

    <div class="profile" @click="clickProfile()">
      <NuxtIcon name="person_outline" />
      {{ $t('desktop_profile') }}
    </div>
  </header>
</template>

<script setup lang="ts">
const selectedDay = useState<number | null>(() => 1)
const router = useRouter()
const selectedLocation = useSelectedLocation()
const popups = usePopups()

const route = useRoute()
watch(route, val => {
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

async function clickMensa() {
  const options = useLocationList().value
  const mensa = await popups.open('select_mensa', {
    current: selectedLocation.value,
    options
  })
  if (mensa)
    selectedLocation.value = mensa
}

async function clickProfile() {
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

.dates {
  width: 30pt;
  flex: 1 1;
}

.location, .profile {
  font-family: $font-regular;
  font-size: 10pt;
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

  .nuxt-icon {
    font-size: 1.2em;
    margin: -.2em;
  }
}
</style>
