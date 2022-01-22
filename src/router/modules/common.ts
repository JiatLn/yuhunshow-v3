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
];

export default routes;
