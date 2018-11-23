import { State } from './interface';
import { Commit, Dispatch } from 'vuex';
const SINGLE: number = 1;
const LIST: number = 2;
const RANDOM: number = 3;
const PREV: string = 'prev';
const NEXT: string = 'next';
const state: State = {
  playList: [],
  playType: SINGLE,
  curIndex: 0,
};

const getters = {
  playType: (state: State) => state.playType,
  playList: (state: State) => state.playList,
  curIndex: (state: State) => state.curIndex,
};

const mutations = {
  setPlayType(state: State, data: number) {
    state.playType = data;
  },
  setPlayList(state: State, data: any) {
    state.playList = data;
  },
  setCurIndex(state: State, index: number) {
    state.curIndex = index;
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
  changeListSong(context: { dispatch: Dispatch, state: State }, changetype: string) {
    const playTypeActions = () => {
      const nextSongId = () => {
        const playList: any = state.playList;
        return playList[state.curIndex > playList.length - 1 ? 0 : state.curIndex + 1].id;
      };
      const prevSongId = () => {
        const playList: any = state.playList;
        return playList[state.curIndex === 0 ? state.curIndex : state.curIndex - 1].id;
      };
      const getRandomId = () => {
        const playList: any = state.playList;
        const getRandomIndex = (): number => {
          return Math.floor(Math.random() * playList.length + 1) - 1;
        };
        return playList[getRandomIndex()].id;
      };
      return new Map([
        [/^next_[1-2]$/, nextSongId()],
        [/^next_3$/, getRandomId()],
        [/^prev_[1-3]$/, prevSongId()],
      ]);
    };
    const target = [...playTypeActions()].filter(([key, value]) => (key.test(`${changetype}_${state.playType}`)));
    const res = target.map(([key, value]) => value);
    context.dispatch('changeSong', res[0]);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
