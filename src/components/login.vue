<template>
  <v-container fill-height>
      <v-card width="50%" class="mx-auto">
          <v-card-title>
            <p>Login</p>
          </v-card-title>
          <v-card-text>
              <v-text-field label="User Name" v-model="loginData.username" />
              <v-text-field label="Password" v-model="loginData.password" :type="visible?'':'password'"
                  :append-icon="visible?'mdi-eye':'mdi-eye-off'" @click:append="visible = !visible" />
              <p :style="{color:color}">{{responseMsg}}</p>
          </v-card-text>
          <v-card-actions>
              <v-btn color="primary" @click="$router.push({name:'signup'})">Signup</v-btn>
              <v-btn :loading="submitted" color="primary" @click="login">Login</v-btn>
          </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
import store from '../storage/store'
export default {
    name:'login',
    data:()=>({
        color:'',
        loginData:{
            password:'',
            username:'',
        },
        responseMsg:'',
        submitted:false,
        visible:false,
    }),
    methods:{
        async login(){
            this.submitted = true
            let request = await this.$root.fetchData('POST', '/sendtoken', this.loginData)
            if(!request.err){
                this.color = 'green'
                this.responseMsg = request.msg
                this.$router.push({name:'creatingquiz'}).catch(err=>err)
                this.$store.state.username = this.loginData.username
                this.$store.state.token = request.token
                this.$store.updateToken()
                this.$root.loggedIn = true
                
            }else{
                this.color = 'red'
                this.responseMsg = request.err
            }
            this.submitted = false
        }
    }
}
</script>