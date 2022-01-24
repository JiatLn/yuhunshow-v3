<template>
  <p>首页</p>
</template>

<script setup lang="ts">
  import useHeroEquipStore from '@/store/modules/useHeroEquipStore';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const heroEquipStore = useHeroEquipStore();

  onMounted(() => {
    if (!heroEquipStore.hasData()) {
      router.push({
        name: 'Upload',
      });
    }
  });
</script>

<style lang="scss" scoped></style>
