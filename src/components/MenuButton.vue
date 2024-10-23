<template>
  <button
    class="flex justify-center items-center w-full h-32 bg-gray-800 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
