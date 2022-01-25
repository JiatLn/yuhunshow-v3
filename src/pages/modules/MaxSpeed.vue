<template>
  <div class="warpper h-full w-full flex">
    <n-data-table
      size="small"
      :columns="columnsLeft"
      :data="allMaxSpeed"
      class="w-1/2"
      :style="{ height: `calc(100vh - 42px)` }"
      flex-height
      :row-key="(item) => item.suitId"
    />
    <n-data-table
      size="small"
      :columns="columnsRight"
      :data="chooseData"
      class="w-1/2"
      :style="{ height: `calc(100vh - 42px)` }"
      flex-height
      :row-key="(item) => item.id"
    />
  </div>
</template>

<script setup lang="tsx">
  import EquipItem from '@/components/EquipItem.vue';
  import type { ISuitData } from '@/hooks/useAnalysis';
  import { useAnalysis } from '@/hooks/useAnalysis';
  import { NButton, NDataTable, NTooltip } from 'naive-ui';
  import { onMounted, ref } from 'vue';

  import { AttrSimpleMap } from '@/assets/data/translateMap';
  import { getAttrValue, getValueWithFmt } from '@/utils/equip';
  import { EAttrType } from '@/utils/types';
  import { roundWithDigit } from '@/utils/math';
  import useHeroEquipStore from '@/store/modules/useHeroEquipStore';
  import type { IHeroEquip } from '@/store/modules/types';

  const { allMaxSpeed } = useAnalysis();

  const { addExcludeEquip, removeExcludeEquip } = useHeroEquipStore();
  onMounted(() => {
    removeExcludeEquip([]);
  });
  interface IChooseData extends ISuitData {
    id: string;
  }
  const chooseData = ref<IChooseData[]>([]);

  const columnsLeft = ref<any[]>([
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: (rowData: ISuitData) => {
        return (
          <div class="*flex-center w-full flex-row flex-wrap gap-2 p-2">
            {rowData.list.map((item: IHeroEquip) => {
              return <EquipItem equip={item} showDigit={true} />;
            })}
          </div>
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
        return (
          <NTooltip trigger="hover">
            {{
              default: () => row.val,
              trigger: () => roundWithDigit(row.val, 2),
            }}
          </NTooltip>
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
    {
      title: '操作',
      key: 'exclude',
      align: 'center',
      render(row: ISuitData) {
        return (
          <NButton
            onClick={() => {
              addExcludeEquip(row.list.map((item) => item.id));
              chooseData.value.push({
                ...row,
                id: `${row.suitId}-${chooseData.value.length}`,
              });
            }}>
            排除
          </NButton>
        );
      },
    },
  ]);

  const columnsRight = ref<any[]>([
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: (rowData: ISuitData) => {
        return (
          <div class="*flex-center w-full flex-row flex-wrap gap-2 p-2">
            {rowData.list.map((item: IHeroEquip) => {
              return <EquipItem equip={item} showDigit={true} />;
            })}
          </div>
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
        return (
          <NTooltip trigger="hover">
            {{
              default: () => row.val,
              trigger: () => roundWithDigit(row.val, 2),
            }}
          </NTooltip>
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
    {
      title: '操作',
      key: 'delete',
      align: 'center',
      render(row: IChooseData) {
        return (
          <NButton
            onClick={() => {
              const idx = chooseData.value.findIndex((item) => item.id === row.id);
              chooseData.value.splice(idx, 1);
              removeExcludeEquip(row.list.map((item: IHeroEquip) => item.id));
            }}>
            删除
          </NButton>
        );
      },
    },
  ]);
</script>

<style scoped lang="scss"></style>
