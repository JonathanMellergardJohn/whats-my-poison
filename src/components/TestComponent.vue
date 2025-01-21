<script setup>
import { ref } from 'vue';

// Reactive state
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
]);

const selectedItemId = ref(null); // Track the selected item ID

// Method to handle item selection
const selectItem = (id) => {
  selectedItemId.value = id;
};
</script>



<template>
  <div class="container">
    <div 
      v-for="item in items" 
      :key="item.id" 
      :class="{'item': true, 'selected': item.id === selectedItemId, 'hidden': selectedItemId && item.id !== selectedItemId}" 
      @click="selectItem(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped>

  .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  height: 100vh;
}

.item {
  flex: 0 1 20%; /* Adjust as needed */
  margin: 10px;
  padding: 20px;
  text-align: center;
  background: lightblue;
  transition: all 0.5s ease-in-out;
}

.item.selected {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex: 0 1 auto;
  width: auto;
  height: auto;
  z-index: 10;
}

.item.hidden {
  opacity: 0;
  pointer-events: none;
}


</style>
