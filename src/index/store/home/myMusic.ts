import { State, User } from '../interface';
import { Commit } from 'vuex';
import { playlist, getSubCount } from '../../api/myMusic';

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  async userSongList(context: { commit: Commit; rootState: State }) {
    const uid: any = context.rootState.user.profile.userId;
    const res: any = await playlist(uid)
      .then((response: any) => response)
      .catch((e: string) => console.error(e));
    return res;
  },
  async userCount(context: { commit: Commit; rootState: State }) {
    const res: any = await getSubCount()
      .then((response: any) => response)
      .catch((e: string) => console.error(e));
    return res;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
