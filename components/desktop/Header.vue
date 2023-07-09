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

    <div class="spacer" />

    <div class="location">
      {{ mensa.name }}
    </div>

    <div class="profile">
      <NuxtIcon name="person_outline" />
      {{ $t('desktop_profile') }}
    </div>
  </header>
</template>

<script setup lang="ts">
const selectedDay = useState<number | null>(() => 1)
const router = useRouter()
const mensa = useSelectedLocation()

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
</script>

<style scoped lang="scss">
header {
  background-color: $bg-lighter;
  z-index: 10;
  width: 100%;
  user-select: none;
  view-transition-name: header-main;
  display: flex;
  justify-content: start;
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
  width: fit-content;
}

.calendar, .profile, .location {
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-major;
  height: 100%;
  margin: 0 calc($main-content-padding/2);
  padding: 0 $main-content-padding;
  display: flex;
  align-items: center;
  line-height: 1em;
  border-left: 1pt solid $bg-dark;
  border-right: 1pt solid $bg-dark;
  box-sizing: border-box;
  transition: .1s ease background-color;
  cursor: pointer;
  gap: calc($main-content-padding/3);

  &:hover {
    background-color: $bg-light;
  }

  .nuxt-icon {
    font-size: 1.2em;
  }
}

.spacer {
  flex: 1 1;
}
</style>
