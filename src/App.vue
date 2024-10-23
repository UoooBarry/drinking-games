<template>
  <div id="app" class="dark:bg-black dark:text-white min-h-screen">
    <router-view />
    <!-- This will display the routed components -->
  </div>
</template>

<script lang="ts"></script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  display: inline;
  margin-right: 10px;
}
</style>
