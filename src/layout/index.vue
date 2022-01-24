<template>
  <div class="app flex flex-col h-full w-full">
    <TheNav />
    <router-view class="flex-1" />
  </div>
</template>

<script setup lang="ts">
  import TheNav from '@/components/TheNav.vue';
</script>

<style scoped lang="scss"></style>
