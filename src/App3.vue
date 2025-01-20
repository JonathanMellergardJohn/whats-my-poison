<script setup>

import { onMounted, ref, nextTick } from 'vue';
import Data from './Data'
import CanvasSegment from './components/CanvasSegment.vue';
import Item from './components/Item.vue';

const appData = ref([]);
const clickedItem = ref(null);

const handleClick = async (item, indexOfClicked) => {

  if(clickedItem.value === null) {

    clickedItem.value = indexOfClicked;
  } else {

    if ("strDrink" in item ) {
      // get the ingredients
      let ingredients = await Data.getIngredientsListAsync(item);
      // add ingredients to the appData
      appData.value.push(ingredients);

      nextTick(() => {
        const nextSeg = document.querySelectorAll('._segment')[appData.value.length - 1];

        if (nextSeg) {
          nextSeg.scrollIntoView({ behavior: 'smooth' });
        }
      });

      clickedItem.value = null;

    } else if("strIngredient" in item) {

      let cocktails = await Data.getDrinksListAsync(item.strIngredient, 3);
      appData.value.push(cocktails);

      nextTick(() => {
        const nextSeg = document.querySelectorAll('._segment')[appData.value.length - 1];

        console.log(nextSeg);
        if (nextSeg) {
          nextSeg.scrollIntoView({ behavior: 'smooth' });
        }
      });
      clickedItem.value = null;
    }
  }
}

onMounted(async () => {
  let data = await Data.getDrinksListAsync('Gin', 3);
  appData.value.push(data);
})

</script>

<template>

  <div class="_canvas">
    <CanvasSegment v-for="list in appData">
        <Item 
          v-for="(item, index) in list"
          v-show="clickedItem === null || clickedItem === index"
          :itemObjectTree="item"
          :key="innerIndex"
          @click="handleClick(item, index)"></Item>
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

