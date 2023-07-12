<template>
  <HeaderTag :hide-on-view-modes="[ 'desktop' ]">
    <UtilsRelativeDateSelect />
  </HeaderTag>
 
  <PageContent v-if="viewMode === 'desktop'">
    <OccurrenceList
      :key="mensa.id + activeDate"
      :mensa="mensa.id"
      :date="activeDate"
    >
      <template #footer>
        <footer>
          <span>Copyright &copy; {{ new Date().getFullYear() }} Mensatt. {{ $t('liability_disclaimer') }}</span>
          <span>
            v{{version.version}} &mdash; <NuxtLink v-for="link of desktopFooterLinks" :key="link.url" :to="link.url" v-text="$t(link.text)" />
          </span>
          <div class="socials">
            <NuxtLink to="https://discord.gg/wjeYsQQQ3R" target="_blank" class="social">
              <NuxtIcon name="brands/discord" />
            </NuxtLink>
            <NuxtLink to="https://github.com/mensatt" target="_blank" class="social">
              <NuxtIcon name="brands/github" />
            </NuxtLink>
            <NuxtLink href="mailto:hello@mensatt.de" target="_blank" class="social">
              <NuxtIcon name="brands/mail" />
            </NuxtLink>
          </div>
        </footer>
      </template>
    </OccurrenceList>
  </PageContent>

  <PageContent v-else-if="viewMode === 'mobile'" :no-padding="true">
    <UtilsSwipePages>
      <template #active>
        <UtilsPullDownRefresh :disabled="!!activeList?.loading" @refresh="refresh()">
          <OccurrenceList
            ref="activeList"
            :key="mensa.id + activeDate"
            :mensa="mensa.id"
            :date="activeDate"
          />
        </UtilsPullDownRefresh>
      </template>
    </UtilsSwipePages>
  </PageContent>
</template>

<script setup lang="ts">
const activeList = ref<any>(null)
const mensa = useSelectedLocation()
const viewMode = useViewMode()
const version = useVersion()

const activeDate = useGlobalSelectedDate()

function refresh() {
  activeList.value?.refresh?.()
}

const desktopFooterLinks = [
  { text: 'page_privacy', url: '/privacy' },
  { text: 'page_credits', url: '/credits' },
  { text: 'page_admin', url: 'https://admin.mensatt.de' },
]
</script>

<style scoped lang="scss">
footer {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: calc($menu-item-margin * -1);
  padding: $menu-item-margin;

  & > span {
    font-family: $font-regular;
    color: $color-minor;
    font-size: 10pt;
    opacity: .5;
    transition: opacity .1s ease;

    a {
      color: inherit;
      text-decoration-style: dotted;
      margin-right: .5em;

      &:hover {
        color: $color-major;
      }
    }

    &:first-of-type { align-self: flex-end; }
    &:last-of-type { align-self: flex-start; }
  }

  &:hover > span {
    opacity: 1;
  }
}

.socials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: $menu-item-margin;
  grid-row: 1 / span 2;
  grid-column: 2;
  
  .social {
    height: $menu-item-outer-height;
    width: $menu-item-outer-height;
    background-color: $bg-light;
    border-radius: $menu-item-br;
    display: grid;
    place-items: center;
    color: $color-minor;
    transition: background-color .1s ease;

    &:hover {
      background-color: $bg-dark;
    }
  }
}
</style>
