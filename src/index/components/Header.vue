<template>
  <div class="header base-bg">
    <van-nav-bar class="base-bg pos-el addAni" :class="{'go-out-left': showSearch}">
      <van-icon name="wap-nav" slot="left" @click="setSideBar(true)" :color="themeFontColor"/>
      <van-tabs v-model="active" slot="title" class="base-bg" :color="themeFontColor" :line-width="16"
        @change="changePage">
        <van-tab v-for="tab in tabsNav" :key="tab.title" :title="tab.title">
          <div slot="title" class="base-bg default-font">
            <i :class="tab.icon"></i>
          </div>
        </van-tab>
      </van-tabs>
      <van-icon name="search" slot="right" @click="toogleSearch" :color="themeFontColor"/>
    </van-nav-bar>
    <van-row class="searchNav pos-el addAni" :class="{'go-out-right': !showSearch}">
      <van-search class="searchInput base-bg"
        background="themeBgColor"
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        show-action
        @search="search">
       <div slot="action" class="base-font pointer" @click="toogleSearch">取消</div>
      </van-search>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
import { Menu } from '../store/interface';
const BLACKTHEME = 'black-theme';
const WHITETHEME = 'white-theme';
@Component({
  components: {},
})
export default class Header extends Vue {
  private searchKey: string | null = null;
  private active: number = 1;
  private showSearch: boolean = false;
  private tabsNav: Menu[] = [
    { title: 'my', icon: 'iconfont icon-my-music bold', href: '/myMusic'},
    { title: 'ilb', icon: 'iconfont icon-store-music bold', href: '/musicLib' },
  ];
  @State('theme') private theme: string;
  @Mutation('setSideBar') private setSideBar: any;

  get themeFontColor() {
    return this.theme === BLACKTHEME ? '#fff' : '#000';
  }
  get themeBgColor() {
    return this.theme === BLACKTHEME ? '#000' : '#fff';
  }

  private toogleSearch() {
      this.showSearch = !this.showSearch;
  }
  private search() {
    console.log('search');
  }
  private changePage(index: number, title: string) {
    console.log(index, title);
    this.tabsNav.map((tab) => {
      if (tab.title === title) {
        this.$router.push(tab.href);
      }
    });
  }

  private mounted() {
    console.log(this.$router);
    const router: string = this.$router.currentRoute.fullPath;
    if (router.match('/myMusic')) {
      this.active = 0;
    } else if (router.match('/musicLib')) {
      this.active = 1;
    }
  }
}
</script>

<style lang="scss">
.header {
  position: relative;
  height: 45px;
  .van-tab {
    padding: 0 !important;
  }
  .pos-el {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    &.go-out-left {
      left: -100vw;
    }
    &.go-out-right {
      right: -100vw;
    }
  }
}
</style>