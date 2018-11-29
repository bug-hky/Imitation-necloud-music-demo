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
    <i class="song-bar-list iconfont icon-list base-font" @click="setSongBar(true)"></i>
  </div>
  <div class="song-page flex column justify-start align-center" v-else>
    <topBar :isSong="true" :title="songInfos.name" :second-title="artsTitle" :double="true"/>
    <section class="dish flex row justify-center align-center" @click="toogleDish">
      <div class="dish-body flex column justify-center align-center rotate-ani" :class="{'pause-ani': !isPlaying}">
        <img :src="dishPic" :alt="dishPic" class="al-img">
      </div>
    </section>
    <section class="lyrics-box flex column justify-start align-start" v-show="!showDish" @click="toogleDish">
      <div class="loud-control-box flex row justify-center align-center vt-p l-10 r-10">
        <i class="default-font icon-loud iconfont vt-m r-10" @click.stop="toogleNoLoud"></i>
        <van-slider class="loud-line" v-model="curLoud" />
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
      <span class="time-text default-font">{{currentTime}}</span>
      <van-slider class="time-line" v-model="curSchedule" />
      <span class="time-text default-font">{{maxTime}}</span>
    </van-row>
    <van-row class="action-footer flex row align-center">
      <van-col :span="4">
        <i :class="playTypeIcon" @click="changePlayType"></i>
      </van-col>
      <van-col :span="6">
        <i class="default-font change-nav-icon iconfont icon-prev" @click="prevSong"></i>
      </van-col>
      <van-col :span="4">
        <i class="default-font play-nav-icon iconfont"
        :class="{'icon-pause': !isPlaying, 'icon-play': isPlaying}"
         @click="pauseOrPlay"></i>
      </van-col>
      <van-col :span="6">
        <i class="default-font change-nav-icon iconfont icon-next" @click="nextSong"></i>
      </van-col>
      <van-col :span="4">
        <i class="default-font action-nav-icon iconfont icon-list" @click="setSongBar(true)"></i>
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
  import { Toast } from 'vant';
  import baseItem from '../components/baseItem.vue';
  import topBar from '../components/topBar.vue';

  const someModule = namespace('/src/index/store/song/song');
  const SINGLE = 1;
  const LIST = 2;
  const RANDOM = 3;
  @Component({
    components: {
      baseItem,
      topBar,
    },
  })
  export default class Song extends Vue {
    private active: number = 0;
    private showDish: boolean = true;
    @Prop({ default: false}) private isBar: boolean;

    @Getter('songInfos') private songInfos: any;
    @Getter('songId') private songId: string;
    @Getter('songUrl') private songUrl: string;
    @Getter('playType') private playType: number;
    @Getter('audio') private audio: any;
    @Getter('schedule') private schedule: any;
    @Mutation('setAudio') private setAudio: any;
    @Mutation('setSongBar') private setSongBar: any;
    @Mutation('setSongListId') private setSongListId: any;
    @Mutation('setCurSong') private setCurSong: any;
    @Mutation('setHandlerSchedule') private setHandlerSchedule: any;
    @Action('songListDetails') private songListDetails: any;
    @Action('songDetails') private songDetails: any;
    @Action('changePlayType') private changePlayType: any;
    @Action('changeListSong') private changeListSong: any;
    @Action('setLoud') private setLoud: any;
    @Action('toogleNoLoud') private toogleNoLoud: any;

    private goSong() {
      this.$router.push('/song');
    }
    private pauseOrPlay() {
      this.curAudio = Object.assign(this.curAudio, {playing: !this.isPlaying});
    }

    get isPlaying() {
      return this.curAudio.playing;
    }
    get currentTime(): string {
      return this.formatSeconds(this.curAudio.currentTime);
    }
    get maxTime(): string {
      return this.formatSeconds(this.curAudio.maxTime);
    }
    get curSchedule(): number {
      return Math.floor((this.curAudio.currentTime / this.curAudio.maxTime) * 100);
    }
    set curSchedule(value: number) {
      this.setHandlerSchedule(value);
    }
    get curLoud(): number {
      return this.curAudio.loud;
    }
    set curLoud(value: number) {
      this.setLoud(value);
    }
    get curAudio() {
      return this.audio;
    }
    set curAudio(val: any) {
      this.setAudio(val);
    }
    get playTypeIcon() {
      let returnStr: string = 'default-font action-nav-icon iconfont';
      switch (this.playType) {
        case SINGLE:
          returnStr += ' icon-single-loop';
          break;
        case LIST:
          returnStr += ' icon-list-loop';
          break;
        case RANDOM:
          returnStr += ' icon-random';
          break;
      }
      return returnStr;
    }
    get arts() {
      return this.songInfos.ar || [];
    }
    get artsTitle(): string {
      return this.arts.map((art: any) => art.name).join(' / ');
    }
    get dishPic() {
      return this.songInfos.al ? this.songInfos.al.picUrl : null;
    }
    private prevSong() {
      this.changeListSong('prev');
    }
    private nextSong() {
      this.changeListSong('next');
    }
    private toogleDish() {
      this.showDish = !this.showDish;
    }
    private formatSeconds(second: any) {
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
  overflow: hidden;
  .dish {
    height: calc(100% - 100px);
    .dish-body {
      height: 80vw;
      width: 80vw;
      background: url('../assets/coverall.png') no-repeat center center;
      background-size: 100% 100%;
      .al-img {
        height: 60%;
        width: 60%;
        border-radius: 50%;
      }
    }
  }
  .lyrics-box {
      height: calc(100% - 120px);
      width: 100%;
      background: rgba($color: #000, $alpha: 0.9);
      position: absolute;
      top: 45px; left: 0;
      .loud-control-box {
        height: 20px;
        width: 100%;
        .loud-line{
          width: calc(100% - 50px);
          .van-slider__bar{
            background: green;
            .van-slider__button {
              height: 12px;
              width: 12px;
            }
          }
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

