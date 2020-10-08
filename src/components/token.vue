<template>
  <v-dialog v-model="dialog" width="80%" @click:outside="$emit('close')">
      <v-card>
          <v-card-title>
              User your token
          </v-card-title>
          <v-card-text>
              <v-text-field label="Enter your token" v-model.number="userToken"/>
              <p v-show="resIn.quizUrl">You are about to take the quiz <strong>{{resIn.quizUrl?resIn.quizUrl.split('takequiz/')[1]:''}}</strong></p>
          </v-card-text>
          <v-card-actions>
              <v-btn v-show="resIn.quizUrl" color="primary" :to="{path:updatedUrl}">Take Quiz</v-btn>
              <v-btn v-show="!resIn.quizUrl" color="primary" @click="useToken">Send</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    name:'token',
    data:()=>({
        dialog:false,
        // short for responseInfo
        resIn:{},
        userToken:'',
    }),
    mounted(){
        this.dialog = true
    },
    methods: {
        async useToken(){
            let response = await this.$fetchData("POST", "/usetoken", {userToken:this.userToken});
            this.resIn = response[0]
            this.$store.state.userName = `guest${this.resIn.userToken}`
            this.$store.emailInfo.from = response[0].from
        }
    },
    computed: {
        updatedUrl(){
            if(this.resIn.quizUrl) return this.resIn.quizUrl = this.resIn.quizUrl.replace('userName', `guest${this.resIn.userToken}`) 
        }
    },
}
</script>
