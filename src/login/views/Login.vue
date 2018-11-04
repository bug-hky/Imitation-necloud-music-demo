<template>
<van-row class="login-box" v-if="isPhone">
  <van-cell-group class="input-wrap">
    <van-field
      class="input-box"
      v-model="loginObj.phone"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field
      class="input-box"
      v-model="loginObj.password"
      type="password"
      label="密码"
      placeholder="请输入密码"
    />
  </van-cell-group>
  <van-row class="login-btn">
  <van-button type="primary" size="large" @click="phoneLogin">登录</van-button>
  </van-row>
</van-row>
</template>
    
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { Action, Mutation, State } from 'vuex-class';
  import { Toast } from 'vant';
  import { login, getUserInfo } from '../api/login';
  import { Login, ValidRes } from '../api/interface';
  @Component({
    components: {},
  })
  export default class AppLogin extends Vue {
    // data
    private datas = [];
    private loginObj: Login = {
      password: null,
      phone: null,
    };
    private validRes: ValidRes = {};
    // @Prop
    @Prop({default: true})
    private isPhone?: boolean;
    // @State
    // @Getter
    // @Action
    // @Mutation
    // @Watch
    @Watch('isPhone')
    private onWatchIsPhone(val: boolean) {
      console.log('onWatchIsPhone', val);
    }
    // computed
    // 生命周期钩子
    // beforeCreate, created, beforeMount, mounted, beforeUpdate,
    // updated, activated, deactivated, beforeDestroy, destroyed,
    // errorCaptured
    // 路由钩子
    // beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
    // methods
    private async loginMethods(paramsObj: Login) {
      const res: any = await login(paramsObj)
      .then((response: any) => response )
      .catch((e: string) => Toast.fail('请求错误'));
      return res;
    }

    private async getUser(id: string) {
      const res: any = await getUserInfo(id)
      .then((response: any) => response )
      .catch((e: string) => Toast.fail('请求错误'));
      return res;
    }

    private validNews(obj: Login) {
      if (!obj.phone || obj.phone.length !== 11) {
        Toast.fail('手机号为11位');
        return false;
      }
    }

    private phoneLogin() {
        this.loginMethods(this.loginObj).then((result: any) => {
          if (result.code === 200) {
            if (result.profile.userId) {
              this.getUser(result.profile.userId).then((userInfo) => {
                if (userInfo.code === 200) {
                  window.localStorage.setItem(window.location.hostname + '_vantUser', JSON.stringify(userInfo));
                  window.location.href = 'index.html';
                } else {
                  Toast.fail('获取用户信息失败');
                }
              });
            }
          } else {
            Toast.fail('登陆失败');
          }
        });
    }
  }
</script>
<style lang="scss">
.login-box {
  .input-wrap{
    padding: 2rem 0;
    .input-box{
      margin-bottom: 1rem;
    }
  }
  .login-btn {
    padding: 0 2rem;
  }
}
</style>

