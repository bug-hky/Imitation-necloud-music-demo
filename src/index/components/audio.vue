<template>
  <div class="base-item base-bg flex row justify-between align-center" @click="getDetails">
    <div class="base-item-cover flex row justify-center align-center" :class="{'img-cover': isSongList}">
      <img :src="data.coverImgUrl" :alt="data.name" v-if="isSongList">
      <span v-else>{{index}}</span>
    </div>
    <div class="base-item-cont flex row justify-between align-center base-border" :class="{'img-cont': isSongList}">
      <div class="base-item-text-box flex column justify-around align-start">
        <p class="base-item-name base-font">{{data.name}}</p>
        <p class="base-item-num default-font">{{isSongList ? `${data.trackCount} 首` : data.name}}</p>
      </div>
      <i class="iconfont icon-action default-font base-item-action"></i>
    </div>
  </div>
</template>
    
<script lang="ts">
  /*
  @prop
    datas
  */
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import { Menu } from '../store/interface';
  import { Tab, Tabs } from 'vant';

  const SONGLIST = 'songList';
  const SONG = 'song';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
  })
  export default class SongList extends Vue {
    @Prop({ default: {} }) private data: any;
    @Prop({ default: '' }) private type: string;
    @Prop() private index: number;

    @State('theme') private theme: string;
    @Mutation('setSongListId') private setSongListId: any;
    @Action('setSongId') private setSongId: any;
    @Action('songListDetails') private songListDetails: any;

    get isSongList() {
      return this.type === SONGLIST;
    }

    private getDetails() {
      if (this.type === SONG) {
        this.setSongId(this.data.id.toString());
        this.$router.push('/song');
      } else {
        this.setSongListId(this.data.id);
        this.$router.push('/songList');
      }
    }
  }
</script>
<style lang="scss">
</style>