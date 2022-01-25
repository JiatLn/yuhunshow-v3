import { defineStore } from 'pinia';

import type { IHeroEquip } from './types';

const useHeroEquipStore = defineStore({
  id: 'heroEquip',
  state: () => {
    return {
      heroEquips: [] as IHeroEquip[],
      excludeEquips: [] as string[],
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
    includeEquips() {
      return this.heroEquips.filter((item) => !this.excludeEquips.includes(item.id));
    },
    addExcludeEquip(ids: string[]) {
      ids.forEach((id) => {
        if (!this.excludeEquips.includes(id)) {
          this.excludeEquips.push(id);
        }
      });
    },
    removeExcludeEquip(ids: string[]) {
      if (ids.length === 0) {
        this.excludeEquips = [];
        console.log(this.excludeEquips);
        return;
      }
      ids.forEach((id) => {
        if (this.excludeEquips.includes(id)) {
          let idx = this.excludeEquips.findIndex((item) => item === id);
          this.excludeEquips.splice(idx, 1);
        }
      });
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
