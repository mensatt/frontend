<template>
  <div class="occurrence">
    <div class="image" />
    <div class="details">
      <div class="h2" :style="{ width: `${80 + Math.cos(seed)*15}%` }" />
      <div class="pills">
        <div
          v-for="i in Math.floor(Math.sin(seed + 14) * 2) + 5"
          :key="i"
          class="pill"
          v-text="'a'.repeat(Math.floor((Math.sin(i + seed) + 2) * 4 + 2))"
        />
      </div>
      <div
        v-for="i in Math.floor(Math.sin(seed + 20) * 2) + 2"
        :key="i"
        class="comment"
        v-text="'a'.repeat(Math.floor((Math.sin(i*2 + seed) + 2) * 20))"
      />
      <div class="buttons">
        <div class="button" />
        <div class="button" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { seed } = defineProps<{
  seed: number
}>()
</script>

<style scoped lang="scss">
.occurrence {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: $bg-lighter;
  padding-bottom: calc($main-content-padding * 3);
  height: fit-content;
  box-sizing: border-box;

  [view-mode=desktop] & {
    border-radius: $menu-item-br;
    border: 1px solid $bg-dark;
    padding-bottom: 0;
  }
}

.image {
  aspect-ratio: 14/9;
  max-height: 50vh;
  object-fit: cover;
  width: 100%;
  background-color: $bg-dark;
  box-sizing: border-box;
  margin: 0;

  [view-mode=desktop] & {
    border-radius: $menu-item-br $menu-item-br 0 0;
  }
}

.details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding: $main-content-padding;
}

.h2 {
  margin: 0;
  height: 18pt;
  width: 80%;
  background-color: $bg-dark;
  border-radius: $card-item-br;
}

.pills {
  margin: $main-content-padding 0;
  display: flex;
  flex-wrap: wrap;
  gap: calc($main-content-padding / 4);

  .pill {
    background-color: $bg-dark;
    border-radius: $card-item-br;
    height: $content-pills-height;
    font-size: 12pt;
    color: transparent;
  }
}

.comment {
  background-color: $bg-dark;
  border-radius: $menu-item-br;
  font-size: 12pt;
  width: fit-content;
  color: transparent;
  word-break: break-all;
  margin-bottom: 5pt;
}

.buttons {
  display: none;

  [view-mode=desktop] & {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: $menu-item-margin;
    gap: $menu-item-margin;
  }

  .button {
    height: 28pt;
    border-radius: 999pt;
    box-sizing: border-box;

    &:first-child { border: 1px solid $bg-dark; }
    &:last-child { background-color: $bg-dark; }
  }
}
</style>
