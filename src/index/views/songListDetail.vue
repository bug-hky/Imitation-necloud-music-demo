<template>
  <van-row class="song-list-details">
    <topBar :title="'歌单'" />
    <van-row class="song-list-ul">
      <baseItem v-for="(song, index) in realList" :key="song.id" :index="index + 1" :type="'song'" :data="song"/>
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
    @State('theme') private theme: string;
    @Getter('songList') private songList: any;
    @Getter('songListId') private songListId: number;
    @Action('songListDetails') private songListDetails: any;

    @Watch('songListId', {immediate: true, deep: true})
    private onSongListIdChanged(val: number, oldVal: number) {
      this.songListDetails(val).then((res: any) => {
        if (res.code === 200) {
          this.songLists = res.playlist;
        }
      });
    }

    get realList() {
      return this.songLists.tracks;
    }

    private getSongListDetails() {
      console.log('getSongListDetails');
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
  .song-list-ul {
    height: 100%;
    overflow: scroll;
  }
}
</style>

