<template>
  <div class="popup" :data-dismissed="data.dismissed">
    <div class="curtain" @click="close(null)" />
    <DrawerRoot
      should-scale-background
      :open="!data.dismissed"
      @update:open="v => v ? {} : close(null)"
    >
      <DrawerPortal>
        <DrawerContent class="-vaul-">
          <div class="inner">
            <div class="handle">
              <div />
            </div>
            <div class="rendered">
              <component
                :is="rendered"
                :close="close"
                v-bind="data.data ?? {}"
              />
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  </div>
</template>

<script setup lang="ts">
import { DrawerContent, DrawerPortal, DrawerRoot } from 'vaul-vue'
import type { PopupInternally } from '#imports'

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
[data-dismissed=true] {
  &, * { pointer-events: none !important; }
}

.curtain {
  display: block;
  position: absolute;
  inset: 0;
  pointer-events: all;
  background-color: #00000044;
  animation: curtain-in .2s ease-out 1;
  transition: background-color .2s ease;
  pointer-events: all;

  [data-dismissed=true] & {
    background-color: #00000000;
  }

  @keyframes curtain-in {
    from { background-color: #00000000; }
    to { background-color: #00000044; }
  }
}
</style>

<style lang="scss">
.-vaul- {
  margin-top: 40pt;
  position: sticky;
  bottom: 0;
  inset: 0;
  height: fit-content;
  max-height: calc(100vh - 40pt);
  z-index: 1105;
  pointer-events: all;
  background-color: $bg-lighter;
  border-top-left-radius: 10pt;
  border-top-right-radius: 10pt;
  box-sizing: border-box;
  outline: none;

  .inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .handle {
    display: flex;
    justify-content: center;
    padding: 15pt 15pt 5pt 15pt;

    div {
      display: block;
      width: 15vw;
      height: 3pt;
      border-radius: 99pt;
      background-color: $bg-darker;
    }
  }

  .rendered {
    max-height: calc(100vh - 40pt - 20pt - 20pt);
    overflow-x: hidden;
    padding: 0 20pt 20pt 20pt;
  }
}
</style>
