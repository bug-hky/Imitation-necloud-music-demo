import { State } from './interface';
import { Commit, Dispatch } from 'vuex';
import { Toast } from 'vant';
import { playlistDeatils, getSongUrl } from '../../api/songAbout';

const state: State = {
  songId: null,
  songInfos: {},
  songUrl: null,
};

const getters = {
  songId: (state: State) => state.songId,
  songInfos: (state: State) => state.songInfos,
  songUrl: (state: State) => state.songUrl,
};

const mutations = {
  setSongId(state: State, data: any) {
    state.songId = data;
  },
  setCurSong(state: State, data: any) {
    state.songInfos = data;
  },
  setSongUrl(state: State, data: string) {
    state.songUrl = data;
  },
};

const actions = {
  setPlayList(context: { commit: Commit, dispatch: Dispatch, state: State }, playList: any[]) {
    context.commit('setPlayList', playList);
    if (playList.length > 0 && state.songId === null) {
      context.commit('setCurSong', playList[0]);
      context.dispatch('setSongId', playList[0].id.toString());
    }
  },
  setSongId(context: { commit: Commit, dispatch: Dispatch }, songId: any) {
    context.commit('setSongId', songId.toString());
    context.dispatch('songDetails', songId).then((res: any) => {
      if (res.code === 200) {
        context.commit('setCurSong', res.songs[0]);
        context.dispatch('setSongUrl', songId);
      } else {
        Toast('获取歌曲信息失败');
      }
    });
  },
  changeSong(context: { commit: Commit, dispatch: Dispatch, getters: any }, songId: any) {
    context.commit('setSongId', songId.toString());
    console.log('paly this', context.getters.playList);
    context.getters.playList.map((song: any) => {
      if (song.id === songId) {
        console.log('paly this', song);
        context.commit('setCurSong', song);
        context.dispatch('setSongUrl', songId).then((res: string) => {
          if (res === 'OK') {
            context.dispatch('setPlay', true);
          }
        });
      }
    });
  },
  setSongUrl(context: { commit: Commit, dispatch: Dispatch }, songId: any) {
    return new Promise((resolve: any, reject: any) => {
      context.dispatch('songUrl', songId).then((url: any) => {
        if (url.code === 200) {
          context.commit('setSongUrl', url.data[0].url);
          resolve('OK');
        } else {
          Toast('获取歌曲失败');
        }
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
