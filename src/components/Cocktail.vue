<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const cocktailTree = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11003');
    cocktailTree.value = response.data;
  } catch (error) {
    console.log('Error fetching cocktail', error)
  }
})

console.log(cocktailTree);

</script>


<template>
<button>{{ }}</button>
</template>
