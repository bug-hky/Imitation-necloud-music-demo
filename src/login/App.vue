<template>
  <div id="app">
    <div class="header">
      <van-tabs v-model="active" @change="changeLoginType">
        <van-tab title="手机登录">
          <router-view/>
        </van-tab>
        <!-- <van-tab title="邮箱登录">
          <router-view/>
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';
@Component({
  components: {},
})
export default class App extends Vue {
  private active: number = 1;
  private changeLoginType(index: number, title: string) {
    console.log(index, title);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
