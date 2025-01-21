<script setup>

import { onMounted, ref, nextTick } from 'vue';
import Data from './Data'
import TestComponent from './components/TestComponent.vue';
import CanvasSegment from './components/CanvasSegment.vue';
import Item from './components/Item.vue';

const appData = ref([]);
const clickedItem = ref({});

const handleClick = async (item, segmentIndex, itemIndex) => {

  let justClickedItem = { segmentIndex: segmentIndex, itemIndex: itemIndex };

  if(clickedItem.value.segmentIndex === justClickedItem.segmentIndex && clickedItem.value.itemIndex === justClickedItem.itemIndex) {
      nextTick(() => {
        const nextSeg = document.querySelectorAll('._segment')[appData.value.length - 1];

        if (nextSeg) {
          nextSeg.scrollIntoView({ behavior: 'smooth' });
        }
      });

  } else {

    if ("strDrink" in item ) {
      // get the ingredients
      let ingredients = await Data.getIngredientsListAsync(item);
      // add ingredients to the appData
      appData.value.push(ingredients);

      clickedItem.value = justClickedItem;

    } else if("strIngredient" in item) {

      let cocktails = await Data.getDrinksListAsync(item.strIngredient, 3);
      appData.value.push(cocktails);

      clickedItem.value = justClickedItem;
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
    <CanvasSegment v-for="(list, segmentIndex) in appData">
        <Item 
          v-for="(item, itemIndex) in list"
          v-show="clickedItem.segmentIndex === segmentIndex && clickedItem.itemIndex === itemIndex || clickedItem.segmentIndex !== segmentIndex"
          :itemObjectTree="item"
          :key="itemIndex"
          @click="handleClick(item, segmentIndex, itemIndex)"></Item>
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
