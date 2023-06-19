<template>
  <div class="outer">
    <h2>{{ dish.nameDe }}</h2>
    
    <label for="stars">Deine Bewertung:</label>
    <div class="stars">
      <div
        v-for="i in 5"
        :key="i"
        class="star"
        :data-selected="i <= inputStars"
        @click="clickStar(i)"
      >
        <NuxtIcon :name="(i <= inputStars) ? 'star_filled' : 'star_outline'" />
      </div>
    </div>

    <label for="image">Bild vom Gericht:</label>
    <div class="image">
      <p>Bild hochladen</p>
    </div>

    <label for="review">Platz für Worte:</label>
    <div class="review">
      <textarea
        v-model="inputReview"
        rows="4"
        placeholder="Zwar nur Brei, aber dafür echt lecker! Kann ich weiter empfehlen."
      />
    </div>

    <label for="review">Dein Name:</label>
    <div class="review">
      <input
        type="text"
        v-model="inputNickname"
        placeholder="(annonym)"
      />
    </div>

    <button>
      Abschicken
    </button>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const props = defineProps<{
  close: (success: boolean) => any,
  dish: EntityOccurrence.Dish
}>()

const inputStars = useState(`rate-dish-${props.dish.id}--stars`, () => 0)
const inputImage = useState(`rate-dish-${props.dish.id}--image`, () => null)
const inputReview = useState(`rate-dish-${props.dish.id}--review`, () => '')
const inputNickname = useState(`rate-dish-${props.dish.id}--nickname`, () => '')

function clickStar(number: number) {
  if (inputStars.value === number)
    inputStars.value = 0
  else
    inputStars.value = number
}
</script>

<style scoped lang="scss">
.outer > div {
  margin-bottom: $main-content-padding;
}

label {
  display: block;
  font-size: 10pt;
  font-family: $font-major;
  color: $color-sub;
  margin-bottom: $menu-item-margin;
}

.stars {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $menu-item-margin;
  border-radius: $menu-item-br;
  overflow: hidden;

  .star {
    display: grid;
    place-items: center;
    padding: $menu-item-padding;
    background-color: $color-yellow20;
    border-radius: 3pt;
    color: $color-yellow;
    font-size: 16pt;
    height: 1em;

    .nuxt-icon {
      display: grid;
      place-items: center;
      height: 1em;
    }

    &[data-selected=true] {
      background-color: $color-yellow40;
    }
  }
}

.image {
  height: 35vw;
  border-radius: $menu-item-br;
  overflow: hidden;
  background-color: $bg-dark;

  & > * {
    object-fit: cover;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  p {
    font-family: $font-regular;
    font-size: 11pt;
    color: $color-minor;
    display: grid;
    place-items: center;
    user-select: none;
  }
}

button {
  background-color: $color-green;
  color: #ffffff;
  font-family: $font-major;
  font-size: 10pt;
  text-align: center;
  width: 100%;
  border-radius: 999pt;
  border: none;
  outline: none;
  margin-top: calc(20pt - $main-content-padding);
  padding: $menu-item-padding;
}
</style>
