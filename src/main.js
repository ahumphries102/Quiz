import Vue from 'vue'
import App from './App.vue'
import router from './routes/vueRoutes'
import vuetify from './plugins/vuetify'
import store from './storage/store'
import FetchData from './restClient'
Vue.prototype.$store = store
Vue.prototype.$fetchData = FetchData
console.log(FetchData)
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
