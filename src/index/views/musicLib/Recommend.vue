<template>
  <van-row class="recommend">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(banner, index) in banners" :key="index">
        <img :src="banner.imageUrl" :alt="banner.typeTitle" width="100%">
      </van-swipe-item>
    </van-swipe>
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu, Banner } from '../../store/interface';
  import { Tab, Tabs, Toast } from 'vant';
  import { getBanner } from '../../api/home';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
  })
  export default class Recommend extends Vue {
    private banners: Banner[] = [];
    private async bannerMethods() {
      const res: any = await getBanner()
      .then((response: any) => response )
      .catch((e: string) => Toast.fail('请求错误'));
      return res;
    }
    private created() {
      console.log('recommend');
      this.bannerMethods().then((res) => {
        if (res.code === 200) {
          res.banners.map((banner: Banner) => {
            this.banners.push(banner);
          });
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
</script>
<style lang="scss">
.recommend {
  height: calc( 100% - 90px);
}
</style>

