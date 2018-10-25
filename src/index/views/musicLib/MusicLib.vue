<template>
  <van-row class="musicLib">
    <BaseTab :datas="TabList" :active="active" @changeTab="changeTab"></BaseTab>
    <Recommend v-if="active === 0"></Recommend>
    <Friend v-else-if="active === 1"></Friend>
    <VoiceRadio v-else-if="active === 2"></VoiceRadio>
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu } from '../../store/interface';
  import { Tab, Tabs } from 'vant';
  import BaseTab from '../../components/baseTab.vue';
  import Recommend from './Recommend.vue';
  import Friend from './Friend.vue';
  import VoiceRadio from './VoiceRadio.vue';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      BaseTab,
      Recommend,
      Friend,
      VoiceRadio,
    },
  })
  export default class Home extends Vue {
    private datas = [];
    private active = 0;
    private TabList: Menu[] = [
      { label: '推荐', key: 'recommend', index: 0, href: '/recommend' },
      { label: '朋友', key: 'friend', index: 1, href: '/friend' },
      { label: '电台', key: 'radio', index: 2, href: '/radio' },
    ];

    private created() {
      console.log('musiclib');
    }
    private changeTab(index: number) {
      this.active = index;
    }
  }
</script>
<style lang="scss">
.musicLib {
  height: 100%;
  width: 100%;
}
</style>

