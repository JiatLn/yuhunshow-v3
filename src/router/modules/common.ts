import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/pages/Upload.vue'),
    meta: {
      title: '上传',
    },
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/pages/Analysis.vue'),
    redirect: {
      name: 'MaxSpeed',
    },
    meta: {
      title: '分析',
    },
    children: [
      {
        path: '/analysis/maxSpeed',
        name: 'MaxSpeed',
        component: () => import('@/pages/modules/MaxSpeed.vue'),
        meta: {
          title: '一速',
        },
      },
      {
        path: '/analysis/filter',
        name: 'EquipFilter',
        component: () => import('@/pages/modules/EquipFilter.vue'),
        meta: {
          title: '御魂筛选',
        },
      },
    ],
  },
];

export default routes;
