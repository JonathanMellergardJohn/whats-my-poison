import axios from 'axios';

const Api = {
  fetchSingleCocktailAsync: async (id) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      return response.data.drinks[0];
    } catch (error) {
    console.log('Error fetching cocktail', error);
    }
  },
  fetchSingleIngredientAsync: async (name) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
      return response.data.ingredients[0];
    } catch (error) {
      console.log('Error fetching ingredient', error);
    }
  },
  fetchCocktailsByIngredientAsync: async (ingredient) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      return response.data.drinks;
    } catch (error) {
      console.log('Error fetching ingredient', error);
    }
  }
}

export default Api;





