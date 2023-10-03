<template>
  <div class="dev-id" v-if="devtools && showIds">
    id: {{ id }}
  </div>
</template>

<script setup lang=ts>
defineProps<{
  id: string | number
}>()

const devtools = useSettingDevMode()
const showIds = useSettingDevShowIds()
</script>

<style scoped lang="scss">
.dev-id {
  background-color: $color-red20;
  color: $color-red;
  font-family: $font-major;
  font-size: 9pt;
  padding: 0 5pt;
  border-radius: 99pt;
  width: fit-content;
}
</style>
