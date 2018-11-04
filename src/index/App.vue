<template>
  <div id="app" class="theme" :class="theme">
    <router-view/>
    <van-popup v-model="showSongBar" position="bottom" :overlay="true" :close-on-click-overlay="false" @click-overlay="setSongBar(false)">
      <van-row class="userInfo-bottomBar">
        <playList/>
      </van-row>
    </van-popup>
    <realAudio :is-playing="isPlaying" :song-url="songUrl" :play-type="playType" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { NavBar } from 'vant';
import { Action, Mutation, State, Getter } from 'vuex-class';
import playList from './components/playList.vue';
import realAudio from './components/audio.vue';
@Component({
  components: {
    playList,
    realAudio,
  },
})
export default class App extends Vue {
  private timer: any = null;
  @State('theme') private theme: string;
  @Getter('isPlaying') private isPlaying: boolean;
  @Getter('showSongBar') private showSongBar: boolean;
  @Getter('songUrl') private songUrl: string;
  @Getter('playType') private playType: number;
  @Mutation('setSongBar') private setSongBar: any;
  @Action('setUser') private setUser: any;
  @Action('refreshLoginState') private refreshLoginState: any;

  private mounted() {
    this.setUser();
  }
}
</script>

<style lang="scss" src="../common/scss/base.scss"></style>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  .userInfo-bottomBar {
    width: 100vw;
    height: 60vh;
    background: transparent;
  }
}
</style>
