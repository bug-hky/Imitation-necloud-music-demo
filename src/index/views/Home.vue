<template>
  <van-row class="home">
    <Header/>
    <van-popup v-model="showCurSideBar" position="left" :overlay="true" :close-on-click-overlay="false" @click-overlay="setSideBar(false)">
      <van-row class="userInfo-sideBar">
        <sideBar/>
      </van-row>
    </van-popup>
    <van-row class="home-container">
      <router-view/>
    </van-row>
    <songBar :isBar="true" />
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu, User } from '../store/interface';
  import { Toast } from 'vant';
  import Header from '@/index/components/Header.vue';
  import sideBar from '../components/sideBar.vue';
  import songBar from '../views/song.vue';
  
  @Component({
    components: {
      sideBar,
      Header,
      songBar,
    },
  })
  export default class Home extends Vue {
    private datas = [];
    private TabList: Menu[] = [
      { label: '推荐', key: 'recommend', index: 0, href: '/recommend' },
      { label: '朋友', key: 'friend', index: 1, href: '/friend' },
      { label: '电台', key: 'Radio', index: 2, href: '/Radio' },
    ];
    @Getter('user') private user: any;
    @Getter('showSideBar') private showSideBar: boolean;
    @Mutation('setSideBar') private setSideBar: any;
    @Action('setPlayList') private setPlayList: any;
    @Action('record') private record: any;

    @Watch('user', { immediate: true, deep: true })
    private onUserChanged(val: User, oldVal: User) {
      this.getDefautPlayList();
    }
    get showCurSideBar() {
      return this.showSideBar;
    }
    set showCurSideBar(val: boolean) {
      console.log('');
    }
    private getDefautPlayList() {
      if (this.user.profile.userId) {
        this.record(1).then((resp: any) => {
          if (resp.code === 200) {
            const setList: any[] = resp.weekData.map((data: any) =>  data.song);
            this.setPlayList({playList: setList, isDefault: true});
          } else {
            Toast('获取播放列表失败');
          }
        });
      }
    }
    private created() {
      this.getDefautPlayList();
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
  .home-container {
    height: calc(100% - 90px);
  }
}
</style>

