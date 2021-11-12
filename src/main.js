import Vue from 'vue'
import App from './App.vue'
import router from './routes/vueRoutes'
import vuetify from './plugins/vuetify'
import store from './storage/store'
import FetchData from './restClient'
import IsMobile from './isMobile'
import Rules from './rules'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.observable(store)
Vue.prototype.$store = store
// detect if a user is on mobile device
Vue.prototype.$isMobile = IsMobile
// used for make fetch calls
Vue.prototype.$fetchData = FetchData
// handles validation
Vue.prototype.$rules = Rules
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
