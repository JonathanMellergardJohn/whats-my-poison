const DataHelper = {

  returnStrings: (array) => {
    return array.filter((item) => typeof item === "string");
  },

  returnNodeAtPath: (tree, path) => {
    let nodeAtPath = path.reduce((obj, key) => obj?.[key], tree);

    return nodeAtPath;
  },

  getCocktailIngredientsArray: (cocktail) => {

  const keys = Object.keys(cocktail);

  const ingredientKeys = keys.filter((key) => key.startsWith("strIngredient") && cocktail[key] !== null);

  const ingredients = [];

  ingredientKeys.forEach(ingredientKey => {
    ingredients.push(cocktail[ingredientKey]);
  })

  return ingredients;
  }
}

export default DataHelper

