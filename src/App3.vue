<script setup>

import { onMounted, ref, nextTick } from 'vue';
import Data from './Data'
import TestComponent from './components/TestComponent.vue';
import CanvasSegment from './components/CanvasSegment.vue';
import Item from './components/Item.vue';

const appData = ref([]);
const clickedItem = ref({});
const offsetX = ref(0);

const handleClick = async (item, segmentIndex, itemIndex, event) => {

  let justClickedItem = { segmentIndex: segmentIndex, itemIndex: itemIndex };

  if(clickedItem.value.segmentIndex === justClickedItem.segmentIndex && clickedItem.value.itemIndex === justClickedItem.itemIndex) {
      nextTick(() => {
        const nextSeg = document.querySelectorAll('._segment')[appData.value.length - 1];   
        offsetX.value = 0;
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

      const viewportCenter = window.innerWidth / 2;
      const itemRect = event.target.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;

      offsetX.value = viewportCenter - itemCenter; 

    } else if("strIngredient" in item) {

      let cocktails = await Data.getDrinksListAsync(item.strIngredient, 3);
      appData.value.push(cocktails);

      clickedItem.value = justClickedItem;

      const viewportCenter = window.innerWidth / 2;
      const itemRect = event.target.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;

      offsetX.value = viewportCenter - itemCenter; 
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
      <div class="item-list" :style="{transform: `translateX(${offsetX}px)`}">
        <Item
          v-for="(item, itemIndex) in list"
          :class="{ faded: clickedItem.segmentIndex === segmentIndex && clickedItem.itemIndex !== itemIndex }"
          :itemObjectTree="item"
          :key="itemIndex"
          @click="(event) => handleClick(item, segmentIndex, itemIndex, event)"></Item>
      </div>     
    </CanvasSegment>
  </div>
</template>

<style scoped>
  .item-list {
    display: flex;
    gap: 10px;
    position: relative;
    transition: transform 0.5s ease;
  }
  ._canvas {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .faded {
    opacity: 0;
    transition: opacity 0.3s ease; /* Smooth fading */
  }
</style>
