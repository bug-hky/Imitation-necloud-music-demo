<template>
  <audio ref="audio" :src="songUrl" :loop="isSingleLoop"
    @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"
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
    @Mutation('setAudio') private setAudio: any;
    @Mutation('setSchedule') private setSchedule: any;
    @Action('setCurTime') private setCurTime: any;
    @Action('setMaxTime') private setMaxTime: any;

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

    get isPlaying(): boolean {
      return this.curAudio.playing;
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