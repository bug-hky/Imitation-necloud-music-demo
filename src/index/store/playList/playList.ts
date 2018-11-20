import { State } from './interface';
import { Commit } from 'vuex';
import { playlistDeatils, getSongUrl } from '../../api/songAbout';
const SINGLE = 1;
const LIST = 2;
const RANDOM = 3;
const state: State = {
  playList: [],
  playType: 1,
};

const getters = {
  playType: (state: State) => state.playType,
  playList: (state: State) => state.playList,
};

const mutations = {
  setPlayType(state: State, data: number) {
    state.playType = data;
  },
  setPlayList(state: State, data: any) {
    state.playList = data;
  },
};

const actions = {
  changePlayType(context: { commit: Commit, state: State }) {
    let nextType: any = state.playType;
    if (nextType === RANDOM) {
      nextType = SINGLE;
    } else {
      nextType++;
    }
    context.commit('setPlayType', nextType);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
