<script setup>

  import { ref, nextTick, onMounted } from 'vue';
  import CanvasSegment from './components/CanvasSegment.vue';
  import List from './components/List.vue';
  import Item from './components/Item.vue';
  import Api from './Api';
  import Traversal from './Traversal';

  // data for handling scrolling
  const segColors = ref(['background-color: royalblue', 'background-color: greenyellow']);
  const addedSegs = ref([{ id: 0, color: 'background-color: royalblue' }]);
  let colorIndex = ref(1);
  let inViewIndex = ref(0);

  // other data
  let beenClicked = ref(false);
  let path = ref([['cocktails', null]]);
  let clickedIndex = ref(null);
  const itemLists = ref([]);
  const startSeg = ref([
    {
      strDrink: "3-Mile Long Island Iced Tea",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
      strIngredient1: "Gin",
      strIngredient2: "Light rum",
      strIngredient3: "Tequila"
    },
    {
      strDrink: "69 Special",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg",
      strIngredient4: "Triple sec",
      strIngredient5: "Vodka",
      strIngredient6: "Coca-Cola"
    },
    {
      strDrink: "A1",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
      strIngredient7: "Sweet and sour",
      strIngredient8: "Bitters",
      strIngredient9: "Lemon"
    }
  ]);
  const firstIngSeg = ref([
      {
        strIngredient: "Gin",
        ingredientThumb: "https://www.thecocktaildb.com/images/ingredients/gin-Medium.png"
      },
      {
        strIngredient: "Light rum",
        ingredientThumb: "https://www.thecocktaildb.com/images/ingredients/Light%20rum-Medium.png"
      },
      {
        strIngredient: "Tequila",
        ingredientThumb: "https://www.thecocktaildb.com/images/ingredients/Tequila-Medium.png"
      }
    ]);
  const secondDrinksSeg = ref([
    {
      strDrink: "110 in the shade",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg",
      strIngredient1: "Gin",
      strIngredient2: "Light rum",
      strIngredient3: "Tequila"
    },
    {
      strDrink: "Adam Bomb",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tpxurs1454513016.jpg",
      strIngredient4: "Triple sec",
      strIngredient5: "Vodka",
      strIngredient6: "Coca-Cola"
    },
    {
      strDrink: "Amaretto Stone Sour Alternative",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/wutxqr1472720012.jpg",
      strIngredient7: "Sweet and sour",
      strIngredient8: "Bitters",
      strIngredient9: "Lemon"
    }
    ])
  
  const handleClick = () => {
    // As values are added to the array, the v-for loop automatically induces the app
    // to create additional CanvasSegment components
    addedSegs.value.push({
      id: addedSegs.value.length,
      color: segColors.value[colorIndex.value],
    });
    // change index for picking color
    colorIndex.value = (colorIndex.value + 1) % segColors.value.length;
    // scrolls to the next segment. Done in an imported nextTick() method to assure correct timing
    nextTick(() => {
      const nextSeg = document.querySelectorAll('._segment')[inViewIndex.value + 1];
      if (nextSeg) {
        nextSeg.scrollIntoView({ behavior: 'smooth' });
      }
      inViewIndex.value += 1;
    });
  }

  const handleClickItem = (number) => {
    let indexLastNode = path.value.length - 1;
    let currentItemType = path.value[indexLastNode][0];
    let clickedItem = path.value[indexLastNode][1];

    if(clickedItem === null) {
      path.value[indexLastNode][1] = number;
      if(currentItemType === 'cocktails'){
        path.value.push(['ingredients', null]);
      } else if (currentItemType === 'ingredients'){
        path.value.push(['cocktails', null]);
      }
    } else if (value === number) {

    }
  }
  const clickHandle = () => {

  }
  onMounted( () => itemLists.value.push(startSeg.value));

</script>

<template>
  <div class="_canvas">
    <CanvasSegment 
      v-for="(list, outerIndex) in itemLists"
      :key="outerIndex">
      {{ console.log("value of list: ", list) }}
      <List>
        <Item 
          v-for="(item, innerIndex) in list"
          :itemObjectTree="item"
          :key="innerIndex"
          @click="handleClick">{{ console.log("The item: ", item) }}</Item>
      </List>
    </CanvasSegment>
  </div>
</template>

<style scoped>
._canvas {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
