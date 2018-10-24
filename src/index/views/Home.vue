<template>
  <van-row class="home">
    <van-popup v-model="showSideBar" position="left" :overlay="true" :close-on-click-overlay="false" @click-overlay="TOOGLESIDEBAR(false)">
      <van-row class="userInfo-sideBar">
        <sideBar/>
      </van-row>
    </van-popup>
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Tab, Tabs } from 'vant';
  import sideBar from '../components/sideBar.vue';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      sideBar,
    },
  })
  export default class Home extends Vue {
    private datas = [];
    private cate = 'in_theaters';

    @State('showSideBar') private showSideBar: boolean;
    @Mutation('TOOGLESIDEBAR') private TOOGLESIDEBAR: any;
    // @Action private movieList!: (cate: string) => any;

    private created() {
      // this.movieList( this.cate).then( (res: any) => {
      //   this.datas = res;
      // });
    }
  }
</script>
<style lang="scss">
.userInfo-sideBar {
  width: 80vw;
  height: 100vh;
  background: #fff;
}
</style>

