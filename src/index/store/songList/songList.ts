import { State } from './interface';
import { Commit } from 'vuex';
import { playlistDeatils, getSongUrl } from '../../api/songAbout';

const state: State = {
  songListId: null,
  songList: {},
};

const getters = {
  songListId: (state: State) => state.songListId,
  songList: (state: State) => state.songList,
};

const mutations = {
  setSongListId(state: State, data: number) {
    state.songListId = data;
  },
  setSongList(state: State, data: any) {
    state.songList = data;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
