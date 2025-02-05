<template>
  <div class="container">
    <div 
      v-for="(box, index) in boxes" 
      :key="index" 
      class="box" 
      :class="{ active: selectedIndex === index }"
      @click="moveToCenter(index)"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxes: [1, 2, 3], // Just placeholders to create boxes dynamically
      selectedIndex: null
    };
  },
  methods: {
    moveToCenter(index) {
      this.selectedIndex = index;
    }
  }
};
</script>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: red;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.box {
  height: 200px;
  width: 200px;
  background-color: DarkCyan;
  transition: transform 0.5s ease, opacity 0.5s ease;
  margin: 0 10px;
}

.box.active {
  transform: translateX(0);
}

.box:not(.active) {
  opacity: 0;
  pointer-events: none;
}
</style>
