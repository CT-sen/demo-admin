import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
// 为了能够覆盖默认得到less变量，把后缀改为less
import 'vant/lib/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
