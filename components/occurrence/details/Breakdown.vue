<template>
  <div class="dish-breakdown">
    <div class="rating">
      <div class="rows">
        <template v-for="i of [ 5, 4, 3, 2, 1 ]" :key="i">
          <span class="name" v-text="$t('n_star', i)" />
          <div class="progress">
            <div class="inner" :style="{ width: `${reviewsCounted[i]*100}%` }" />
          </div>
          <span class="count" v-text="`${Math.round(reviewsCounted[i]*100)}%`" />
        </template>
      </div>
      <div
        class="stars"
        v-text="$t('stars_summary', {
          score: data.dish.reviewData.metadata.averageStars?.toPrecision(2),
          count: data.dish.reviewData.metadata.reviewCount
        })"
      />
    </div>

    <div class="prices">
      <div class="price">
        <span v-text="prices.format(data.priceStudent) + '€'" />
        <span v-text="$t('settings_price_group1')" />
      </div>
      <div class="price">
        <span v-text="prices.format(data.priceStaff) + '€'" />
        <span v-text="$t('settings_price_group2')" />
      </div>
      <div class="price">
        <span v-text="prices.format(data.priceGuest) + '€'" />
        <span v-text="$t('settings_price_group3')" />
      </div>
    </div>

    <div class="tags">
      <div v-for="tag of data.tags" :key="tag.key" class="tag">
        <div class="icon">
          <span v-if="tag.shortName" v-text="tag.shortName" />
          <NuxtIcon v-else name="questionmark" />
        </div>
        <span class="name" v-text="tag.name" />
        <DevId :id="tag.key" />
      </div>
    </div>

    <div class="ingredients">
      <div v-for="ingr of ingredients" :key="ingr.name" class="ingr">
        <span v-text="$t(`ingredient_${ingr.name}`)" />
        <div class="divider" v-text="'.'.repeat(100)" />
        <span v-text="`${(data[ingr.name] as number / ingr.factor).toFixed(ingr.factor === 1 ? 0 : 1)} ${ingr.unit}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang=ts>
import { EntityOccurrence } from '~/utils/entities/occurrence'


const ingredients: Array<{ name: keyof EntityOccurrence.Occurrence, unit: string, factor: number }> = [
  { name: 'kcal', unit: 'kcal', factor: 1 },
  { name: 'kj', unit: 'kj', factor: 1 },
  { name: 'saturatedFat', unit: 'g', factor: 10 },
  { name: 'carbohydrates', unit: 'g', factor: 10 },
  { name: 'sugar', unit: 'g', factor: 10 },
  { name: 'fiber', unit: 'g', factor: 10 },
  { name: 'protein', unit: 'g', factor: 10 },
  { name: 'salt', unit: 'g', factor: 10 },
]

const prices = usePrices()

const props = defineProps<{
  data: EntityOccurrence.Occurrence
}>()

const displayTags = computed(() => props.data.tags
  .filter(tag => tag.priority !== 'HIDE') ?? [])

const reviewsCounted = computed(() => {
  const out = [ 0, 0, 0, 0, 0, 0 ]

  if (props.data.dish.reviewData.metadata.reviewCount === 0)
    return out

  for (const review of props.data.dish.reviewData.reviews)
    out[review.stars]++
  return out.map(r => (r / props.data.dish.reviewData.metadata.reviewCount))
})
</script>

<style scoped lang="scss">

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: calc($main-content-padding / 4);
}

.rating {
  margin: $main-content-padding 0;
  border: 1px solid $bg-dark;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;

  .stars {
    color: $color-regular;
    font-family: $font-regular;
    font-size: 10pt;
    display: flex;
    align-items: center;
  }

  .rows {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 10pt;
    row-gap: 3pt;
    margin-bottom: $menu-item-padding;

    .name, .count {
      font-family: $font-major;
      font-size: 9pt;
      color: $color-regular;
    }

    .progress {
      width: 100%;
      height: 5pt;
      background-color: $bg-dark;
      border-radius: 99pt;
      overflow: hidden;

      .inner {
        height: 100%;
        border-radius: 99pt;
        background-color: $color-yellow;
      }
    }
  }
}

.prices {
  margin: $main-content-padding 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid $bg-dark;
  border-radius: $menu-item-br;
  overflow: hidden;

  .price {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $menu-item-padding;

    &:not(:last-child) {
      border-right: 1px solid $bg-dark;
    }

    span:first-child {
      font-family: $font-major;
      font-size: 18pt;
      color: $color-blue;
    }

    span:last-child {
      font-family: $font-major;
      font-size: 9pt;
      color: $color-blue;
    }
  }
}

.ingredients {
  margin: $main-content-padding 0;
  border: 1px solid $bg-dark;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;

  .ingr {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10pt;
    
    &:not(:last-child) {
      margin-bottom: 2pt;
    }

    span {
      font-family: $font-regular;
      font-size: 10pt;
      color: $color-regular;
    }

    .divider {
      width: 100%;
      overflow: hidden;
      flex-shrink: 1;
      letter-spacing: 3pt;
      transform: translateY(-15%);
      color: $bg-darker;
    }
  }
}

.tags {
  margin: $main-content-padding 0;
  border: 1px solid $bg-dark;
  padding: $menu-item-padding;
  border-radius: $menu-item-br;

  .tag {
    display: flex;
    align-items: center;
    gap: $menu-item-margin;

    &:not(:last-child) {
      margin-bottom: $menu-item-margin;
    }

    .icon {
      width: 26pt;
      height: 26pt;
      background-color: $bg-dark;
      border-radius: $card-item-br;
      display: grid;
      place-items: center;
      font-size: 12pt;
      color: $color-minor;
    }

    .name {
      font-family: $font-major;
      font-size: 9pt;
      color: $color-regular;
    }
  }
}
</style>
