
<template>
  <section class="user" :class="{'base-bg': isBannerMode, 'banner-user': isBannerMode}">
    <img class="user-bg-img" :src="user.profile.backgroundUrl" alt="bg">
    <van-row class="front-box">
      <van-row class="header-pic">
        <img :src="user.profile.avatarUrl" alt="header">
      </van-row>
      <van-row class="user-info">
        <span class="nickName base-font">{{user.profile.nickname}}</span>
        <i class="level default-font">{{`Lv.${user.level}`}}</i>
      </van-row>
    </van-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
import { User } from '../store/interface';
@Component({
  components: {},
})
export default class UserComp extends Vue {
  @Prop({default: false}) private isBannerMode: boolean;
  @Getter('user') private user: User;
  private search() {
    console.log('search');
  }
  private mounted() {
    console.log('user', this.user);
  }
}
</script>

<style lang="scss">
.user {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .user-bg-img{
    position: absolute;
    top:50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }
  .front-box {
    position: absolute;
    top:0; left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #000, transparent);
    .header-pic {
      width: 100%;
      height: 60%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-end;
      img {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        margin: 0.5rem;
      }
    }
    .user-info {
      width: 100%;
      height: 40%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .nickName{
        font-size: 18px;
        color: #fff;
        margin: 0.5rem;
      }
      .level {
        border: 1px solid #fff;
        border-radius: 10px;
        font-size: 16px;
        padding: 0 10px;
        color: #fff;
      }
    }
  }
  &.banner-user {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    .user-bg-img {
      display: none;
    }
    .front-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      background: rgba(0, 0, 0, 0.3);
      align-items: center;
      .header-pic {
        height: 100%;
        width: 30%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        img {
          width: auto;
          height: 80%;
          border-radius: 50%;
          margin: 0.5rem;
        }
      }
    }
  }
}
</style>