<template>
  <div>
    <h2>TODO</h2>
    <Occurrence v-if="data" :data="data" />
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const route = useRoute()

const { data, pending, error } = await api.getOccurrence(String(route.params.id))
</script>
