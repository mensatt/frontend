<template>
  <div class="error">
    <div class="logo">
      <img src="~/assets/img/logo.svg" alt="Mensatt Logo">
      <span>Mensatt</span>
    </div>
    <div class="details">
      <h2>An error occurred!</h2>
      <span v-for="[k,v] of Object.entries(error ?? {})">
        <b>{{ k }}:</b> {{v}}
      </span>
    </div>
    <NuxtLink to="/">Go Back</NuxtLink>
  </div>

</template>

<script setup lang="ts">
const error = useError()
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 40pt;
  padding: 40pt;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: .5em;
  font-size: 12pt;

  img {
    width: 1.5em;
    height: 1.5em;
  }

  span {
    font-family: $font-major;
    color: $color-header;
  }
}

h2 {
  font-family: $font-header;
  color: $color-header;
  font-size: 16pt;
  margin: 0 0 10pt 0;
}

.details {
  display: flex;
  flex-direction: column;

  span {
    font-family: monospace;
    color: $color-minor;
    font-size: 10pt;

    b {
      color: $color-major;
    }
  }
}

a {
  text-decoration: none;
  padding: 10pt 25pt;
  border: 1px solid $bg-darker;
  border-radius: $menu-item-br;
  font-family: $font-major;
  font-size: 10pt;
  color: $color-major;

  &:hover {
    background-color: $bg-light;
  }
}
</style>
