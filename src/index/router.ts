import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Home from './views/Home.vue';
import MyMusic from './views/myMusic/MyMusic.vue';
import MusicLib from './views/musicLib/MusicLib.vue';
import SongListDetails from './views/songListDetail.vue';
import Song from './views/song.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'app',
      component: App,
      children: [
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
        {
          path: '/songList',
          name: 'songList',
          component: SongListDetails,
        },
        {
          path: '/song',
          name: 'song',
          component: Song,
        },
      ],
    },
  ],
});
