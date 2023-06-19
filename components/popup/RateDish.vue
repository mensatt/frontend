<template>
  <div class="outer">
    <h2>{{ occurrence.dish.nameDe }}</h2>
    
    <label for="stars">Deine Bewertung:</label>
    <div class="stars" :data-error-below="errorRequireStars">
      <div
        v-for="i in 5"
        :key="i"
        class="star"
        :data-selected="i <= inputStars"
        @click="inputStars = i"
      >
        <NuxtIcon :name="(i <= inputStars) ? 'star_filled' : 'star_outline'" />
      </div>
    </div>
    <span v-if="errorRequireStars" class="error">Du musst das Gericht noch bewerten!</span>

    <label for="image" optional>Bild vom Gericht:</label>
    <div class="image" :data-uploaded="!!fileUploadPreview" @click="open()">
      <img v-if="fileUploadPreview" :src="fileUploadPreview" />
      <p v-else>Bild hochladen</p>
    </div>
    <span v-if="fileUploadPreview" class="info">Durch Abschicken deiner Bewertung erlaubst du Mensatt dieses Bild in jeglicher Form zu verwenden.</span>

    <label for="review" optional>Platz für Worte:</label>
    <div class="review">
      <textarea
        v-model="inputReview"
        rows="4"
        placeholder="Zwar nur Brei, aber dafür echt lecker! Kann ich weiter empfehlen."
      />
    </div>

    <label for="review" optional>Dein Name:</label>
    <div class="review">
      <input
        type="text"
        v-model="inputNickname"
        placeholder="(anonym)"
      />
    </div>

    <button @click="submit()" :data-ready="readyToSubmit">
      Abschicken
    </button>
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const api = useApi()

const props = defineProps<{
  close: (success: boolean) => any,
  occurrence: EntityOccurrence.Occurrence
}>()

const inputStars = useState(`rate-dish-${props.occurrence.id}--stars`, () => 0)
const inputImage = useState<File | null>(`rate-dish-${props.occurrence.id}--image`, () => null)
const inputReview = useState(`rate-dish-${props.occurrence.id}--review`, () => '')
const inputNickname = useLocalStorage(`rate-dish--nickname`, () => '')

const errorRequireStars = useState(`rate-dish-${props.occurrence.id}--error-stars`, () => false)
const readyToSubmit = computed(() => !!inputStars.value)

watch(inputStars, () => errorRequireStars.value = false)

const { open, onChange } = useFileDialog()
onChange((files) => {
  if (files?.length)
    inputImage.value = files[0]
})
const fileUploadPreview = computed(() => inputImage.value ? URL.createObjectURL(inputImage.value) : null)

function submit() {
  if (!inputStars.value)
    return errorRequireStars.value = true

  api.postRating({
    occId: props.occurrence.id,
    stars: inputStars.value,
    author: inputNickname.value,
    comment: inputReview.value,
    images: inputImage.value ? [ { image: inputImage.value } ] : []
  })
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

.error, .info {
  display: block;
  font-family: $font-major;
  font-size: 8pt;
  margin-top: calc($menu-item-margin - $main-content-padding);
  margin-bottom: $main-content-padding;
  padding: $menu-item-padding;
  border-radius: 3pt 3pt $menu-item-br $menu-item-br;

  &.error {
    color: $color-red;
    background-color: $color-red20;
  }

  &.info {
    color: $color-regular;
    background-color: $bg-dark;
  }
}

.stars {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $menu-item-margin;
  border-radius: $menu-item-br;
  overflow: hidden;

  &[data-error-below=true] {
    border-radius: $menu-item-br $menu-item-br 3pt 3pt;
  }

  .star {
    display: grid;
    place-items: center;
    padding: $menu-item-padding;
    background-color: $color-yellow20;
    border-radius: 3pt;
    color: $color-yellow;
    font-size: 16pt;
    height: 1em;
    cursor: pointer;

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
  border-radius: $menu-item-br;
  overflow: hidden;
  background-color: $bg-dark;
  cursor: pointer;

  &[data-uploaded=true] {
    border-radius: $menu-item-br $menu-item-br 3pt 3pt;
  }

  & > * {
    object-fit: cover;
    width: 100%;
    max-height: 60vh;
    box-sizing: border-box;
    margin: 0;
    display: block;
  }

  p {
    height: 35vw;
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

  &[data-ready=false] {
    background-color: $bg-darker;
    cursor: not-allowed;
  }
}
</style>
