<template>
  <van-row class="home">
    <Header/>
    <van-popup v-model="showSideBar" position="left" :overlay="true" :close-on-click-overlay="false" @click-overlay="TOOGLESIDEBAR(false)">
      <van-row class="userInfo-sideBar">
        <sideBar/>
      </van-row>
    </van-popup>
    <router-view/>
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu } from '../store/interface';
  import { Tab, Tabs } from 'vant';
  import Header from '@/index/components/Header.vue';
  import sideBar from '../components/sideBar.vue';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      sideBar,
      Header,
    },
  })
  export default class Home extends Vue {
    private datas = [];
    private TabList: Menu[] = [
      { label: '推荐', key: 'recommend', index: 0, href: '/recommend' },
      { label: '朋友', key: 'friend', index: 1, href: '/friend' },
      { label: '电台', key: 'Radio', index: 2, href: '/Radio' },
    ];
    @State('showSideBar') private showSideBar: boolean;
    @Mutation('TOOGLESIDEBAR') private TOOGLESIDEBAR: any;

    private created() {
      console.log('main');
    }
  }
</script>
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  .userInfo-sideBar {
    width: 80vw;
    height: 100vh;
    background: #fff;
  }
}
</style>

