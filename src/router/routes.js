const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'tags',
        path: 'tags',
        component: () => import('src/pages/Tagds/Index.vue'),
      },
      {
        name: 'tagsShow',
        path: 'tags/show/:id',
        component: () => import('src/pages/Tagds/Show.vue'),
      },
      {
        name: 'tagsAdd',
        path: 'tags/add',
        component: () => import('src/pages/Tagds/Add.vue'),
      },
      {
        name: 'stock',
        path: 'stock',
        component: () => import('src/pages/Stock/Index.vue'),
      },
      {
        name: 'stockShow',
        path: 'stock/show/:id',
        component: () => import('src/pages/Stock/Show.vue'),
      },
      {
        name: 'stockAdd',
        path: 'stock/add',
        component: () => import('src/pages/Stock/Add.vue'),
      },
      {
        name: 'profileShow',
        path: 'profile/:id',
        component: () => import('src/pages/Profile/Show.vue'),
      },
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'signIn',
        path: '',
        component: () => import('pages/SignIn/Index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
