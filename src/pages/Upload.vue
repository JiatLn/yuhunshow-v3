<template>
  <div class="warpper">
    <n-upload
      action="#"
      class="flex flex-col justify-center items-center"
      :custom-request="customRequest"
    >
      <n-upload-dragger class="flex flex-col">
        <app-icon class="text-[48px]" icon="akar-icons:cloud-upload" />
        <p class="mb-4">点击或者拖动文件到该区域来上传</p>
        <p>* 只能上传yyx导出的Json文件</p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script setup lang="ts">
  import type { UploadCustomRequestOptions } from 'naive-ui';
  import { NUpload, NUploadDragger } from 'naive-ui';
  import AppIcon from '@/components/common/AppIcon.vue';
  import useHeroEquipStore from '@/store/modules/useHeroEquipStore';
  import { useRouter } from 'vue-router';

  const heroEquipStore = useHeroEquipStore();
  const router = useRouter();

  const customRequest = (uploadFileInfo: UploadCustomRequestOptions) => {
    const reader = new FileReader();
    const { file } = uploadFileInfo.file;
    reader.readAsText(file!);
    reader.onload = () => {
      if (reader.result) {
        const yyxJson = JSON.parse(reader.result as string);
        let heroEquips = yyxJson.data.hero_equips;
        heroEquipStore.loadHeroEquipData(heroEquips);
        router.push({
          name: 'Home',
        });
      }
    };
  };
</script>

<style scoped lang="scss">
  .warpper {
    @apply w-full h-full flex justify-center items-center;
  }
</style>
