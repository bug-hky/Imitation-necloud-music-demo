import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyMusic from './views/myMusic/MyMusic.vue';
import MusicLib from './views/musicLib/MusicLib.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'default',
          component: MusicLib,
        },
        {
          path: '/myMusic',
          name: 'myMusic',
          component: MyMusic,
        },
        {
          path: '/musicLib',
          name: 'musicLib',
          component: MusicLib,
        },
      ],
    },
    // {
    //    path: '/user',
    //    name: 'user',
    //    component: () => import(/* webpackChunkName: 'User' */ './views/User.vue'),
    // },
  ],
});
