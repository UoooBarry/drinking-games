<template>
  <div
    class="flex justify-center items-start h-screen bg-black dark:bg-gray-900 pt-10"
  >
    <div class="grid grid-cols-2 gap-4 w-full max-w-md">
      <router-link to="/toucher" class="col-span-1">
        <menu-button> Touch </menu-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuButton from "@/components/MenuButton.vue";
</script>
