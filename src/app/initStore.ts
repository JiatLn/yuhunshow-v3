import { initUserStore } from '@/store/modules/useUserStore';
import { initHeroEquipStore } from '@/store/modules/useHeroEquipStore';

export const initStore = () => {
  initUserStore();
  initHeroEquipStore();
};
