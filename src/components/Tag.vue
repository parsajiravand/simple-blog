<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <span class="px-3 py-1 text-xs text-gray-400 border rounded-full">
    {{ tag }}
  </span>
</template>
