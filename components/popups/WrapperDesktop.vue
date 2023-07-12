<template>
  <div class="popup" :data-dismissed="data.dismissed" :data-positional="!!data.position">
    <div class="curtain" @click="close(null)" />
    <div class="content">
      <div class="inner" :style="innerCss">
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

const innerCss = computed(() => {
  if (!data.position) return ''
  return {
    top: (data.position.top === undefined) ? undefined : `${data.position.top}px`,
    left: (data.position.left === undefined) ? undefined : `${data.position.left}px`,
    bottom: (data.position.bottom === undefined) ? undefined : `${data.position.bottom}px`,
    right: (data.position.right === undefined) ? undefined : `${data.position.right}px`,
    width: (data.position.width === undefined) ? undefined : `${data.position.width}px`,
  }
})
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
  --color: #00000099;
  background-color: var(--color);
  animation: curtain-in .2s ease-out 1;
  transition: background-color .2s ease;
  pointer-events: all;

  [data-dismissed=true] & {
    background-color: #00000000;
  }

  [data-positional=true] & {
    --color: #00000022;
  }

  @keyframes curtain-in {
    from { background-color: #00000000; }
    to { background-color: var(--color); }
  }
}

.content {
  pointer-events: none;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  [data-positional=false] & {
    padding: 10vh 0;
  }
}

.inner {
  pointer-events: all;
  width: 90%;
  max-width: $desktop-max-content-width;
  background-color: $bg-lighter;
  border-radius: $menu-item-br;
  box-sizing: border-box;
  height: fit-content;
  animation: inner-in-fullscreen .3s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
  padding: calc($menu-item-padding * 2);
  box-sizing: border-box;

  [data-dismissed=true] & {
    opacity: 0;
    transform: translateY(20vh);
    transition:
      transform .2s cubic-bezier(0.11, 0, 0.5, 0),
      opacity .15s cubic-bezier(0.11, 0, 0.5, 0);
  }

  [data-positional=true] & {
    position: absolute;
    box-shadow: 0 10pt 20pt #00000022;
    animation: inner-in-positional .1s ease-out 1;
  }

  [data-positional=true][data-dismissed=true] & {
    transform: translateY(-10pt);
    transition:
      transform .14s cubic-bezier(0.11, 0, 0.5, 0),
      opacity .1s cubic-bezier(0.11, 0, 0.5, 0);
  }

  @keyframes inner-in-fullscreen {
    from { opacity: 0; transform: translateY(20vh); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes inner-in-positional {
    from { opacity: 0; transform: translateY(-10pt); }
    to { opacity: 1; transform: translateY(0); }
  }
}
</style>
