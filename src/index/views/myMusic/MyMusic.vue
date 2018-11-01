<template>
  <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="myMusic"> -->
    <van-row  class="myMusic">
      <van-row class="user-banner">
        <UserComp :is-banner-mode="true"/>
      </van-row>
      <van-row class="my-class-list">
        <div class="class-list-item flex row justify-start align-center"
          :class="{'no-border': classItem.noBorder}"
          v-for="(classItem, index) in classList" :key="index">
          <i class="class-icon base-font iconfont vt-m r-10" :class="classItem.icon"></i>
          <span class="class-title base-font vt-m r-10">{{classItem.title}}</span>
          <b class="class-number default-font">{{`(${classItem.number})`}}</b>
        </div>
      </van-row>
      <van-collapse v-model="activeNames" class="my-music-list">
        <van-collapse-item v-for="col in collList" :key="col.key" :title="col.title" :name="col.key" :class="col.class">
          <i class="iconfont icon-setting vt-m r-10" slot="icon"></i>
          <van-row v-if="col.key === '1'">
            <SongLists v-for="(songList, index) in myCreateLists" :key="songList.id" :index="index" :data="songList"/>
          </van-row>
          <van-row v-else>
            <SongLists v-for="(songList, index) in myCollectLists" :key="songList.id" :index="index" :data="songList"/>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </van-row>
  <!-- </van-pull-refresh> -->
</template>
    
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter, namespace } from 'vuex-class';
  import { Menu, User } from '../../store/interface';
  import { Tab, Tabs } from 'vant';
  import SongLists from '../../components/songLists.vue';
  import UserComp from '../../components/User.vue';

  const someModule = namespace('/src/index/store/home/myMusic');
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      SongLists,
      UserComp,
    },
  })
  export default class Home extends Vue {
    private isLoading: boolean = false;
    private activeNames: string[] = ['1'];
    private classList: Menu[] = [
      { title: '最近播放', icon: 'icon-moon', number: 180, href: '/myMusic'},
      { title: '我的电台', icon: 'icon-sun', number: 180, href: '/myMusic'},
      { title: '我的收藏', icon: 'icon-logout', number: 180, href: '/myMusic'},
      { title: '本地音乐', icon: 'icon-my-music', number: 180, href: '/myMusic'},
      { title: '下载管理', icon: 'icon-store-music', number: 180, href: '/myMusic', noBorder: true},
    ];
    private myCreateLists: any = [];
    private myCollectLists: any = [];

    @State('user') private user: User;
    @Action('userSongList') private userSongList: any;
    @Action('userCount') private userCount: any;

    @Watch('user', { immediate: true, deep: true })
    private onUserChanged(val: User, oldVal: User) {
      if (val.profile.userId) {
        this.getSongList();
        // this.getCount();
      }
    }
    get collList() {
      return [
        {
          title: `创建的歌单(${this.myCreateLists.length || 0})`,
          key: '1',
          number: 180,
          class: 'my-music-item',
        },
        {
          title: `收藏的歌单(${this.myCollectLists.length || 0})`,
          key: '2',
          number: 180,
          class: 'my-music-item no-border',
        },
      ];
    }

    private getSongList() {
      this.userSongList().then((res: any) => {
        if (res.code === 200) {
          this.myCreateLists = [];
          this.myCollectLists = [];
          res.playlist.map((item: any) => {
            if (item.userId === this.user.profile.userId) {
              this.myCreateLists.push(item);
            } else {
              this.myCollectLists.push(item);
            }
          });
        } else {
          this.$toast('请求失败');
        }
      });
    }
    private getCount() {
      this.userCount().then((res: any) => {
        if (res.code === 200) {
          console.log('count', res);
        } else {
          this.$toast('请求失败');
        }
      });
    }
    private onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    }
    private onLoad() {
      console.log('onload');
    }
    private mounted() {
      console.log('musiclib', someModule);
    }
  }
</script>
<style lang="scss">
.myMusic {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  .user-banner {
    margin: 0.5rem;
    height: 110px;
    border-radius: 1rem;
    overflow: hidden;
  }
  .my-class-list {
    padding: 10px;
    .class-list-item {
      height: 45px;
      border-bottom: 1px solid transparent;
      &.no-border {
        border: none;
      }
      .class-icon{
        font-size: 1.8rem;
      }
      .class-title {
        font-size: 1.4rem;
      }
      .class-number {
        font-size: 1rem;
      }
    }
  }
  .my-music-list {
    .my-music-item {
      border-bottom: 1px solid transparent;
      &.no-border {
        border: none;
      }
    }
  }
}
</style>

