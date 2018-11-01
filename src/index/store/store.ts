import Vue from 'vue';
import Vuex from 'vuex';
import { Toast } from 'vant';
import { Commit, Dispatch } from 'vuex';
import home from './home/index';
import myMusic from './home/myMusic';
import song from './song/song';
import { State, User } from './interface';
import { playlistDeatils, getSongUrl, getSongDetails } from '../api/songAbout';
import { logout, getRecord } from '../api/home';

Vue.use(Vuex);
const BLACKTHEME: string = 'black-theme';
const WHITETHEME: string = 'white-theme';
const storageKey: string = window.location.hostname + '_vantUser';
const userTemplate: User = {
  adValid: false,
  bindings: [],
  code: 200,
  createDays: 0,
  createTime: 0,
  level: 0,
  listenSongs: 0,
  peopleCanSeeMyPlayRecord: false,
  profile: {},
};

const state: State = {
  showSideBar: false,
  showSongBar: false,
  theme: BLACKTHEME,
  isDayMode: false,
  user: userTemplate,
  songListId: null,
  songId: null,
  songInfos: {},
  playList: [],
  isPlaying: false,
  songUrl: null,
};

const getters = {
  songUrl: (state: State) => state.songUrl,
  isPlaying: (state: State) => state.isPlaying,
  showSideBar: (state: State) => state.showSideBar,
  showSongBar: (state: State) => state.showSongBar,
  user: (state: State) => state.user,
  theme: (state: State) => state.theme,
  isDayMode: (state: State) => state.isDayMode,
  songListId: (state: State) => state.songListId,
  songId: (state: State) => state.songId,
  songInfos: (state: State) => state.songInfos,
  playList: (state: State) => state.playList,
};

const mutations = {
  tooglePlay(state: State) {
    state.isPlaying = !state.isPlaying;
  },
  toogleSongBar(state: State) {
    state.showSongBar = !state.showSongBar;
  },
  toogleSideBar(state: State) {
    state.showSideBar = !state.showSideBar;
  },
  setUser(state: State, data: User) {
    state.user = data;
  },
  setTheme(state: State, theme: string) {
    state.theme = theme;
  },
  setIsDayMode(state: State, isDayMode: boolean) {
    state.isDayMode = isDayMode;
  },
  setSongId(state: State, data: any) {
    state.songId = data;
  },
  setSongListId(state: State, data: number) {
    state.songListId = data;
  },
  setCurSong(state: State, data: any) {
    state.songInfos = data;
  },
  setSongUrl(state: State, data: string) {
    state.songUrl = data;
  },
  setPlayList(state: State, data: any) {
    state.playList = data;
  },
};

const actions = {
  setPlayList(context: { commit: Commit, dispatch: Dispatch, state: State }, playList: any[]) {
    context.commit('setPlayList', playList);
    if (playList.length > 0 && state.songId === null) {
      context.commit('setCurSong', playList[0]);
      context.dispatch('setSongId', playList[0].id.toString());
    }
  },
  setSongId(context: {commit: Commit, dispatch: Dispatch}, songId: any) {
    context.commit('setSongId', songId.toString());
    context.dispatch('songDetails', songId).then((res: any) => {
      if (res.code === 200) {
        context.commit('setCurSong', res.songs[0]);
        context.dispatch('setSongUrl', songId);
      } else {
        Toast('获取歌曲信息失败');
      }
    });
  },
  changeSong(context: { commit: Commit, dispatch: Dispatch, getters: any }, songId: any) {
    context.commit('setSongId', songId.toString());
    console.log('paly this', context.getters.playList);
    context.getters.playList.map((song: any) => {
      if (song.id === songId) {
        console.log('paly this', song);
        context.commit('setCurSong', song);
        context.dispatch('setSongUrl', songId).then((res: string) => {
          if (res === 'OK') {
            context.commit('tooglePlay');
          }
        });
      }
    });
  },
  setSongUrl(context: { commit: Commit, dispatch: Dispatch }, songId: any) {
    return new Promise((resolve: any, reject: any) => {
      context.dispatch('songUrl', songId).then((url: any) => {
        if (url.code === 200) {
          context.commit('setSongUrl', url.data[0].url);
          resolve('OK');
        } else {
          Toast('获取歌曲失败');
        }
      });
    });
  },
  setIsDayMode(context: { commit: Commit }, isDayMode: boolean) {
    context.commit('setIsDayMode', isDayMode);
    context.commit('setTheme', isDayMode ? WHITETHEME : BLACKTHEME);
  },
  logout(context: { commit: Commit; dispatch: Dispatch }) {
    context.dispatch('backLogout').then((res: any) => {
      if (res.code === 200) {
        window.localStorage.removeItem(storageKey);
        context.commit('setUser', userTemplate);
        window.location.href = 'login.html';
      }
    });
  },
  setUser(context: { commit: Commit }) {
    const originJson: string | null = window.localStorage.getItem(storageKey);
    const userObj: User | null = originJson ? JSON.parse(originJson) : null;
    context.commit('setUser', userObj);
  },
  /* pure api */
  async backLogout(context: any) {
    const res: any = await logout()
      .then((response: any) => response)
      .catch((e: string) => console.log(e));
    return res;
  },
  async songListDetails(context: any, id: number) {
    const res: any = await playlistDeatils(id)
      .then((response: any) => response)
      .catch((e: string) => console.error(e));
    return res;
  },
  async songDetails(context: any, id: string) {
    const res: any = await getSongDetails(id)
      .then((response: any) => response)
      .catch((e: string) => console.error(e));
    return res;
  },
  async songUrl(context: any, id: string) {
    const res: any = await getSongUrl(id)
      .then((response: any) => response)
      .catch((e: string) => console.error(e));
    return res;
  },
  async record(context: any, type: number) {
    const res: any = await getRecord(context.state.user.profile.userId, type)
      .then((response: any) => response)
      .catch((e: string) => console.log(e));
    return res;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    myMusic,
    song,
  },
});
