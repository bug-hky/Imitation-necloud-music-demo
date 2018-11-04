import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
Vue.config.productionTip = false;

/* login status get */
console.log(window);
if (!window.localStorage.getItem(window.location.hostname + '_vantUser')) {
  window.location.href = 'login.html';
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
