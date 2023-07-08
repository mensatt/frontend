<template>
  <HeaderTag>
    <h2>Build Info</h2>
  </HeaderTag>

  <PageContent>
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
  </PageContent>
</template>

<script setup lang="ts">
const version = useVersion()
</script>
