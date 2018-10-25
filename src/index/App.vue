<template>
  <div id="app" :class="theme">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';
import { Action, Mutation, State, Getter } from 'vuex-class';
@Component({
  components: {},
})
export default class App extends Vue {
  @State('theme') private theme: string;
  @Mutation('SETUSER') private SETUSER: any;

  private mounted() {
    const storageKey: string = window.location.hostname + '_vantUser';
    const originJson: string | null = window.localStorage.getItem(storageKey);
    const userObj: object | null = originJson ? JSON.parse(originJson) : null;
    this.SETUSER(userObj);
  }
}
</script>

<style lang="scss" src="../common/scss/base.scss"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
