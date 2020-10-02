<template>
  <v-dialog v-model="dialog" width="25%" @click:outside="$emit('close')">
      <v-card>
          <v-card-title>
              User your token
          </v-card-title>
          <v-card-text>
              <v-text-field label="Enter your token" v-model.number="userToken"/>
              <p>{{responseInfo.quizUrl}}</p>
              <v-btn v-show="responseInfo.quizUrl" :to="{path:updatedUrl}">Go to {{updatedUrl}}</v-btn>
          </v-card-text>
          <v-card-actions>
              <v-btn color="primary" @click="useToken">Send</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    name:'token',
    data:()=>({
        dialog:false,
        responseInfo:{},
        userToken:'',
    }),
    mounted(){
        this.dialog = true
    },
    methods: {
        async useToken(){
            let response = await this.$fetchData("POST", "/usetoken", {userToken:9828});
            //let response = await this.$fetchData("POST", "/usetoken", {userToken:this.userToken});
            this.responseInfo = response[0]
            this.$store.state.userName = `guest${this.responseInfo.userToken}`
            this.$store.state.token = this.responseInfo.userToken
            console.log(this.$store.state.userName)
        }
    },
    computed: {
        updatedUrl(){
            if(this.responseInfo.quizUrl) return this.responseInfo.quizUrl = this.responseInfo.quizUrl.replace('userName', `guest${this.responseInfo.userToken}`) 
        }
    },
}
</script>
