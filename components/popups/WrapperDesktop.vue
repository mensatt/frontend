<template>
  <div class="popup" :data-dismissed="data.dismissed">
    <div class="curtain" @click="close(null)" />
    <div class="content">
      <div class="inner">
        <component
          :is="rendered"
          :close="close"
          v-bind="data.data ?? {}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PopupInternally } from '../../utils/popups';

const { data } = defineProps<{
  data: PopupInternally
}>()

const emit = defineEmits([ 'destruct' ])

const rendered = PopupComponents[data.id]

function close(payload: any) {
  data.callback(payload)
  emit('destruct')
}
</script>

<style scoped lang="scss">
.popup, .curtain, .content {
  display: block;
  position: absolute;
  inset: 0;
}

.popup {
  pointer-events: all;
}

[data-dismissed=true] {
  &, * { pointer-events: none !important; }
}

.curtain {
  background-color: #00000099;
  animation: curtain-in .2s ease-out 1;
  transition: background-color .2s ease;
  pointer-events: all;

  [data-dismissed=true] & {
    background-color: #00000000;
  }

  @keyframes curtain-in {
    from { background-color: #00000000; }
    to { background-color: #00000099; }
  }
}

.content {
  pointer-events: none;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  padding: 10vh 0;
  box-sizing: border-box;
}

.inner {
  pointer-events: all;
  width: 90%;
  max-width: $desktop-max-content-width;
  background-color: $bg-lighter;
  border-radius: $menu-item-br;
  box-sizing: border-box;
  height: fit-content;
  animation: inner-in .3s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
  padding: calc($menu-item-padding * 2);
  box-sizing: border-box;

  [data-dismissed=true] & {
    opacity: 0;
    transform: translateY(20vh);
    transition:
      transform .2s cubic-bezier(0.11, 0, 0.5, 0),
      opacity .15s cubic-bezier(0.11, 0, 0.5, 0);
  }

  @keyframes inner-in {
    from { opacity: 0; transform: translateY(20vh); }
    to { opacity: 1; transform: translateY(0); }
  }
}
</style>
