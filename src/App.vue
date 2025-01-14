<script setup>
import { ref, computed } from 'vue';
import Cocktail from '@/components/Cocktail.vue'

const currentCocktail = ref('Negroni');
const favourites = ref(['Negroni', 'Gin & Tonic', 'Mai Tai']);
const nonFavourites = ref(['Old Fashioned', 'Mojito']);
const newCocktail = ref('');

const isFavourite = computed(() => favourites.value.includes(currentCocktail.value));
const allCocktails = computed(() => favourites.value.concat(nonFavourites.value));

const getClassForCocktail = (cocktail) =>
  favourites.value.includes(cocktail) ? 'bg-green-100' : 'bg-gray-100';

const toggleFav = () => {
  if (favourites.value.includes(currentCocktail.value)) {
    favourites.value = favourites.value.filter(cocktail => cocktail !== currentCocktail.value);
    nonFavourites.value.push(currentCocktail.value);
  } else {
    favourites.value.push(currentCocktail.value);
    nonFavourites.value = nonFavourites.value.filter(cocktail => cocktail !== currentCocktail.value);
    console.log(favourites.value);
  }
};

const switchCocktail = (cocktail) => {
  currentCocktail.value = cocktail;
}

const addCocktail = () => {
  nonFavourites.value.push(newCocktail.value);
  newCocktail.value = '';
}

</script>

<template>

  <div class="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
  
    <Cocktail
              :currentCocktail="currentCocktail"
              :isFavourite="isFavourite"
              @toggle-fav="toggleFav"></Cocktail> 
    <h3 class="text-xl font-semibold mb-4">Cocktails:</h3>
    <ul class="space-y-2">
      <li
        v-for="cocktail in allCocktails" 
        :key="cocktail"
        @click="switchCocktail(cocktail)"
        class="text-xs cursor-pointer p-2 rounded-lg hover:bg-gray-200 text-gray-800"
        :class="getClassForCocktail(cocktail)"
        >
        {{ cocktail }}
      </li>
    </ul>
    <form @submit.prevent="addCocktail" class="mt-6">
      <label for="newCocktail" class="block text-sm font-medium text-gray-700 mb-2">Add Cocktail:</label>
      <div class="flex gap-2">
        <input 
          type="text" 
          id="newCocktail" 
          name="newCocktail" 
          v-model="newCocktail" 
          class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter cocktail name">
        <button 
          type="submit" 
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add
        </button>
      </div>
    </form>
  </div>

</template>
