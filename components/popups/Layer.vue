<template>
  <div class="popups" :view-mode="viewMode">
    <component
      v-for="popup of popups.state"
      :key="popup.uuid"
      :is="WrapperComponent"
      :data="popup"
      @destruct="destruct(popup)"
    />
  </div>
</template>

<script setup lang="ts">
import { PopupInternally } from '../../utils/popups';
import PopupsWrapperMobile from './WrapperMobile.vue'
import PopupsWrapperDesktop from './WrapperDesktop.vue'

const viewMode = useViewMode()
const popups = usePopups()

const WrapperComponent = computed(() => (viewMode.value === 'mobile') ? PopupsWrapperMobile : PopupsWrapperDesktop)

function destruct(popup: PopupInternally) {
  popup.dismissed = true
  setTimeout(() => {
    const index = popups.state.findIndex(search => search.uuid === popup.uuid)
    popups.state.splice(index, 1)
  }, 1000)
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
