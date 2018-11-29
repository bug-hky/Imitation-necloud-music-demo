import { Commit, Dispatch } from 'vuex';
import { State } from './interface';
const DEFAULT_AUDIO = {
  playing: false,
  currentTime: 0,
  maxTime: 0,
  loud: 50,
};
const state: State = {
  audio: DEFAULT_AUDIO,
  handlerSchedule: 0,
  isNoLoud: false,
};

const getters = {
  audio: (state: State) => state.audio,
  handlerSchedule: (state: State) => state.handlerSchedule,
  isNoLoud: (state: State) => state.isNoLoud,
};

const mutations = {
  setAudio(state: State, data: any) {
    state.audio = data;
  },
  setHandlerSchedule(state: State, data: number) {
    state.handlerSchedule = data;
  },
  setIsNoLoud(state: State, data: boolean) {
    state.isNoLoud = data;
  },
};

const actions = {
  toogleNoLoud(context: { state: State, commit: Commit }) {
    context.commit('setIsNoLoud', !state.isNoLoud);
  },
  setPlay(context: { state: State, commit: Commit }, data: boolean) {
    context.commit('setAudio', Object.assign(state.audio, {playing: data}));
  },
  setCurTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.commit('setAudio', Object.assign(state.audio, { currentTime: time }));
  },
  setMaxTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.commit('setAudio', Object.assign(state.audio, { maxTime: time }));
  },
  setLoud(context: { state: State, dispatch: Dispatch, commit: Commit }, aloud: any) {
    context.commit('setAudio', Object.assign(state.audio, { loud: aloud }));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
