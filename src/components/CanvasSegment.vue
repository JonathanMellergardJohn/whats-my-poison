<script setup>
import { defineProps } from 'vue';

defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<template>

  <div class="h-dvh flex justify-center items-center _segment" :style="color">
    <slot></slot>
  </div>

</template>

<style scoped>

</style>
