<script setup>

  defineProps({
    itemObjectTree: Object,
    required: true
  })


</script>

<template>

  <button v-if="'strDrink' in itemObjectTree">
    <img  :src="itemObjectTree.strDrinkThumb"
          class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl m-5 border-orange-300">
          <slot></slot>
  </button>
  <button v-else-if="'strIngredient' in itemObjectTree">
    <img  :src="itemObjectTree.ingredientThumb"
          class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl m-5 border-cyan-200">
          <slot></slot>
  </button>

</template>

<style>

  

</style>
