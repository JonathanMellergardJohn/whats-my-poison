import Api from "./Api";
import DataHelper from "./DataHelper";

const Data = {
  getDrinksListAsync: async (ingredientString, numOfDrinks) => {

  let allDrinkStubs = await Api.fetchCocktailsByIngredientAsync(ingredientString);

  let shortenedStubs = allDrinkStubs.slice(0, numOfDrinks);

  let ids = shortenedStubs.map(drink => drink.idDrink);

  let drinks = await Promise.all(
    ids.map( id => Api.fetchSingleCocktailAsync(id))
    );

  return drinks;
  },
  getIngredientsListAsync: async (cocktailObject) => {

    let ingredientStrings = DataHelper.getCocktailIngredientsArray(cocktailObject);

    const fullIngredientData = await Promise.all(
      ingredientStrings.map((ingredient) => Api.fetchSingleIngredientAsync(ingredient))
    );

    fullIngredientData.forEach(data => data.ingredientThumb = `https://www.thecocktaildb.com/images/ingredients/${data.strIngredient}-Medium.png`)

    return fullIngredientData;
  }
}

export default Data;
