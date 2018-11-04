import { SongState } from './interface';
import { State } from '../interface';
import { Commit } from 'vuex';
import { playlistDeatils, getSongUrl } from '../../api/songAbout';

const state: SongState = {
  songList: {},
  song: {},
};

const getters = {
  songList: (state: SongState) => state.songList,
  song: (state: SongState) => state.song,
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
