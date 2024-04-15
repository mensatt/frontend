<template>
  <!-- <DrawerRoot should-scale-background>
    <DrawerTrigger> Open </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerContent>
        <p>Content</p>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot> -->
  <div :style="{ width: '400px', height: '300px' }" @click="c++">
    <UiImage
      :key="c"
      src="12345"
      aspect-ratio="16/9"
      :preload="[ 'aa', 'bb', 'cc', 'dd' ]"
    />
  </div>
</template>

<script setup lang="ts">
const c = ref(0)
</script>
