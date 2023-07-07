<template>
  <div class="outer" :data-loading="submittedLoading">
    <h2>{{ dishName }}</h2>
    
    <label for="stars" v-text="$t('rate_dish_stars')" />
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
    <span v-if="errorRequireStars" class="error" v-text="$t('rate_dish_stars_error')" />

    <label for="image" optional v-text="$t('rate_dish_image')" />
    <div class="image" :data-uploaded="!!fileUploadPreview" @click="open()">
      <img v-if="fileUploadPreview" :src="fileUploadPreview" />
      <p v-else v-text="$t('rate_dish_image_upload')" />
    </div>
    <span v-if="fileUploadPreview" class="info" v-text="$t('rate_dish_image_disclaimer')" />

    <label for="review" optional v-text="$t('rate_dish_review')" />
    <div class="review">
      <textarea
        v-model="inputReview"
        rows="4"
        :placeholder="$t('rate_dish_review_placeholder')"
      />
    </div>

    <label for="nickname" optional v-text="$t('rate_dish_nickname')" />
    <div class="nickname">
      <input
        type="text"
        v-model="inputNickname"
        :placeholder="$t('rate_dish_nickname_placeholder')"
      />
    </div>

    <UiButton
      :text="$t('rate_dish_submit')"
      :loading="submittedLoading"
      :disabled="!readyToSubmit"
      :triggerWhileDisabled="true"
      @bclick="submit()"
    />
  </div>
</template>

<script setup lang="ts">
import { EntityOccurrence } from '../../utils/entities/occurrence'

const api = useApi()
const i18n = useI18n()

const props = defineProps<{
  close: (success: boolean) => any,
  occurrence: EntityOccurrence.Occurrence
}>()

const dishName = computed(() => {
  if (i18n.locale.value === 'de' && props.occurrence.dish.nameDe)
    return props.occurrence.dish.nameDe
  if (i18n.locale.value === 'en' && props.occurrence.dish.nameEn)
    return props.occurrence.dish.nameEn

  return props.occurrence.dish.nameDe ?? props.occurrence.dish.nameEn
})

const inputStars = useState(`rate-dish-${props.occurrence.id}--stars`, () => 0)
const inputImage = useState<File | null>(`rate-dish-${props.occurrence.id}--image`, () => null)
const inputReview = useState(`rate-dish-${props.occurrence.id}--review`, () => '')
const inputNickname = useLocalStorage(`rate-dish--nickname`, () => '')

const errorRequireStars = useState(`rate-dish-${props.occurrence.id}--error-stars`, () => false)
const submittedLoading = useState(`rate-dish-${props.occurrence.id}--submitted-loading`, () => false)
const readyToSubmit = computed(() => !!inputStars.value)

watch(inputStars, () => errorRequireStars.value = false)

const { open, onChange } = useFileDialog()
onChange((files) => {
  if (files?.length)
    inputImage.value = files[0]
})
const fileUploadPreview = computed(() => inputImage.value ? URL.createObjectURL(inputImage.value) : null)

async function submit() {
  if (!inputStars.value)
    return errorRequireStars.value = true

  submittedLoading.value = true
  const success = await api.postRating({
    occId: props.occurrence.id,
    stars: inputStars.value,
    author: inputNickname.value,
    comment: inputReview.value,
    images: inputImage.value ? [ { image: inputImage.value } ] : []
  })

  if (success) {
    setTimeout(() => {  // <- visually looks better with a timeout
      submittedLoading.value = false
      inputStars.value = 0
      inputImage.value = null
      inputReview.value = ''
    }, 1000)

    return props.close(true)
  } else {
    submittedLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.outer > div {
  margin-bottom: $main-content-padding;
}

.outer[data-loading=true] {
  & > label, & > div, & > span {
    opacity: .5;
  }

  input, textarea {
    pointer-events: none;
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
    color: $color-placeholders;
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

.nickname {
  margin-bottom: 20pt !important;
}
</style>
