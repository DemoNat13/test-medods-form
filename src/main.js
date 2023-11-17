import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';

import '../styles/index.scss';
import '../styles/_normalize.scss';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
