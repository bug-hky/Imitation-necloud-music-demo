<template>
  <div class="base-item base-bg flex row justify-between align-center" @click="getDetails">
    <div class="base-item-cover flex row justify-center align-center" :class="{'img-cover': isSongList}">
      <img :src="data.coverImgUrl" :alt="data.name" v-if="isSongList">
      <span v-else>{{index}}</span>
    </div>
    <div class="base-item-cont flex row justify-between align-center base-border" :class="{'img-cont': isSongList}">
      <div class="base-item-text-box flex column justify-around align-start">
        <p class="base-item-name base-font">{{data.name}}</p>
        <p class="base-item-num default-font">{{isSongList ? `${data.trackCount} 首` : arts}}</p>
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

    get arts(): string {
      return this.data.ar.map((res: any): string => res.name).join('-');
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
.base-item {
  height: 5.5rem;
  &.border-none {
    border: none;
  }
  .base-item-cover {
    height: 5.5rem;
    width: 3rem;
    &.img-cover {
      width: 6rem;
    }
    img {
      height: 80%;
      width: 80%;
      border-radius: 10%;
    }
    span {
      font-size: 16px;
    }
  }
  .base-item-cont {
    height: 100%;
    width: calc( 100% - 3rem);
    .img-cont {
      width: calc(100% - 6rem);
    }
    border-bottom: 1px solid transparent;
    .base-item-action {
      font-size: 16px;
      padding-right: 1rem;
    }
    .base-item-text-box {
      height: 100%;
      max-width: 60vw;
      font-size: 16px;
      margin-left: 10px;
      text-align: left;
      .base-item-name,
      .base-item-num {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
      }
    }
  }
}
</style>

