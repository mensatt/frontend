<template>
  <HeaderTag>
    <h2 v-text="$t('credits_header')" />
  </HeaderTag>

  <PageContent>
    <p>Mensatt &lt;3</p>
    <h3 v-text="$t('credits_core_team')" />
    <p v-for="name,i of coreTeam" :key="i">- {{ name }}</p>

    <h3 v-text="$t('credits_special_thanks')" />
    <p v-for="name,i of specialThanks" :key="i">- {{ name }}</p>

    <h3 v-text="$t('credits_we_love')" />
    <p v-for="name,i of weLove" :key="i">- {{ name }}</p>
  </PageContent>
</template>

<script setup lang="ts">
const shuffle = () => (Math.random() < .5) ? 1 : -1

const coreTeam = [
  'Tobias Gessler (Backend & Organization)',
  'Louis Duemler (Backend & Infrastructure)',
  'Kevin Kollenda (Scraper & Backend)',
  'Benedikt Nerb (Frontend, Backend & DevOps)',
  'Andreas May (Frontend & Design)',
].sort(shuffle)

const specialThanks = [
  'Lars',
  'Matthias',
  'Freddi',
  'Jannik',
  'Lasse',
].sort(shuffle)

const weLove = [
  'Nuxt, Vue & VueUse',
  'Rust, Axum & Diesel',
  'GraphQL',
  'Spezi',
].sort(shuffle)
</script>
