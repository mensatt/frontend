<template>
  <div class="popups" :view-mode="viewMode">
    <PopupsWrapper
      v-for="popup of popups.state"
      :key="popup.uuid"
      :data="popup"
      @destruct="destruct(popup)"
    />
  </div>
</template>

<script setup lang="ts">
import { PopupInternally } from '../../utils/popups';

const viewMode = useViewMode()
const popups = usePopups()

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
