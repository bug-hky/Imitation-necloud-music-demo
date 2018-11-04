<template>
  <div class="songLists">
    <baseItem class="lists" :type="'songList'" :data="data" :index="index"/>
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
  import baseItem from './baseItem.vue';

  const someModule = namespace('/src/index/store/song/song');
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      baseItem,
    },
  })
  export default class SongLists extends Vue {
    @Prop({ default: {}}) private data: any;
    @Prop() private index: number;

    @State('theme') private theme: string;
    @Mutation('setSongListId') private setSongListId: any;
    @Action('songListDetails') private songListDetails: any;
    @Action('songDetails') private songDetails: any;
  }
</script>
<style lang="scss">
</style>

