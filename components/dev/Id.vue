<template>
  <div v-if="devtools && experiments.isEnabled('show_ids')" class="dev-id">
    id: {{ id }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string | number
}>()

const devtools = useSettingDevMode()
const experiments = useExperiments()
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
