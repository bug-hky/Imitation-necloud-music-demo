<template>
  <van-row class="friend">
    <span>Friend</span>
  </van-row>
</template>
    
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu } from '../../store/interface';
  import { Tab, Tabs } from 'vant';
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
  })
  export default class Friend extends Vue {
    private created() {
      console.log('recommend');
    }
  }
</script>
<style lang="scss">
.friend {
  height: calc( 100% - 90px);
}
</style>