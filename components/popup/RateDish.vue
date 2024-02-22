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
    <div class="image" :data-uploaded="!!fileUploadPreview">
      <img v-if="fileUploadPreview" :src="fileUploadPreview" :style="imagePreviewCss" @click="open()">
      <p v-else @click="open()" v-text="$t('rate_dish_image_upload')" />

      <div v-if="fileUploadPreview" class="buttons">
        <NuxtIcon name="close" @click="clearImage()" />
        <NuxtIcon name="rotate_90" @click="rotateImage()" />
      </div>
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
        v-model="inputNickname"
        type="text"
        :placeholder="$t('rate_dish_nickname_placeholder')"
      >
    </div>

    <label v-if="inputImageIsUploading" class="info" v-text="$t('rate_dish_image_uploading')" />
    <label v-if="inputImageUploadError" class="error" v-text="$t('rate_dish_image_upload_error')" />

    <UiButton
      :text="$t('rate_dish_submit')"
      :loading="submittedLoading"
      :disabled="!readyToSubmit"
      :trigger-while-disabled="true"
      @click="submit()"
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
const inputImageRotation = useState<0 | 90 | 180 | 270>(`rate-dish-${props.occurrence.id}--image-rot`, () => 0)
const inputReview = useState(`rate-dish-${props.occurrence.id}--review`, () => '')
const inputNickname = useLocalStorage('rate-dish--nickname', () => '')

const errorRequireStars = useState(`rate-dish-${props.occurrence.id}--error-stars`, () => false)
const submittedLoading = useState(`rate-dish-${props.occurrence.id}--submitted-loading`, () => false)
const readyToSubmit = computed(() => !!inputStars.value && !inputImageIsUploading.value)

watch(inputStars, () => errorRequireStars.value = false)

const inputImageId = useState<string | null>(`rate-dish-${props.occurrence.id}--current-image-id`, () => null)
const inputImageIsUploading = useState<boolean>(`rate-dish-${props.occurrence.id}--image-uploading`, () => false)
const inputImageUploadError = useState<boolean>(`rate-dish-${props.occurrence.id}--image-upload-error`, () => false)

const { open, onChange } = useFileDialog()
onChange(async (files) => {
  if (!files?.length)
    return

  inputImage.value = files[0]
  inputImageIsUploading.value = true
  inputImageUploadError.value = false

  const uploadResult = await api.uploadImage(files[0])
  if (!uploadResult) {
    inputImageIsUploading.value = false
    inputImageUploadError.value = true
    return
  }

  inputImageId.value = uploadResult
  inputImageIsUploading.value = false
})
const fileUploadPreview = computed(() => inputImage.value ? URL.createObjectURL(inputImage.value) : null)

function rotateImage() {
  inputImageRotation.value += 90
  if (inputImageRotation.value >= 360)
    inputImageRotation.value = 0
}

function clearImage() {
  inputImage.value = null
  inputImageId.value = null
  inputImageIsUploading.value = false
  inputImageUploadError.value = false
}

const imagePreviewCss = computed(() => ({
  rotate: `${inputImageRotation.value}deg`
}))

async function submit() {
  if (inputImageIsUploading.value)
    return

  if (!inputStars.value)
    return errorRequireStars.value = true

  submittedLoading.value = true

  const success = await api.postRating({
    occId: props.occurrence.id,
    stars: inputStars.value,
    author: inputNickname.value || null,
    comment: inputReview.value || null,
    images: inputImageId.value
        ? [ { image: inputImageId.value, rotation: inputImageRotation.value } ]
        : []
  })

  if (success) {
    setTimeout(() => {  // <- visually looks better with a timeout
      submittedLoading.value = false
      inputStars.value = 0
      inputImage.value = null
      inputImageRotation.value = 0
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
  position: relative;

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

    [view-mode=desktop] & {
      max-height: 150pt;
    }
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

  .buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    padding: 5pt;
    gap: 5pt;

    & > * {
      width: 28pt;
      height: 28pt;
      display: grid;
      place-items: center;
      background-color: #00000044;
      border-radius: $card-item-br;
      backdrop-filter: blur(3px);
      color: #ffffff;
      font-size: 16pt;
    }
  }
}

.nickname {
  margin-bottom: 20pt !important;
}
</style>
