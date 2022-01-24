<template>
  <div class="warpper shadow flex justify-between items-center px-4">
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div class="logo uppercase">yuhun-show</div>
  </div>
</template>

<script setup lang="ts">
  import { h, ref, computed } from 'vue';
  import { NMenu } from 'naive-ui';
  import { RouterLink, useRoute } from 'vue-router';
  import AppIcon from '@/components/common/AppIcon.vue';

  const route = useRoute();

  const activeKey = computed(() => {
    return route.name as string;
  });

  const menuOptions = ref<any[]>([
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Home',
            },
          },
          { default: () => '首页' }
        ),
      key: 'Home',
      icon: () => h(AppIcon, { icon: 'akar-icons:home' }),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Upload',
            },
          },
          { default: () => '上传' }
        ),
      key: 'Upload',
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'Analysis',
            },
          },
          { default: () => '分析' }
        ),
      key: 'Analysis',
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'MaxSpeed',
                },
              },
              { default: () => '一速' }
            ),
          key: 'MaxSpeed',
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'EquipFilter',
                },
              },
              { default: () => '御魂筛选' }
            ),
          key: 'EquipFilter',
        },
      ],
    },
  ]);
</script>

<style scoped lang="scss"></style>
