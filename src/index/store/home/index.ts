import { State } from '../interface';
import { Commit } from 'vuex';
import { getMovieList } from '@/index/api/home';

const state = {
};

const getters = {
  // tslint:disable-next-line:no-shadowed-variable
};

const mutations = {
};

const actions = {
  // async movieList(context: { commit: Commit }, cate: string) {
  //   const res: any = await getMovieList(cate)
  //     .then((response: any) => response)
  //     // tslint:disable-next-line:no-console
  //     .catch((e: string) => console.error(e));
  //   return res;
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
