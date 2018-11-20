import Vue from 'vue';
import Vuex from 'vuex';
import { Toast } from 'vant';
import { Commit, Dispatch } from 'vuex';
import home from './home/index';
import myMusic from './home/myMusic';
import song from './song/song';
import songList from './songList/songList';
import playList from './playList/playList';
import audio from './audio/audio';
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
};

const getters = {
  showSideBar: (state: State) => state.showSideBar,
  showSongBar: (state: State) => state.showSongBar,
  user: (state: State) => state.user,
  theme: (state: State) => state.theme,
  isDayMode: (state: State) => state.isDayMode,
};

const mutations = {
  setSongBar(state: State, data: boolean) {
    state.showSongBar = data;
  },
  setSideBar(state: State, data: boolean) {
    state.showSideBar = data;
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
};

const actions = {
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
    audio,
    songList,
    playList,
  },
});
