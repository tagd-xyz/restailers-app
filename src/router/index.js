import { route } from 'quasar/wrappers';
import {
  createRouter,
  // createMemoryHistory,
  createWebHistory,
  // createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from '../stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  // const createHistory = process.env.SERVER
  //   ? createMemoryHistory
  //   : process.env.VUE_ROUTER_MODE === 'history'
  //   ? createWebHistory
  //   : createWebHashHistory;

  const store = useAuthStore();

  // const Router = createRouter({
  //   scrollBehavior: () => ({ left: 0, top: 0 }),
  //   routes,

  //   // Leave this as is and make changes in quasar.conf.js instead!
  //   // quasar.conf.js -> build -> vueRouterMode
  //   // quasar.conf.js -> build -> publicPath
  //   history: createHistory(process.env.VUE_ROUTER_BASE),
  // });

  const Router = createRouter({
    history: createWebHistory('/'),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
  });

  Router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      (!store.isSignedIn || !store.isEnabled)
    ) {
      next({ name: 'signIn', query: { next: to.fullPath } });
    } else {
      next();
    }
  });

  return Router;
});
