<template>
  <div class="container">
    <div
      class="square red"
      :class="{ center: activeSquare === 'red' }"
      @click="moveToCenter('red')"
    ></div>
    <div
      class="square green"
      :class="{ center: activeSquare === 'green' }"
      @click="moveToCenter('green')"
    ></div>
    <div
      class="square orange"
      :class="{ center: activeSquare === 'orange' }"
      @click="moveToCenter('orange')"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeSquare = ref(''); // to track which square is clicked

const moveToCenter = (square) => {
  activeSquare.value = square;
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* This keeps the layout centered */
  align-items: center;
  width: 100%;
  height: 200px;
}

.square {
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.orange {
  background-color: orange;
}

.center {
  transform: scale(1.2); /* Make the clicked square bigger */
  opacity: 1;
}

.square:not(.center) {
  opacity: 0.5;
}
</style>
