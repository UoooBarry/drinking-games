<template>
  <div class="flex justify-center items-start h-screen bg-black dark:bg-gray-900 pt-10">
    <div class="grid grid-cols-2 gap-4 w-full max-w-md">
      <router-link to="/toucher" class="col-span-1">
        <button
          class="flex justify-center items-center w-full h-32 bg-gray-800 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
        >
          Touch
        </button>
      </router-link>
    </div>
  </div>
</template>
