import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Toast } from 'vant';
import localCache from '@/utils/cache';

declare module 'vue-router' {
  interface RouteMeta {
    leave: number;
    isTokenAccess?: boolean;
    isNoSaveScroll?: boolean;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Main' },
  },
  {
    name: 'Main',
    meta: { leave: 1 },
    component: () => import('@/views/main/Main.vue'),
    path: '/main',
  },
  {
    name: 'Translate',
    meta: { leave: 1 },
    component: () => import('@/views/translate/translate.vue'),
    path: '/translate',
  },
  {
    name: 'Vocabulary',
    meta: {
      leave: 1,
      isNoTokenAccess: true,
    },
    component: () => import('@/views/vocabulary/vocabulary.vue'),
    path: '/vocabulary',
  },
  {
    name: 'WordList',
    meta: {
      leave: 2,
      isNoSaveScroll: true,
    },
    component: () => import('@/views/vocabulary/word_list/WordList.vue'),
    path: '/vocabulary/wordlist',
    props: (route) => ({ vocaName: route.query.voca_name }),
  },
  {
    name: 'Profile',
    meta: {
      leave: 1,
      isNoTokenAccess: true,
    },
    component: () => import('@/views/profile/Profile.vue'),
    path: '/profile',
  },
  {
    name: 'Word',
    meta: { leave: 1 },
    path: '/word',
    component: () => import('@/views/word/Word.vue'),
    children: [
      {
        name: 'SearchHistory',
        meta: { leave: 2 },
        path: '',
        components: {
          default: () => import('@/views/word/history/History.vue'),
          header: () => import('@/views/word/components/WordHeader.vue'),
        },
      },
      {
        name: 'WordDetail',
        meta: { leave: 2 },
        path: ':wordName',
        components: {
          default: () => import('@/components/word_trans/WordTrans.vue'),
          header: () => import('@/views/word/components/WordHeader.vue'),
        },
      },
      {
        name: 'VocaWordDetail',
        meta: { leave: 2 },
        path: 'voca/:wordName',
        components: {
          default: () => import('@/components/word_trans/WordTrans.vue'),
          header: () => import('@/views/word/components/VocaWordHeader.vue'),
        },
      },
    ],
  },
  {
    name: 'Login',
    meta: { leave: 2 },
    component: () => import('@/views/login/login.vue'),
    path: '/login',
  },
  {
    name: 'SignUp',
    meta: { leave: 3 },
    component: () => import('@/views/signup/Signup.vue'),
    path: '/signup',
  },
  {
    name: 'Other',
    meta: { leave: 2, isNoSaveScroll: true },
    component: () => import('@/views/other/Other.vue'),
    path: '/other/:name',
  },
];

const scrollY: { [key: string]: number } = {};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    return { top: scrollY[to.path] || 0 };
  },
});

router.beforeEach(async (to, from) => {
  // 记录滚动高度
  scrollY[from.path] = from.meta.isNoSaveScroll ? 0 : window.scrollY;

  // 无token从登录、注册页跳转至需要token的页面时，重定向至首页
  const token = localCache.getCache('token');
  if (typeof from.name === 'string' && /^Login|SignUp$/.test(from.name)) {
    if (to.meta.isNoTokenAccess && !token) {
      return { name: 'Main' };
    }
  }

  // 进入需要 token 的页面
  if (to.meta.isNoTokenAccess && !token) {
    Toast({ message: '您还没有登录，请登录！' });
    return { name: 'Login' };
  }

  return true;
});

export default router;
