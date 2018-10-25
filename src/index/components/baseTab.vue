<template>
  <van-row class="base-bg base-tab-comp">
    <van-tabs v-model="curActive" sticky class="base-bg" @change="changeTab" :color="themeFontColor">
      <van-tab v-for="tab in datas" :title="tab.label" :key="tab.index">
        <slot></slot>
      </van-tab>
    </van-tabs>
  </van-row>
</template>
    
<script lang="ts">
  /*
  @prop
    datas
    active
  @emit
    changeTab
  */
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Action, Mutation, State, Getter } from 'vuex-class';
  import { Menu } from '../store/interface';
  import { Tab, Tabs } from 'vant';
  const BLACKTHEME = 'black-theme';
  const WHITETHEME = 'white-theme';
  // interface changeTabParam {
  //   index: number;
  //   title: string;
  // }
  @Component({
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
  })
  export default class BaseTab extends Vue {
    @Prop({ default: []}) private datas: Menu[];
    @Prop({ default: 0}) private active: number;

    private curActive: number = 0;
    @State('theme') private theme: string;

    private changeTab(index: number, title: string) {
      this.datas.map((tab) => {
        if (tab.title === title && tab.href) {
          this.$router.push(tab.href);
        }
      });
      this.$emit('changeTab', index);
    }

    get themeFontColor() {
      return this.theme === BLACKTHEME ? '#fff' : '#000';
    }
    get themeBgColor() {
      return this.theme === BLACKTHEME ? '#000' : '#fff';
    }

    private mounted() {
      this.curActive = this.active;
    }
  }
</script>
<style lang="scss">
</style>

