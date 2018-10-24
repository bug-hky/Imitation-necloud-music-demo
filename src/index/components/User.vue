
<template>
  <section class="user">
    <img class="user-bg-img" :src="user.profile.backgroundUrl" alt="bg">
    <van-row class="front-box">
      <van-row class="header-pic">
        <img :src="user.profile.avatarUrl" alt="header">
      </van-row>
      <van-row class="user-info">
        <span class="nickName">{{user.profile.nickname}}</span>
        <i class="level">{{`Lv.${user.level}`}}</i>
      </van-row>
    </van-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
import { User } from '../store/interface';
@Component({
  components: {},
})
export default class UserComp extends Vue {
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
        font-size: 1.5rem;
        color: #fff;
        margin: 0.5rem;
      }
      .level {
        border: 1px solid #fff;
        border-radius: 2rem;
        font-size: 1rem;
        padding: 0 0.5rem;
        color: #fff;
      }
    }
  }
}
</style>