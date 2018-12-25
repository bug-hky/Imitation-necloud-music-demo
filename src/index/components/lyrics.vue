<template>
  <div class="lyrics-box">
    <div class="text-box" :style="curPos">
      <template v-if="hasLyrics">
        <p class="text-item default-font"
          :class="{'cur-line-style': index === curLine}"
          :ref="index === curLine ? 'lyricsCurLine' : ''"
        v-for="(ly, index) in lyricsTextList" :key="index">{{ly}}</p>
      </template>
      <template v-else>
        <p class="text-item default-font">{{curLyrics}}</p>
      </template>
    </div>
    <section class="line-height-line"></section>
  </div>
</template>
<script lang="ts">
  /*
  @prop
    datas
  */
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import Lyrics from '../../common/ts/lyrics';
  const SINGLE = 1;
  @Component({
    components: {},
  })
  export default class SongList extends Vue {
    private curLyrics: any = null;
    private lyricsTextList: any[] = [];
    private hasLyrics: boolean = false;
    private curLine: number = 0;
    @Getter('lyrics') private lyrics: any;
    @Getter('audio') private audio: any;
    @Getter('playType') private playType: number;

    @Watch('lyrics', {deep: true, immediate: true})
    private handlerChangeLyrics(val: any, oldVal: any) {
      if (val && val !== '此歌曲暂无歌词') {
        this.curLine = 0;
        this.curLyrics = new Lyrics(val, () => {
          console.log('change line', this.curLyrics.lines.length);
          this.curLine++;
          if (this.curLine === this.curLyrics.lines.length) {
            if (this.playType === SINGLE) {
              this.curLyrics.seek(0);
            } else {
              this.curLyrics.stop();
            }
          }
        });
        this.hasLyrics = true;
        this.lyricsTextList = this.curLyrics.lines.map((res: any): string => res.txt);
        console.log(typeof val, val);
      } else {
        this.curLyrics = null;
        this.hasLyrics = false;
      }
    }
    @Watch('isPlaying', {immediate: true})
    private handlerChangeIsPlaying(val: any, oldVal: any) {
      if (this.curLyrics) {
        if (val) {
          this.curLyrics.play();
        } else {
          this.curLyrics.stop();
        }
      }
    }

    get curAudio() {
      return this.audio;
    }
    get isPlaying() {
      return this.curAudio.playing;
    }
    get curPos() {
      return `top: calc(50% - ${(this.curLine) * 30}px);`;
    }

    private seekLyrics(startTime: any) {
      this.curLyrics.seek(startTime);
    }

    private mounted() {
      // this.audioEl = document.getElementById('audio');
    }
  }
</script>
<style lang="scss">
.lyrics-box {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .line-height-line {
    position: absolute;
    top: calc(50% + 9px); left: 0;
    height: 0;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  .text-box {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%; left: 0;
    transition: 0.8s ease-in-out;
    .text-item {
      min-height: 30px;
      width: 100%;
      white-space: normal;
      line-height: 30px;
      &.cur-line-style {
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>