<template>
  <div class="full-review">
    <div class="user">
      <div class="avatar">
        <Icon name="material-symbols:person-2-outline-rounded" />
      </div>
      <span class="name" v-text="data.displayName || $t('occurrence_comment_author_anon')" />
      <span class="time" v-text="createdText" />
      <div class="stars">
        <UtilsStarIcon
          v-for="i in 5"
          :key="i"
          :percentage="data.stars >= i ? 100 : 0"
        />
      </div>
    </div>
    <DevId :id="data.id" />
    <p v-if="data.text" class="text" v-text="data.text" />
    <div v-if="data.images.length" class="image">
      <UiImage
        :src="data.images[0].id"
        :dynamic-height="false"
        aspect-ratio="1 / 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { EntityOccurrence } from '~/utils/entities/occurrence'

const i18n = useI18n()

const props = defineProps<{
  data: EntityOccurrence.Review
}>()

const createdText = computed(() => dayjs()
  .locale(i18n.locale.value)
  .to(new Date(props.data.createdAt))
)
</script>

<style scoped lang="scss">
.full-review {
}

.user {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  column-gap: $menu-item-padding;
  justify-content: center;
}

.avatar {
  background-color: $bg-dark;
  grid-row: 1 / span 2;
  width: $content-pills-height;
  height: $content-pills-height;
  border-radius: 99pt;
  display: grid;
  place-items: center;
  font-size: 14pt;
  color: $color-minor;
}

.name {
  font-family: $font-major;
  font-size: 9pt;
  color: $color-major;
}

.time {
  font-family: $font-regular;
  font-size: 9pt;
  color: $color-regular;
}

.stars {
  grid-row: 1 / span 2;
  grid-column: 3;
  height: $content-pills-height;
  border-radius: 999pt;
  background-color: $color-yellow20;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10pt;
  gap: 2pt;

  svg {
    height: calc($content-pills-height / 2);
  }
}

.text {
  margin: $menu-item-padding 0 0 0;
}

.image {
  width: 100%;
  overflow: hidden;
  background-color: $bg-dark;
  margin-top: $menu-item-padding;
  border-radius: $menu-item-br;

  [view-mode="desktop"] & {
    border-radius: $card-item-br;
  }
}
</style>
