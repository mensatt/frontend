<template>
  <div class="popups" :view-mode="viewMode">
    <component
      :is="WrapperComponent"
      v-for="popup of popups.state"
      :key="popup.uuid"
      :data="popup"
      @destruct="destruct(popup)"
    />
  </div>
</template>

<script setup lang="ts">
import { PopupInternally } from '../../utils/popups'
import PopupsWrapperMobile from './WrapperMobile.vue'
import PopupsWrapperDesktop from './WrapperDesktop.vue'

const viewMode = useViewMode()
const popups = usePopups()

const WrapperComponent = computed(() => (viewMode.value === 'mobile') ? PopupsWrapperMobile : PopupsWrapperDesktop)

function destruct(popup: PopupInternally) {
  popup.callback(null)
  popup.dismissed = true
  window.history.back()

  // the below should be taken care of by the time the function runs
  // but in case it wasn't, we're cleaning up anyway
  setTimeout(() => {
    const index = popups.state.findIndex(search => search.uuid === popup.uuid)
    if (index >= 0)
      popups.state.splice(index, 1)
  }, 2000)
}
</script>

<style scoped lang="scss">
.popups {
  position: absolute;
  z-index: 1100;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
