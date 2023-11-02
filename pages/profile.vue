<template>
  <HeaderTag>
    <h2 v-text="$t('profile_header')" />
  </HeaderTag>

  <PageContent>
    <ProfileAccountCard />

    <h3 v-text="$t('settings_header')" />
    <UtilsSettingsMenu />

    <h3 v-text="$t('info_header')" />
    <UiExternLink text="page_privacy" url="/privacy" />
    <UiExternLink text="page_credits" url="/credits" />
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

    <div class="footer">
      <span>Copyright &copy; {{ new Date().getFullYear() }} Mensatt<br>v{{version.version}}</span>
    </div>
  </PageContent>
</template>

<script setup lang="ts">
const version = useVersion()
const viewMode = useViewMode()

//

onMounted(handleDesktopView)
watch(viewMode, handleDesktopView)
function handleDesktopView() {
  if (viewMode.value !== 'desktop') return
  navigateTo('/')
}
</script>

<style scoped lang="scss">

.socials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: $menu-item-margin;

  .social {
    background-color: $bg-light;
    border-radius: $menu-item-br;
    padding: $menu-item-padding;
    display: grid;
    place-items: center;
    color: $color-major;
  }
}

.footer > span {
  display: block;
  margin: 30pt 0;
  text-align: center;
  font-family: $font-regular;
  color: $color-sub;
  font-size: 10pt;
}
</style>
