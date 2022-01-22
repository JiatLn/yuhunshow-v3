import { defineStore } from 'pinia';

import type { IHeroEquip } from './types';

const useHeroEquipStore = defineStore({
  id: 'heroEquip',
  state: () => {
    return {
      heroEquips: [] as IHeroEquip[],
    };
  },
  actions: {
    loadHeroEquipData(data: IHeroEquip[]) {
      this.$patch({
        heroEquips: [...data],
      });
    },
    hasData(): Boolean {
      return this.heroEquips.length > 0;
    },
    clearEquipData() {
      this.heroEquips = [];
      localStorage.removeItem(this.$id);
    },
  },
});

export const initHeroEquipStore = () => {
  const instance = useHeroEquipStore();
  instance.$subscribe((mutation, state) => {
    localStorage.setItem(instance.$id, JSON.stringify(state));
  });

  const val = localStorage.getItem(instance.$id);
  if (val) {
    instance.$state = JSON.parse(val);
  }
};

export default useHeroEquipStore;
