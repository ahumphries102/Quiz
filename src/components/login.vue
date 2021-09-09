<template>
  <v-container fill-height>
    <v-card :width="$isMobile()?'80%':'35%'" class="mx-auto">
      <v-card-title>
        <p>Login</p>
      </v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field label="User Name" v-model="loginData.userName" :rules="$rules.length" />
          <v-text-field
            label="Password"
            v-model="loginData.password"
            @click:append="visible = !visible"
            :append-icon="visible?'mdi-eye':'mdi-eye-off'"
            :rules="$rules.mustBeNumber"
            :type="visible?'':'password'"
          />
          <p :style="{color:color}">{{responseMsg}}</p>
          <Token @close="()=> tokenUsed = false" v-if="tokenUsed" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="$router.push({name:'signup'})">Signup</v-btn>
          <v-btn color="primary" @click="tokenUsed = true">Use token</v-btn>
          <v-btn :disabled="!valid" :loading="submitted" color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import store from "../storage/store";
import Token from "./token";
export default {
  name: "login",
  components: {
    Token,
  },
  data: () => ({
    color: "",
    loginData: {
      password: "",
      userName: "",
    },
    responseMsg: "",
    submitted: false,
    tokenUsed: false,
    timeout: false,
    valid: true,
    visible: false,
  }),
  methods: {
    
    async checkEmail() {
      let response = await this.$fetchData("POST", "/checkmail", {
        userName: this.$store.state.userName,
      });
      let unreadEmails = response.response.filter((ele) => !ele.reviewed);
      this.$store.emailInfo.unread = unreadEmails.length;
      this.timeout = setInterval(async () => {
        // When a user logs in, we begin checking for new emails every so many seconds.
        // if that user signsout we stop checking for new emails.
        if(this.$router.currentRoute.path.includes('login') || !this.$store.state.userName.length){
          clearInterval(this.timeout);
          console.log('all done')
          return
        }
        response = await this.$fetchData("POST", "/checkmail", {
          userName: this.$store.state.userName,
        });
        unreadEmails = response.response.filter((ele) => !ele.reviewed);
        this.$store.emailInfo.unread = unreadEmails.length;
      }, 30000);
    },
    async login() {
      this.submitted = true;
      let response = await this.$fetchData(
        "POST",
        "/sendtoken",
        this.loginData
      );
      if (response.request) {
        this.color = "green";
        this.responseMsg = response.response.message;
        this.$store.state.userName = this.loginData.userName;
        this.$store.state.token = response.response.token;
        this.$store.updateToken();
        this.$router
          .push({
            name: "createquiz",
            params: {
              userName: this.$store.state.userName,
            },
          })
          .catch((err) => err);
        this.$root.loggedIn = true;

        this.checkEmail();
        //this.$store.emailInfo.inbox = response.response.length
      } else {
        this.color = "red";
        this.responseMsg = response.response.message;
      }
      this.submitted = false;
    },
  },
};
</script>
