<template>
  <Header :show-mensa="false" :fixed="true" :fixed-scrolling="true">
    <h2>Build Info</h2>
  </Header>

  <div class="inner">
    <p><b>Version:</b> {{ version.version }}</p>
    <p>
      <b>Git Commit:</b><br>
      Ref: {{ version.revision }}<br>
      Time: {{ version.commitTime }}<br>
      Message: {{ version.commitMessage }}<br>
      Author: {{ version.commitAuthor }}<br>
    </p>
    <p>
      <b>Build:</b><br>
      Time: {{ version.buildTime }}<br>
      Id: {{ version.buildId }}<br>
      Context: {{ version.buildContext }}<br>
      Node Version: {{ version.buildNodeVersion }}<br>
      Yarn Version: {{ version.buildYarnVersion }}<br>
    </p>
    <p>
      <b>Deploy:</b><br>
      Id: {{ version.deployId }}<br>
      Url: {{ version.deployUrl }}<br>
    </p>
  </div>
</template>

<script setup lang="ts">
const version = useVersion()
</script>

<style scoped lang="scss">
.inner {
  padding: $main-content-padding;
}

h2 {
  font-family: $font-header;
  font-size: 20pt;
  color: $color-header;
  margin: $main-content-padding;
  display: flex;
  align-items: center;
}

p {
  font-family: $font-regular;
  font-size: 10pt;
  color: $color-regular;
}
</style>
