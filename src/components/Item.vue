<script setup>

  import { ref, defineProps } from 'vue';

/*  const itemObjectTree = ref({
    strDrink: "3-Mile Long Island Iced Tea",
    strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
    idDrink: 15300
  }); */

  defineProps({
    itemObjectTree: Object,
    required: true
  })


</script>

<template>

  <button v-if="'strDrink' in itemObjectTree">
    <img  :src="itemObjectTree.strDrinkThumb"
          class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl">
          <slot></slot>
  </button>
  <button v-else-if="'strIngredient' in itemObjectTree">
    <img  :src="itemObjectTree.ingredientThumb"
          class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl">
          <slot></slot>
  </button>

</template>
