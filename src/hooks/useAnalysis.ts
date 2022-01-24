import type { IHeroEquip, SuitId } from '@/store/modules/types';
import useHeroEquipStore from '@/store/modules/useHeroEquipStore';
import { EAttrType } from '@/utils/types';
import { ref } from 'vue';

export const useAnalysis = () => {
  const { heroEquips } = useHeroEquipStore();

  const equipByPos = ref<IHeroEquip[][]>([[], [], [], [], [], []]);
  heroEquips.forEach((item) => {
    equipByPos.value[item.pos].push(item);
  });

  const getMaxSpeed = (suitId?: SuitId) => {
    let maxSpeedList: IHeroEquip[] = [];
    let maxSpeedVal = 0;
    let notFound = false;
    for (let pos = 0; pos < 6; pos++) {
      let equips = equipByPos.value[pos];
      // 二号位
      if (pos === 1) {
        equips = equips.filter((i) => i.base_attr.type === EAttrType.SPEED);
      }
      if (suitId) {
        equips = equips.filter((i) => i.suit_id === suitId);
        if (equips.length === 0) {
          notFound = true;
          break;
        }
      }
      let currMax = 0;
      maxSpeedList[pos] = equips[0];
      equips.forEach((item) => {
        let speedVal = getRandomVal(item);
        if (speedVal >= currMax) {
          maxSpeedList[pos] = item;
          currMax = speedVal;
        }
      });
      maxSpeedVal += getRandomVal(maxSpeedList[pos]);
    }
    if (notFound) {
      return { val: 0, list: [] };
    }
    // 加上二号位 主属性
    maxSpeedVal += maxSpeedList[1].base_attr.value;

    return { val: maxSpeedVal, list: maxSpeedList };
  };

  const getSuitMaxSpeed = (suitId?: SuitId) => {
    if (!suitId) {
      return getMaxSpeed();
    }
    let { val, list } = getMaxSpeed(suitId);
    let tmpList = [...list];
    const { list: maxList } = getMaxSpeed();
    let currMax = val;
    let resultList: IHeroEquip[] = [];
    // list 散件最快
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        let tmpSpeed =
          val +
          getRandomVal(maxList[i]) +
          getRandomVal(maxList[j]) -
          getRandomVal(list[i]) -
          getRandomVal(list[j]);

        if (tmpSpeed >= currMax) {
          tmpList[i] = maxList[i];
          tmpList[j] = maxList[j];
          currMax = tmpSpeed;
          resultList = [...tmpList];
          tmpList = [...list];
        }
      }
    }
    return { val: currMax, list: resultList };
  };

  return {
    equipByPos,
    getSuitMaxSpeed,
  };
};

/**
 * 获取御魂的某个副属性的值
 * @param equip
 * @param type
 * @returns number
 */
export const getRandomVal = (equip: IHeroEquip, type: EAttrType = EAttrType.SPEED) => {
  return equip?.random_attrs.find((item) => item.type === type)?.value || 0;
};
