<template>
  <div class="outer">
    <h2 v-text="$t('select_mensa_header')" />
    <div class="options">
      <div
        v-for="opt of optionsSorted"
        :key="opt.id"
        class="option"
        :data-selected="opt.id === current.id"
        :data-fav="favourites.includes(opt.id)"
        @click.self="close(opt)"
      >
        <span class="name" v-text="opt.name" />
        <div class="fav" @click="toggleFav(opt)">
          <NuxtIcon :name="favourites.includes(opt.id) ? 'favourite_filled' : 'favourite_outline'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityLocation } from '../../utils/entities/location'

const props = defineProps<{
  close: (mensa: EntityLocation.Location) => any,
  current: EntityLocation.Location
  options: EntityLocation.Location[]
}>()

const favourites = useFavLocations()
const optionsSorted = useState<EntityLocation.Location[]>(
  'select-mensa--options-sorted',
  () => props.options
)

onMounted(() => {
  optionsSorted.value = props.options
    .map(o => ([ o, favourites.value.includes(o.id) ]) as const)
    .sort((a, b) => (a[1] && !b[1])
      ? -1
      : (b[1] && !a[1])
        ? 1
        : 0
    )
    .map(o => o[0])
})

function toggleFav(location: EntityLocation.Location) {
  if (favourites.value.includes(location.id))
    favourites.value.splice(favourites.value.indexOf(location.id), 1)
  else
    favourites.value.push(location.id)
}
</script>

<style scoped lang="scss">
.outer {
  color: black;
}

.options {
  display: flex;
  flex-direction: column;
  gap: $menu-item-margin;
}

.option {
  background-color: $bg-light;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;
  display: grid;
  grid-template-columns: 1fr auto;
  transition: background-color .1s ease;
  cursor: pointer;

  .name {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-regular;
    pointer-events: none;
    user-select: none;
  }

  .fav {
    padding: 9pt;
    margin: -10pt;
    font-size: calc(1em + 2pt);
    color: $color-minor;
    user-select: none;
  }

  &[data-fav=true] {
    background-color: $color-green20;

    .name {
      color: $color-major;
    }

    .fav {
      color: $color-green;
    }
  }

  [view-mode=desktop] &[data-fav=true]:hover {  
    background-color: $color-green40;
  }

  [view-mode=desktop] &[data-fav=false]:hover {  
    background-color: $bg-dark;
  }
}
</style>
