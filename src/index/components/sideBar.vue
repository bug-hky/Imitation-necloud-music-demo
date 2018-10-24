<template>
  <section class="sideBar">
    <van-row class="sideBarTop">
      <User/>
    </van-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
import User from './User.vue';
@Component({
  components: {
    User,
  },
})
export default class SideBar extends Vue {
  @Getter('user') private user: object;
  @Mutation('TOOGLESIDEBAR') private TOOGLESIDEBAR: any;
  private search() {
    console.log('search');
  }
}
</script>

<style lang="scss">
.sideBar {
  height: 100%;
  width: 100%;
  .sideBarTop {
     height: 30%;
     width: 100%;
     border-bottom: 1px solid #333;
  }
}
</style>