<template>
  <div class="warpper h-full w-full">
    <n-data-table
      size="small"
      :columns="columns"
      :data="data"
      class="w-1/2"
      :style="{ height: `calc(100vh - 42px)` }"
      flex-height
      :row-key="(item) => item.suitId"
    />
  </div>
</template>

<script setup lang="ts">
  import EquipItem from '@/components/EquipItem.vue';
  import { useAnalysis } from '@/hooks/useAnalysis';
  import { NDataTable, NTooltip } from 'naive-ui';
  import { ref, h } from 'vue';
  import { suitOpts } from '@/assets/data/yuhunInfo';
  import type { IHeroEquip } from '@/store/modules/types';
  import { AttrSimpleMap } from '@/assets/data/translateMap';
  import { getAttrValue, getValueWithFmt } from '@/utils/equip';
  import { EAttrType } from '@/utils/types';
  import { roundWithDigit } from '@/utils/math';

  const { getSuitMaxSpeed } = useAnalysis();

  interface ISuitData {
    suitId: number;
    suitName: string;
    val: number;
    list: IHeroEquip[];
  }

  const data: ISuitData[] = suitOpts
    .map((item) => ({
      suitName: item.label,
      suitId: item.value,
      ...getSuitMaxSpeed(item.value),
    }))
    .sort((a, b) => b.val - a.val)
    .filter((item) => item.val > 120 && item.list.length === 6);

  const columns = ref<any[]>([
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: (rowData: ISuitData) => {
        return h(
          'div',
          {
            class: ['flex justify-center items-center w-full flex-row flex-wrap gap-2 p-2'],
          },
          rowData.list.map((item) => {
            return h(EquipItem, {
              equip: item,
              showDigit: true,
            });
          })
        );
      },
    },
    {
      title: '套装',
      key: 'suitName',
      align: 'center',
    },
    {
      title: '速度',
      key: 'val',
      align: 'center',
      render(row: ISuitData) {
        return h(
          NTooltip,
          { trigger: 'hover' },
          { default: () => row.val, trigger: () => roundWithDigit(row.val, 2) }
        );
      },
    },
    {
      title: '主属性',
      key: 'list',
      align: 'center',
      render(row: ISuitData) {
        return (
          AttrSimpleMap[row.list[1].base_attr.type] +
          '-' +
          AttrSimpleMap[row.list[3].base_attr.type] +
          '-' +
          AttrSimpleMap[row.list[5].base_attr.type]
        );
      },
    },
    {
      title: '效果命中',
      key: 'hit',
      align: 'center',
      render(row: ISuitData) {
        let val = 0;
        row.list.forEach((item) => {
          val += getAttrValue(item.random_attrs, EAttrType.EFFECT_HIT);
        });
        if (row.list[3].base_attr.type === EAttrType.EFFECT_HIT) {
          return `${getValueWithFmt(
            row.list[3].base_attr.value,
            EAttrType.EFFECT_HIT,
            0
          )}+${getValueWithFmt(val, EAttrType.EFFECT_HIT, 0)}`;
        }
        return getValueWithFmt(val, EAttrType.EFFECT_HIT, 0);
      },
    },
    {
      title: '效果抵抗',
      key: 'resist',
      align: 'center',
      render(row: ISuitData) {
        let val = 0;
        row.list.forEach((item) => {
          val += getAttrValue(item.random_attrs, EAttrType.EFFECT_RESIST);
        });
        if (row.list[3].base_attr.type === EAttrType.EFFECT_RESIST) {
          return `${getValueWithFmt(
            row.list[3].base_attr.value,
            EAttrType.EFFECT_RESIST,
            0
          )}+${getValueWithFmt(val, EAttrType.EFFECT_RESIST, 0)}`;
        }
        return getValueWithFmt(val, EAttrType.EFFECT_RESIST, 0);
      },
    },
  ]);
</script>

<style scoped lang="scss"></style>
