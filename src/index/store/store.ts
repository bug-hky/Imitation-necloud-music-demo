import Vue from 'vue';
import Vuex from 'vuex';
import home from './home/index';
import { State, User } from './interface';

Vue.use(Vuex);

const state: State = {
  showSideBar: false,
  theme: 'black-theme',
  user: {
    adValid: false,
    bindings: [],
    code: 200,
    createDays: 0,
    createTime: 0,
    level: 0,
    listenSongs: 0,
    peopleCanSeeMyPlayRecord: false,
    profile: {},
  },
};

const getters = {
  showSideBar: (state: State) => state.showSideBar,
  user: (state: State) => state.user,
  theme: (state: State) => state.theme,
};

const mutations = {
  TOOGLESIDEBAR(state: State, data: boolean) {
    state.showSideBar = data;
  },
  SETUSER(state: State, data: User) {
    state.user = data;
  },
  SETTHEME(state: State, theme: string) {
    state.theme = theme;
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
  },
});
