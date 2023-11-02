<template>
  <div v-if="loading" class="visible-list">
    <SkeletonOccurrence
      v-for="i in 3"
      :key="i"
      :seed="i"
    />
  </div>

  <div v-else-if="error" class="no-list">
    <img src="~/assets/img/carrocket_down.svg" alt="">
    <span class="title" v-text="$t('occurrence_list_error_title')" />
    <span class="desc" v-text="error" />
  </div>

  <div v-else class="occurrences">
    <div v-if="occurrences.visible.length || (showHidden && viewMode === 'desktop' && occurrences.hidden.length)" class="visible-list">
      <OccurrenceCard
        v-for="occ of occurrences.visible"
        :key="occ.id"
        :data="occ"
      />
      <OccurrenceCard
        v-for="occ of (showHidden && viewMode === 'desktop') ? occurrences.hidden : []"
        :key="occ.id"
        :data="occ"
        class="hidden-occurrence"
      />
    </div>
    <div v-else-if="occurrences.hidden.length" class="no-list">
      <img src="~/assets/img/carrocket_down.svg" alt="">
      <span class="title" v-text="$t('occurrence_all_hidden_title')" />
      <span class="desc" v-text="$t('occurrence_all_hidden_desc_' + viewMode)" />
    </div>
    <div v-else class="no-list">
      <img src="~/assets/img/carrocket_down.svg" alt="">
      <span class="title" v-text="$t('occurrence_list_empty_title')" />
      <span class="desc" v-text="$t('occurrence_list_empty_desc')" />
    </div>

    <div v-if="viewMode === 'desktop'" :data-show-hidden="showHidden" class="footer-desktop">
      <slot name="footer" />
      <div v-if="occurrences.hidden.length" class="toggle" @click="toggleHiddenItems()">
        <NuxtIcon name="expand_more" />
        <span v-text="$t('hidden_dish', occurrences.hidden.length)" />
      </div>
    </div>
    <div v-else-if="occurrences.hidden.length" :data-show-hidden="showHidden">
      <div class="toggle" @click="toggleHiddenItems()">
        <NuxtIcon name="expand_more" />
        <span v-text="$t('hidden_dish', occurrences.hidden.length)" />
      </div>
      <div v-if="showHidden" class="hidden-list">
        <OccurrenceCard
          v-for="occ of occurrences.hidden"
          :key="occ.id"
          :data="occ"
          class="hidden-occurrence"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const filters = useFilters()
const viewMode = useViewMode()

const props = defineProps<{
  mensa: string
  date: Date
}>()

const loading = computed(() => pending.value || !data.value || dataCleared.value)
defineExpose({
  loading,
  refresh() {
    // why we're waiting half a second before actually refreshing?
    // mensatt api is so fast you don't even realise that the data was refreshed since there was no loading screen or anything
    // that's why we give it a bit of time to properly communicate to the user that we're fetching new data now
    // this does NOT impact first page load, that's still instant, we're just delaying data refreshing by a bit
    dataCleared.value = true
    setTimeout(() => {
      apiRefresh()
      nextTick(() => (dataCleared.value = false))
    }, 500)
  }
})

//

const dataCleared = useState(`occurrence-list--${props.mensa}-${props.date}-dc`, () => false)
const { data, pending, error, refresh: apiRefresh } = await api.getOccurrences(props.mensa, props.date)

const showHidden = useState(`occurrence-list--${props.mensa}-${props.date}-sh`, () => false)

const occurrences = computed(() => {
  if (loading.value) return { visible: [], hidden: [] }

  // only hide no longer available dishes if we're looking at today or at upcoming days. If we're looking at past days don't hide.
  const thisWasYesterdayOrEarlier = new Date(props.date.toDateString()).getTime() < new Date(new Date().toDateString()).getTime()

  return filters.filterOccurrences(data.value.occurrences, {
    sort: true,
    hideUnavailable: !thisWasYesterdayOrEarlier
  })
})

function toggleHiddenItems() {
  showHidden.value = !showHidden.value

  nextTick(() => {
    if (showHidden.value)
      useGlobalScrollContainer().value?.scrollBy({ top: window.innerHeight/5*4, behavior: 'smooth' })
    else
      useGlobalScrollContainer().value?.scrollBy({ top: -1, behavior: 'smooth' })
  })
}
</script>

<style scoped lang="scss">
.occurrences {
}

.visible-list {
  min-height: calc(100vh - 90pt);
  display: grid;
  gap: $main-content-padding;

  [view-mode=desktop] & {
    grid-template-columns: repeat(auto-fill, minmax(300pt, 1fr));
    min-height: calc(100vh - 100pt);
  }
}

[view-mode=desktop][experiments~="alt_layout_desktop"] .visible-list {
  min-height: calc(100vh - 100pt);
  display: block;
  column-count: auto;
  column-width: 300pt;
  column-gap: $main-content-padding;
  column-fill: balance;
  max-width: 1200pt !important;
  margin: 0 auto;

  .occurrence {
    margin-bottom: $main-content-padding;
    break-inside: avoid-column;
  }
}

.no-list {
  display: flex;
  min-height: calc(100vh - 90pt);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $main-content-padding;
  box-sizing: border-box;

  img {
    width: 30vw;
    height: 30vw;
    max-width: 100pt;
    max-height: 100pt;
  }

  .title {
    font-family: $font-major;
    font-size: 10pt;
    color: $color-sub;
    text-align: center;
    text-wrap: balance;
    margin: calc($main-content-padding*3) 0 $main-content-padding 0;
  }

  .desc {
    font-family: $font-regular;
    font-size: 10pt;
    color: $color-minor;
    text-align: center;
    text-wrap: balance;
    margin-bottom: calc($main-content-padding*7);
  }
}

.toggle {
  width: 100%;
  height: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5pt;
  background-color: $bg-light;
  border-top: 1px solid $bg-dark;
  user-select: none;

  span {
    font-family: $font-regular;
    font-size: 9pt;
    color: $color-minor;
  }
}

.nuxt-icon {
  transition: transform .2s ease-out;

  [data-show-hidden=true] & {
    transform: scaleY(-1);
  }
}

.hidden-occurrence {
  opacity: .7;
}

.footer-desktop {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  gap: $main-content-padding;
  margin-top: calc($menu-item-margin * 3);

  .toggle {
    border: none;
    background-color: $bg-light;
    height: unset;
    padding: $menu-item-padding;
    border-radius: $menu-item-br;
    box-sizing: border-box;
    height: $menu-item-outer-height;
    cursor: pointer;
    transition: background-color .1s ease;

    &:hover {
      background-color: $bg-dark;
    }
  }
}
</style>

