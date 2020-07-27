import Vue from 'vue'
import App from './App.vue'
import router from './routes/vueRoutes'
import vuetify from './plugins/vuetify'
import store from './storage/store'
import FetchData from './restClient'
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
  methods: {
    async fetchData(method, url, data) {
      let mode = 'cors'
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      let opt = {}
      
      if (data) {
        opt = {
          method,
          mode,
          headers,
          body: JSON.stringify(data)
        }
      } else {
        opt = {
          method,
          mode,
          headers
        }
      }

      let request
      try {
        request = await fetch(url, opt)
      } catch (err) {
        throw err
      }

      let response
      try {
        response = await request.json()
      } catch (err) {
        throw err
      }
      return response
    }
  },
  render: h => h(App)
}).$mount('#app')
