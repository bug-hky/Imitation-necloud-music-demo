import { Commit, Dispatch } from 'vuex';
import { State } from './interface';
const DEFAULT_AUDIO = {
  playing: false,
  currentTime: '0:00:00',
  maxTime: '0:00:00',
};
const state: State = {
  audio: DEFAULT_AUDIO,
  schedule: 0,
};

const getters = {
  audio: (state: State) => state.audio,
  schedule: (state: State) => state.schedule,
};

const mutations = {
  setAudio(state: State, data: any) {
    state.audio = data;
  },
  setSchedule(state: State, sch: any) {
    state.schedule = sch;
  },
};

const actions = {
  setPlay(context: {state: State, commit: Commit}, data: boolean) {
    context.commit('setAudio', Object.assign(state.audio, {playing: data}));
  },
  setCurTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.dispatch('formatSeconds', time).then((res) => {
      context.commit('setAudio', Object.assign(state.audio, { currentTime: res }));
    });
  },
  setMaxTime(context: { state: State, dispatch: Dispatch, commit: Commit }, time: any) {
    context.dispatch('formatSeconds', time).then((res) => {
      context.commit('setAudio', Object.assign(state.audio, { maxTime: res }));
    });
  },
  formatSeconds(context: {}, second: any) {
    const secondType = typeof second;
    if (secondType === 'string' || secondType === 'number') {
      second = parseInt(second, 10);
      const hours = Math.floor(second / 3600);
      second = second - hours * 3600;
      const minutes = Math.floor(second / 60);
      second = second - minutes * 60;
      return `${hours}:${('0' + minutes).slice(-2)}:${('0' + second).slice(-2)}`;
    } else {
      return '0:00:00';
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
