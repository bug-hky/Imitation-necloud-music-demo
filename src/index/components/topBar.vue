<template>
  <van-row class="top-bar flex row justify-between align-center base-bg base-border">
    <van-icon name="arrow-left" class=" left-action base-font vt-m l-10" @click="backStep"></van-icon>
    <div class="titlte-box flex column justify-around align-start vt-m l-10">
      <p class="main-title base-font">{{title}}</p>
      <p class="second-title default-font" v-if="double">
        {{secondTitle}}
        <!-- <template v-if="secondList.length > 1">
          <a v-for="(art, index) in secondList" :key="index">{{`${art.name}/`}}</a>
        </template>
        <template v-else>
          <a>{{`${secondList[0].name}`}}</a>
        </template> -->
      </p>
    </div>
    <van-icon name="search" class="right-action base-font vt-m r-10" v-if="!isSong"></van-icon>
    <i class="iconfont icon-action right-action base-font vt-m r-10" v-if="!isSong"></i>
    <i class="iconfont icon-share right-action base-font vt-m r-10" v-if="isSong"></i>
  </van-row>
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

  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
  })
  export default class TopBar extends Vue {
    @Prop({ default: false}) private double: boolean;
    @Prop({ default: false}) private isSong: boolean;
    @Prop() private title: string;
    @Prop() private secondTitle: string;

    private backStep() {
      this.$router.go(-1);
    }
  }
</script>
<style lang="scss">
.top-bar {
  height: 45px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid transparent;
  .titlte-box {
    height: 100%;
    width: calc(100% - 60px);
    font-size: 16px;
    .main-title, .second-title{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      margin: 0;
    }
  }
  .right-action, .left-action {
    font-size: 16px;
  }
}
</style>

