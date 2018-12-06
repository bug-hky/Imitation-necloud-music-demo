import { State } from './interface';
import { Commit, Dispatch } from 'vuex';
import { Toast } from 'vant';
import { playlistDeatils, getSongUrl } from '../../api/songAbout';

const state: State = {
  songId: null,
  songInfos: {},
  songUrl: null,
  lyrics: {},
};

const getters = {
  songId: (state: State) => state.songId,
  songInfos: (state: State) => state.songInfos,
  songUrl: (state: State) => state.songUrl,
  lyrics: (state: State) => state.lyrics,
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
  setLyrics(state: State, data: any) {
    state.lyrics = data;
  },
};

const actions = {
  setPlayList(
  context: { commit: Commit, dispatch: Dispatch, state: State },
  params: { playList: any[], isDefault: boolean }) {
    const changePlayList = (plList: any[]) => {
      context.commit('setPlayList', plList);
      if (plList.length > 0) {
        context.commit('setCurSong', plList[0]);
        context.dispatch('setSongId', plList[0].id.toString());
      }
    };
    const actions = new Map([
      [true, state.songId === null],
      [false, true],
    ]);
    if (actions.get(params.isDefault)) {
      changePlayList(params.playList);
    }
  },
  setSongId(context: { commit: Commit, dispatch: Dispatch, state: State, rootState: any}, songId: any) {
    context.commit('setSongId', songId.toString());
    context.dispatch('songDetails', songId).then((res: any) => {
      if (res.code === 200) {
        context.commit('setCurSong', res.songs[0]);
        context.dispatch('setSongUrl', songId);
        context.dispatch('getSongLyric', songId);
      } else {
        Toast('获取歌曲信息失败');
      }
    });
    // if (!context.rootState.playList.playList.map((res: any) => res.id).includes(songId)) {
    //   context.dispatch('setPlayList', {
    //     playList: context.rootState.songList.songList,
    //     isDefault: false,
    //   });
    // }
  },
  changeSong(context: { commit: Commit, dispatch: Dispatch, getters: any }, songId: any) {
    context.commit('setSongId', songId.toString());
    // console.log('paly this', context.getters.playList.map((res: any) => res.id), songId);
    context.getters.playList.map((song: any, index: number) => {
      if (song.id === songId) {
        console.log('paly this', song);
        context.commit('setCurSong', song);
        context.commit('setCurIndex', index);
        context.dispatch('getSongLyric', songId);
        context.dispatch('setSongUrl', songId).then((res: string) => {
          if (res === 'OK') {
            context.dispatch('setPlay', false);
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
  getSongLyric(context: { commit: Commit, dispatch: Dispatch }, songId: any) {
    return new Promise((resolve: any, reject: any) => {
      context.dispatch('lyric', songId).then((lyric: any) => {
        if (lyric.code === 200) {
          context.commit('setLyrics', lyric.lrc ? lyric.lrc.lyric : '此歌曲暂无歌词');
          resolve('OK');
        } else {
          Toast('获取歌词失败');
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
