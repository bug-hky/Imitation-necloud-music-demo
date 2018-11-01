<template>
  <van-row class="default-bg paly-list flex column justify-start align-start">
    <van-row class="tool-bar default-bg">
      <div class="left-area flex row justify-around align-center vt-m l-10">
        <i class="iconfont icon-single-loop default-font vt-m r-5"></i>
        <span class="base-font">列表循环</span>
        <span class="base-font">{{`(${playList.length})`}}</span>
      </div>
      <div class="right-area flex row justify-around align-center vt-m r-5">
        <i class="iconfont icon-add default-font"></i>
        <span class="base-font">收藏全部</span>
        <i class="iconfont icon-delete default-font"></i>
      </div>
    </van-row>
    <van-row class="list-box">
      <section class="song-item flex row justify-between align-center default-bg" v-for="(song, index) in playList" :key="index">
        <div class="song-title default-font vt-m l-10" @click="changePlaySong(song)">
          <i class="iconfont playing-icon icon-loud vt-m r-5" :class="{'active': isActive(song.id)}"></i>
          <p class="song-name base-font vt-m r-5">{{song.name}}</p>
          <p class="song-arts default-font">{{` - ${getArtsTitle(song)}`}}</p>
        </div>
        <i class="song-icon iconfont icon-delete base-font vt-m r-10"></i>
      </section>
    </van-row>
  </van-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
@Component({
  components: {
  },
})
export default class PlayList extends Vue {
  @Getter('playList') private playList: any[];
  @Getter('songId') private songId: string;
  @Action('changeSong') private changeSong: any;

  private getArtsTitle(song: any) {
    let returnTitle: string = '';
    if (song.ar) {
      returnTitle = song.ar.map((art: any) => {
        return art.name;
      }).join(' / ');
    }
    return returnTitle;
  }
  private isActive(songId: any) {
    return parseInt(songId) === parseInt(this.songId);
  }
  private changePlaySong(song: any) {
    this.changeSong(song.id);
  }
}
</script>

<style lang="scss">
@import "../../common/scss/color.scss";
.paly-list {
  height: 100%;
  width: 100%;
  .tool-bar {
    height: 45px;
    width: 100%;
    span {
      font-size: 14px;
    }
    i {
      font-size: 18px;
    }
    .left-area {
      float: left;
    }
    .right-area {
      float: right;
    }
    .left-area, .right-area {
      width: 32vw;
      height: 100%;
    }
  }
  .list-box {
    height: calc(100% - 45px);
    width: 100%;
    .song-item {
      width: 100%;
      height: 45px;
      .song-title {
        max-width: 90vw;
        height: 100%;
        text-align: left;
        .playing-icon {
          font-size: 16px;
          &.active {
            color: $color-palying;
          }
        }
        .song-arts {
          max-width: 30vw;
          font-size: 12px;
        }
        .song-name {
          max-width: 50vw;
          font-size: 14px;
        }
        .song-name, .song-arts, i {
          float: left;
          line-height: 45px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .song-icon {
        font-size: 16px;
      }
    }
  }
}
</style>