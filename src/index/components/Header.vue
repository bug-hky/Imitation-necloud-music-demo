<template>
  <div class="header">
    <van-nav-bar v-if="!showSearch">
      <van-icon name="wap-nav" slot="left" @click="TOOGLESIDEBAR(true)" />
      <van-tabs v-model="active" slot="title">
        <van-tab v-for="tab in tabsNav" :key="tab.key">
          <div slot="title">
            <i :class="tab.icon"></i>
          </div>
        </van-tab>
      </van-tabs>
      <van-icon name="search" slot="right" @click="toogleSearch"/>
    </van-nav-bar>
    <van-nav-bar v-else class="searchNav">
    <van-search slot="title" class="searchInput"
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        show-action
        @search="search"
        @cancel="toogleSearch"
      />
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
@Component({
  components: {},
})
export default class Header extends Vue {
  private searchKey: string | null = null;
  private active: number = 1;
  private showSearch: boolean = false;
  private tabsNav: object[] = [
    { key: 'my', icon: 'iconfont icon-my-music' },
    { key: 'store', icon: 'iconfont icon-store-music' },
  ];
  @Mutation('TOOGLESIDEBAR') private TOOGLESIDEBAR: any;

  private toogleSearch() {
      this.showSearch = !this.showSearch;
  }
  private search() {
    console.log('search');
  }
}
</script>

<style lang="scss">
.searchNav {
  background: rgb(242, 242, 242) !important;
}
</style>