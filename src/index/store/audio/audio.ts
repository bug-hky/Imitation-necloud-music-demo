import { Commit, Dispatch } from 'vuex';
import { State } from './interface';
const DEFAULT_AUDIO = {
  playing: false,
  currentTime: 0,
  maxTime: 0,
};
const state: State = {
  audio: DEFAULT_AUDIO,
  handlerSchedule: 0,
};

const getters = {
  audio: (state: State) => state.audio,
  handlerSchedule: (state: State) => state.handlerSchedule,
};

const mutations = {
  setAudio(state: State, data: any) {
    state.audio = data;
  },
  setHandlerSchedule(state: State, data: number) {
    state.handlerSchedule = data;
  },
};

const actions = {
  setPlay(context: {state: State, commit: Commit}, data: boolean) {
    context.commit('setAudio', Object.assign(state.audio, {playing: data}));
  },
  setCurTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.commit('setAudio', Object.assign(state.audio, { currentTime: time }));
  },
  setMaxTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.commit('setAudio', Object.assign(state.audio, { maxTime: time }));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
