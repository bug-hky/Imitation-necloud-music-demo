<template>
  <audio ref="audio" :src="songUrl" :loop="isSingleLoop"
    @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"
    @ended="onFinish"
  ></audio>
</template>
<script lang="ts">
  /*
  @prop
    datas
  */
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import { Menu } from '../store/interface';
  const SINGLE = 1;
  const LIST = 2;
  const RANDOM = 3;
  @Component({
    components: {},
  })
  export default class SongList extends Vue {

    @Prop({ default: SINGLE }) private playType: number;
    @Prop({ default: null }) private songUrl: string;
    @Getter('audio') private audio: any;
    @Getter('handlerSchedule') private handlerSchedule: number;
    @Getter('isNoLoud') private isNoLoud: boolean;
    @Mutation('setAudio') private setAudio: any;
    @Mutation('setSchedule') private setSchedule: any;
    @Action('setCurTime') private setCurTime: any;
    @Action('setMaxTime') private setMaxTime: any;
    @Action('changeListSong') private changeListSong: any;

    /* change song */
    @Watch('songUrl', {deep: true})
    private onChnageSongUrl(val: boolean, oldVal: boolean) {
      if (val) {
        this.audioEl.pause();
        this.$nextTick(() => {
          this.audioEl.play();
        });
      }
    }
    /* play/pause */
    @Watch('isPlaying', {deep: true})
    private onChnageIsPlaying(val: boolean, oldVal: boolean) {
      if (val) {
        this.play();
      } else {
        this.pause();
      }
    }
    /* change schedule */
    @Watch('handlerSchedule', {deep: true})
    private onChnagehandlerSchedule(val: number, oldVal: number) {
      const timeString = (val / 100 * this.curAudio.maxTime).toString();
      this.audioEl.currentTime = parseInt(timeString, 10);
      this.curAudio.currentTime = parseInt(timeString, 10);
    }
    /* change loud */
    @Watch('curLoud', {deep: true})
    private onChangeCurLoud(val: number, oldVal: number) {
      this.audioEl.volume = val / 100;
    }
    /* no loud */
    @Watch('isNoLoud', {deep: true})
    private onChangeNoLoud(val: boolean, oldVal: boolean) {
      this.audioEl.muted = val;
    }

    get isPlaying(): boolean {
      return this.curAudio.playing;
    }
    get curLoud(): number {
      return this.curAudio.loud;
    }
    get curAudio() {
      return this.audio;
    }
    set curAudio(val: any) {
      this.setAudio(val);
    }
    get audioEl(): any {
      return this.$refs.audio;
    }
    get isSingleLoop() {
      return this.playType === SINGLE;
    }

    private play() {
      this.audioEl.play();
    }
    private pause() {
      this.audioEl.pause();
    }
    private onFinish() {
      const rePlay = () => {
        this.audioEl.currentTime = 0;
        this.curAudio.currentTime = 0;
      };
      const overActions = new Map([
        [/^1$/, () => { rePlay(); }],
        [/^[2-3]$/, () => { this.changeListSong('next'); }],
      ]);
      const target = [...overActions].filter(([key, value]) => (key.test(`${this.playType}`)));
      const res = target.map(([key, value]) => value);
      res[0]();
    }
    private onPlay() {
      this.audio.playing = true;
    }
    private onPause() {
      this.audio.playing = false;
    }
    private onTimeupdate(res: any) {
      // console.log('updateTime', res.target.currentTime);
      this.setCurTime(res.target.currentTime);
    }
    private onLoadedmetadata(res: any) {
      // console.log('loadedTime', res.target.duration);
      this.setMaxTime(res.target.duration);
    }

    private mounted() {
      // this.audioEl = document.getElementById('audio');
    }
  }
</script>
<style lang="scss">
</style>