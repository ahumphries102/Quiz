import Vue from 'vue'
import App from './App.vue'
import router from './routes/vueRoutes'
import vuetify from './plugins/vuetify'
import store from './storage/store'
import FetchData from './restClient'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.prototype.$store = store
Vue.prototype.$fetchData = FetchData
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  data:()=>({
    loggedIn:false
  }),
  mounted(){
    localStorage.getItem('quizlogin')? this.loggedIn = true:this.loggedIn = false
  },
  render: h => h(App)
}).$mount('#app')
