<template>
  <van-row class="song-list-details">
    <topBar :title="'歌单'" />
    <van-row class="song-list-cont">
      <van-row class="song-list-infos flex column justify-between">
        <div class="filter-bg default-bg">
          <!-- <img :src="songLists.coverImgUrl" alt="song-list-bg"/> -->
        </div>
        <section class="song-list-base flex row justify-start align-center">
          <div class="song-list-img-box flex row justify-center align-center">
            <img :src="songLists.coverImgUrl" alt="song-list-bg" class="song-list-img"/>
          </div>
          <div class="song-list-title-box flex column justify-around align-start">
            <h2 class="song-list-title base-font">{{songLists.name}}</h2>
            <div class="song-list-author flex row justify-start align-center">
              <img :src="userBg" alt="user-header" class="user-header vt-m r-10" />
              <a class="user-name base-font">{{`${userName} >`}}</a>
            </div>
          </div>
        </section>
        <section class="song-list-actions">
          <!-- <van-icon class="song-list-action"></van-icon> -->
        </section>
      </van-row>
      <van-row class="song-list-ul">
        <div class="song-list-title flex row justify-start align-center">
          <i class="iconfont icon-pause vt-m l-10 r-10 base-font" @click="playCurSongList"></i>
          <span class="base-font song-play-all vt-m r-5">播放全部</span>
          <span class="default-font song-all-number">{{`(共${allNumber})首`}}</span>
        </div>
        <baseItem v-for="(song, index) in realList" :key="song.id" :index="index + 1" :type="'song'" :data="song"/>
      </van-row>
    </van-row>
    <songBar :isBar="true" />
  </van-row>
</template>
    
<script lang="ts">
  /*
  @prop
    datas
  */
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import { Menu } from '../store/interface';
  import baseItem from '../components/baseItem.vue';
  import topBar from '../components/topBar.vue';
  import songBar from './song.vue';

  @Component({
    components: {
      baseItem,
      topBar,
      songBar,
    },
  })
  export default class SongListDetails extends Vue {
    private songLists: any = [];
    private defaultImg: any = require('../assets/coverall.png');
    @State('theme') private theme: string;
    @Getter('songList') private songList: any;
    @Getter('songListId') private songListId: number;
    @Mutation('setSongList') private setSongList: any;
    @Action('songListDetails') private songListDetails: any;
    @Action('setPlayList') private setPlayList: any;

    @Watch('songListId', {immediate: true, deep: true})
    private onSongListIdChanged(val: number, oldVal: number) {
      this.songListDetails(val).then((res: any) => {
        if (res.code === 200) {
          this.songLists = res.playlist;
          this.setSongList(this.songLists.tracks);
          console.log('this.songLists', this.songLists);
        }
      });
    }

    get realList() {
      return this.songLists.tracks;
    }
    get allNumber() {
      return this.realList ? this.realList.length : 0;
    }
    get userBg() {
      return this.songLists.creator ? this.songLists.creator.backgroundUrl : this.defaultImg;
    }
    get userName() {
      return this.songLists.creator ? this.songLists.creator.nickname : '';
    }

    private playCurSongList() {
      this.setPlayList({playList: this.realList, isDefault: false});
    }

    private mounted() {
      console.log(State, this.realList);
    }
  }
</script>
<style lang="scss">
.song-list-details {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 45px 0;
  .song-list-cont {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    .song-list-infos {
      height: 45vh;
      width: 100%;
      position: relative;
      .filter-bg {
        height: 100%;
        width: 100%;
        -webkit-filter: blur(15px);
        -moz-filter: blur(15px);
        -o-filter: blur(15px);
        -ms-filter: blur(15px);
        filter: blur(15px);
        img {
          height: 90%;
          width: auto;
        }
      }
      .song-list-base{
        height: calc(100% - 45px);
        position:absolute;
        top:0; left: 0;
        .song-list-img-box {
          flex: 2;
          height: 100%;
          .song-list-img {
            height: auto;
            width: 80%;
          }
        }
        .song-list-title-box {
          flex: 3;
          height: 120px;
          .song-list-author {
            .user-header {
              height: 30px;
              width: 30px;
              border-radius: 50%;
            }
          }
        }
      }
      .song-list-actions {
        position:absolute;
        bottom:0; left: 0;
        height: 45px;
      }
    }
    .song-list-ul {
      height: auto;
      .song-list-title {
        height: 50px;
        width: 100%;
      }
    }
  }
}
</style>

