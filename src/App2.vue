<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

//data
const cocktailTree = ref({});
const currentView = ref('cocktail')

// program flow

const startCocktailAppAsync = async () => {
  let rawCocktail = await getSingleCocktailAsync('11003');
  let ingredientStrings = getCocktailIngredientsArray(rawCocktail);

  const fullIngredientData = await Promise.all(
    ingredientStrings.map((ingredient) => getSingleIngredientAsync(ingredient))
  );

  fullIngredientData.forEach(data => data.ingredientThumb = `https://www.thecocktaildb.com/images/ingredients/${data.strIngredient}-Medium.png`)

  rawCocktail.ingredients = fullIngredientData;

  cocktailTree.value = rawCocktail;
  // does this work? who knows!
  cocktailTree.value.ingredients.forEach( ingredient => {
    preloadImage(ingredient.ingredientThumb);
  })
}

const switchToIngredientListView = () => {
  currentView.value = 'ingredientList';
  //cocktailTree.value = cocktailTree.value.ingredients;
  // console.log("in switch to ingredient List: ", cocktailTree.value);
}

const switchToSingleIngredientView = async (index) => {
  // get cocktails based on ingredient
  let allCocktailStubs = await getCocktailsByIngredientAsync(cocktailTree.value.ingredients[index].strIngredient);
  let shortenedStubs = allCocktailStubs.slice(0, 5);
  let ids = shortenedStubs.map(cocktail => cocktail.idDrink);
  let cocktails = await Promise.all(
    ids.map( id => getSingleCocktailAsync(id))
  );

  cocktailTree.value = cocktailTree.value.ingredients[index];
  cocktailTree.value.cocktails = cocktails;

  currentView.value = 'ingredient'
}

const switchToCocktailListView = () => {
  currentView.value = 'cocktailList';

}

const switchToCocktailView = async (index) => {

  console.log("Where i want to be", cocktailTree.value);

  let ingredientStrings = getCocktailIngredientsArray(cocktailTree.value.cocktails[index]);

  const fullIngredientData = await Promise.all(
    ingredientStrings.map((ingredient) => getSingleIngredientAsync(ingredient))
  );

  fullIngredientData.forEach(data => data.ingredientThumb = `https://www.thecocktaildb.com/images/ingredients/${data.strIngredient}-Medium.png`)

  cocktailTree.value = cocktailTree.value.cocktails[index];
  cocktailTree.value.ingredients = fullIngredientData;

  currentView.value = 'cocktail';

  console.log("the ingredients of the cocktail: ", ingredientStrings);
}

// API calls

const getSingleCocktailAsync = async (id) => {
    try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.drinks[0];
  } catch (error) {
    console.log('Error fetching cocktail', error);
  }
}

const getSingleIngredientAsync = async (name) => {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
    return response.data.ingredients[0];
  } catch (error) {
    console.log('Error fetching ingredient', error);
  }
}

const getCocktailsByIngredientAsync = async (ingredient) => {
   try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    return response.data.drinks;
  } catch (error) {
    console.log('Error fetching ingredient', error);
  }
}

// helpers

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

// Tree traversal

const getCocktailIngredientsArray = (cocktail) => {

  const keys = Object.keys(cocktail);

  const ingredientKeys = keys.filter((key) => key.startsWith("strIngredient") && cocktail[key] !== null);

  const ingredients = [];

  ingredientKeys.forEach(ingredientKey => {
    ingredients.push(cocktail[ingredientKey]);
  })

  return ingredients;
}

onMounted(async () => {
  await startCocktailAppAsync();
});

</script>


<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

    <!-- Cocktail View -->
    <div v-if="currentView === 'cocktail' || currentView ===  'ingredientList'" class="text-center space-y-4">
      <button 
        @click="switchToIngredientListView">
        <img :src="cocktailTree.strDrinkThumb" alt="picture of a cocktail" width="200px"
          class="w-60 h-60 rounded-full object-cover border-2 shadow-2xl"
          :class="{ hidden : currentView === 'ingredientList' }"
          >
      </button>
      <div 
        v-for="(ingredient, index) in cocktailTree.ingredients" 
        :key="index" >
        <button 
          @click="switchToSingleIngredientView(index)">
          <img :src="ingredient.ingredientThumb"
            class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl"
            :class="{ hidden : currentView === 'cocktail' }"
            >
        </button>
      </div>
    </div>

    <!--  Ingredient View -->
    <div v-else-if="currentView === 'ingredient' || currentView === 'cocktailList'" class="text-center space-y-4">
      <button 
        @click="switchToCocktailListView">
        <img :src="cocktailTree.ingredientThumb"
        class="w-60 h-60 rounded-full object-cover border-2 shadow-2xl"
        :class="{ hidden : currentView === 'cocktailList' }">       
      </button>

      <div 
        v-for="(cocktail, index) in cocktailTree.cocktails" 
        :key="index">
        <button 
          @click="switchToCocktailView(index)">
          <img :src="cocktail.strDrinkThumb"
          class="w-40 h-40 rounded-full object-cover border-2 shadow-2xl"
          :class="{ hidden : currentView === 'ingredient' }">
        </button>
      </div>
    </div>
  </div>

</template>

<style>
  .hidden {
    display: none;
  }
</style>

