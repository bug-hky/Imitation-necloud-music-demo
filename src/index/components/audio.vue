<template>
  <audio id="audio" :src="songUrl" :loop="isSingleLoop"></audio>
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
    private audioEl: any = null;

    @Prop({ default: SINGLE }) private playType: number;
    @Prop({ default: false }) private isPlaying: boolean;
    @Prop({ default: null }) private songUrl: string;

    /* change song */
    @Watch('songUrl', {deep: true})
    private onChnageSongUrl(val: boolean, oldVal: boolean) {
      if (val) {
        this.audioEl = document.getElementById('audio');
        // this.audioEl.pause();
        this.$nextTick(() => {
          // this.audioEl.play();
        });
      }
    }
    /* play/pause */
    @Watch('isPlaying', {deep: true})
    private onChnageIsPlaying(val: boolean, oldVal: boolean) {
      if (val) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }

    get isSingleLoop() {
      return this.playType === SINGLE;
    }

    private mounted() {
      this.audioEl = document.getElementById('audio');
    }
  }
</script>
<style lang="scss">
</style>