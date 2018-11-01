<template>
  <div class="song-bar flex row justify-between align-center default-bg" v-if="isBar">
    <div class="song-bar-img flex row justify-center align-center" @click="goSong">
      <img :src="dishPic" :alt="dishPic" class="al-img">
    </div>
    <div class="song-bar-cont flex column justify-around align-start" @click="goSong">
      <p class="song-title base-font">{{songInfos.name}}</p>
      <p class="song-desc default-font">{{artsTitle}}</p>
    </div>
    <i class="song-bar-schedule iconfont base-font" @click="pauseOrPlay"
      :class="{'icon-pause': !isPlaying, 'icon-play': isPlaying}"></i>
    <i class="song-bar-list iconfont icon-list base-font" @click="toogleSongBar"></i>
  </div>
  <div class="song-page flex column justify-start align-center" v-else>
    <topBar :isSong="true" :title="songInfos.name" :second-title="artsTitle" :double="true"/>
    <section class="dish flex row justify-center align-center">
      <div class="dish-body flex column justify-center align-center">
        <img :src="dishPic" :alt="dishPic" class="al-img">
      </div>
    </section>
    <van-row class="action-nav flex row align-center">
      <van-col :span="5">
        <i class="default-font action-nav-icon iconfont icon-like"></i>
      </van-col>
      <van-col :span="5">
        <i class="default-font action-nav-icon iconfont icon-download"></i>
      </van-col>
      <van-col :span="5">
        <i class="default-font action-nav-icon iconfont icon-logo"></i>
      </van-col>
      <van-col :span="5">
        <i class="default-font action-nav-icon iconfont icon-comment"></i>
      </van-col>
      <van-col :span="5">
        <i class="default-font action-nav-icon iconfont icon-action"></i>
      </van-col>
    </van-row>
    <van-row class="schedule-line flex row justify-start align-center">
      <span class="time-text default-font">12:60</span>
      <van-slider class="time-line" v-model="curTime" />
      <span class="time-text default-font">03:40</span>
    </van-row>
    <van-row class="action-footer flex row align-center">
      <van-col :span="4">
        <i class="default-font action-nav-icon iconfont icon-list-loop"></i>
      </van-col>
      <van-col :span="6">
        <i class="default-font change-nav-icon iconfont icon-prev"></i>
      </van-col>
      <van-col :span="4">
        <i class="default-font play-nav-icon iconfont"
        :class="{'icon-pause': !isPlaying, 'icon-play': isPlaying}"
         @click="pauseOrPlay"></i>
      </van-col>
      <van-col :span="6">
        <i class="default-font change-nav-icon iconfont icon-next"></i>
      </van-col>
      <van-col :span="4">
        <i class="default-font action-nav-icon iconfont icon-list" @click="toogleSongBar"></i>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
  /*
  @prop
    datas
  */
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import { Menu } from '../store/interface';
  import { Tab, Tabs, Toast } from 'vant';
  import baseItem from '../components/baseItem.vue';
  import topBar from '../components/topBar.vue';

  const someModule = namespace('/src/index/store/song/song');
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      baseItem,
      topBar,
    },
  })
  export default class Song extends Vue {
    private active: number = 0;
    private curTime: number = 0;
    // @Prop({ default: {}}) private data: any;
    @Prop({ default: false}) private isBar: boolean;

    @Getter('songInfos') private songInfos: any;
    @Getter('songId') private songId: string;
    @Getter('isPlaying') private isPlaying: boolean;
    @Getter('songUrl') private songUrl: string;
    @Mutation('tooglePlay') private tooglePlay: any;
    @Mutation('toogleSongBar') private toogleSongBar: any;
    @Mutation('setSongListId') private setSongListId: any;
    @Mutation('setCurSong') private setCurSong: any;
    @Action('songListDetails') private songListDetails: any;
    @Action('songDetails') private songDetails: any;

    private goSong() {
      this.$router.push('/song');
    }
    private pauseOrPlay() {
      this.tooglePlay();
    }
    get arts() {
      return this.songInfos.ar || [];
    }
    get artsTitle() {
      return this.arts.map((art: any) => {
        return art.name;
      }).join(' / ');
    }
    get dishPic() {
      return this.songInfos.al ? this.songInfos.al.picUrl : null;
    }
  }
</script>
<style lang="scss">
@import "../../common/scss/color.scss";
.song-bar {
  height: 45px;
  overflow: hidden;
  .song-bar-img {
    height: 100%;
    width: 45px;
    .al-img {
      height: 90%;
      width: 90%;
    }
  }
  .song-bar-cont {
    height: 100%;
    width: 65vw;
    overflow: hidden;
    .song-title, .song-desc {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      margin: 0;
    }
    .song-title {
      font-size: 14px;
    }
    .song-desc {
      font-size: 12px;
    }
  }
  .iconfont {
    font-size: 20px;
    margin-right: 2px;
  }
}
.song-page {
  height: 100%;
  padding-top: 45px;
  box-sizing: border-box;
  .dish {
    height: calc(100% - 100px);
    .dish-body {
      height: 25rem;
      width: 25rem;
      background: url('../assets/coverall.png') no-repeat center center;
      background-size: 100% 100%;
      .al-img {
        height: 15rem;
        width: 15rem;
        border-radius: 50%;
      }
    }
  }
  .action-footer {
    width: 100%;
    height: 55px;
    .action-nav-icon {
      font-size: 20px;
    }
    .change-nav-icon {
      font-size: 25px;
    }
    .play-nav-icon {
      font-size: 30px;
    }
  }
  .action-nav {
    width: 90%;
    height: 45px;
    .action-nav-icon {
      font-size: 18px;
    }
  }
  .schedule-line {
    height: 20px;
    width: 100%;
    .time-text {
      width: 50px;
      height: 100%;
      font-size: 11px;
      line-height: 20px;
    }
    .time-line {
      .van-slider__bar{
        background: red;
        .van-slider__button {
          height: 12px;
          width: 12px;
        }
      }
      width: calc(100% - 100px);
    }
  }
  .van-tabbar {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>

