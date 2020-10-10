<template>
  <v-dialog v-model="dialog" :width="$isMobile()?'80%':'25%'" @click:outside="$emit('close')">
      <v-card>
          <v-card-title>
              User your token
          </v-card-title>
          <v-form v-model="valid">
              
          <v-card-text>
              <v-text-field label="Enter your token" v-model="userToken" :rules="$rules.password"/>
              <p v-show="resIn.quizUrl">You are about to take the quiz <strong>{{resIn.quizUrl?resIn.quizUrl.split('takequiz/')[1]:''}}</strong></p>
          </v-card-text>
          <v-card-actions>
              <v-spacer/>
              <v-btn v-show="resIn.quizUrl" color="primary" :to="{path:updatedUrl}">Take Quiz</v-btn>
              <v-btn :disabled="!valid" v-show="!resIn.quizUrl" color="primary" @click="useToken">Send</v-btn>
          </v-card-actions>
          </v-form>
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
        valid:true,
    }),
    mounted(){
        this.dialog = true
    },
    methods: {
        async useToken(){
            const response = await this.$fetchData("POST", "/usetoken", {userToken:this.userToken});
            this.resIn = response.response[0]
            this.$store.state.userName = `guest${this.resIn.userToken}`
            this.$store.emailInfo.from = response.response[0].from
        }
    },
    computed: {
        updatedUrl(){
            if(this.resIn.quizUrl) return this.resIn.quizUrl = this.resIn.quizUrl.replace('userName', `guest${this.resIn.userToken}`) 
        }
    },
}
</script>
