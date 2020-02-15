import Vue from 'vue'
import App from './App.vue'
import VueDebounce from 'vue-debounce'
import router from './routes/routes'
import vuetify from './plugins/vuetify'
Vue.use(VueDebounce, {listenTo:'input'})
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
