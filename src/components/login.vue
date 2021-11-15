<template>
  <v-container fill-height>
    <v-card :width="$isMobile() ? '80%' : '35%'" class="mx-auto">
      <v-card-title>
        <p>Login</p>
      </v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field
            label="User Name"
            v-model="loginData.userName"
            :rules="$rules.length"
          />
          <v-text-field
            label="Password"
            v-model="loginData.password"
            @click:append="visible = !visible"
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="$rules.length"
            :type="visible ? '' : 'password'"
          />
          <p :style="{ color: color }">{{ responseMsg }}</p>
          <Token @close="() => (tokenUsed = false)" v-if="tokenUsed" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="$router.push({ name: 'signup' })"
            >Signup</v-btn
          >
          <v-btn color="primary" @click="tokenUsed = true">Use token</v-btn>
          <v-btn
            :disabled="!valid"
            :loading="submitted"
            color="primary"
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
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
    valid: true,
    visible: false,
  }),
  methods: {
    // check email will check once and then call constantlyCheckEmails to check again and again.
    async constantlyCheckEmail(){
      const timeout = setInterval(async () => {
        // When a user logs in, we begin checking for new emails by checking if they're not on the login page and they have a username.
        if (this.$router.currentRoute.path.includes("login") || !this.$store.state.userName.length) {
          clearInterval(timeout)
          return
        }
        let emails = await this.$fetchData("POST", "/checkmail", {
          userName: this.$store.state.userName,
        });
        this.$store.emailInfo.emails = emails.requestData
      }, 10000);
    },
    async login() {
      this.submitted = true;
      let response = await this.$fetchData(
        "POST",
        "/sendtoken",
        this.loginData
      );
      if (!response.requestData.error) {
        this.color = "green";
        this.responseMsg = response.requestData.message;
        this.$store.state.userName = this.loginData.userName;
        this.$store.state.token = response.requestDatatoken;
        this.$store.updateToken();
        this.$router
          .push({
            name: "createquiz",
            params: {
              userName: this.$store.state.userName,
            },
          })
          .catch((err) => console.error(err));
        this.$root.loggedIn = true;

        this.$store.checkEmail();
        this.constantlyCheckEmail()
      } else {
        this.color = "red";
        this.responseMsg = response.requestData.message;
      }
      this.submitted = false;
    },
  },
};
</script>
