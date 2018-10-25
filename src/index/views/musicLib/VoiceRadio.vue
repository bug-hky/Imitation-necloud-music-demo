<template>
  <van-row class="voiceAudio">
    voiceAudio
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
  export default class VoiceAudio extends Vue {
    private created() {
      console.log('voiceAudio');
    }
  }
</script>
<style lang="scss">
.voiceAudio {
  height: calc( 100% - 90px);
}
</style>