<template>
  <section class="sideBar">
    <van-row class="sideBarTop">
      <User/>
    </van-row>
    <van-row class="sideBarCenter">
    </van-row>
    <van-row type="flex" justify="space-around" class="sideBarBottomBar">
      <van-col span="12" class="flex row align-center">
        <div class="flex row justify-center align-center" @click="setIsDayMode(!isDayMode)">
          <i :class="modeInfo.icon" class="vt-m r-10"></i>
          <span>{{modeInfo.text}}</span>
        </div>
      </van-col>
      <van-col span="5" class="flex row align-center">
        <div class="flex row justify-center align-center">
          <i class="iconfont icon-setting vt-m r-10"></i>
          <span>设置</span>
        </div>
      </van-col>
      <van-col span="5" class="flex row align-center">
        <div class="flex row justify-center align-center" @click="logout">
          <i class="iconfont icon-logout vt-m r-10" ></i>
          <span>退出</span>
        </div>
      </van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
import User from './User.vue';
const WHITETHEME = 'white-theme';
const BLACKTHEME = 'black-theme';
@Component({
  components: {
    User,
  },
})
export default class SideBar extends Vue {
  @State('theme') private theme: string;
  @State('isDayMode') private isDayMode: boolean;
  @Getter('user') private user: object;
  @Action('setIsDayMode') private setIsDayMode: boolean;
  @Action('logout') private logout: any;

  get modeInfo() {
    let returnInfo: object = {
      text: '日间模式',
      icon: 'iconfont icon-sun',
    };
    if (!this.isDayMode) {
      returnInfo = {
        text: '夜间模式',
        icon: 'iconfont icon-moon',
      };
    }
    return returnInfo;
  }

  get getTargetTheme() {
    return this.isDayMode ? WHITETHEME : BLACKTHEME;
  }

}
</script>

<style lang="scss">
.sideBar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  .sideBarTop {
     height: 220px;
     border-bottom: 1px solid transparent;
  }
  .sideBarCenter {
    height: 100%;
  }
  .sideBarBottomBar {
    height: 50px;
    border-top: 1px solid transparent;
    span {
      font-size: 0.8rem;
    }
  }
}
</style>