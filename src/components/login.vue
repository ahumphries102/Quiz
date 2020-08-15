<template>
  <v-container fill-height>
    <v-card width="50%" class="mx-auto">
      <v-card-title>
        <p>Login</p>
      </v-card-title>
      <v-card-text>
        <v-text-field label="User Name" v-model="loginData.userName" />
        <v-text-field
          label="Password"
          v-model="loginData.password"
          :type="visible?'':'password'"
          :append-icon="visible?'mdi-eye':'mdi-eye-off'"
          @click:append="visible = !visible"
        />
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
import store from "../storage/store";
export default {
  name: "login",
  data: () => ({
    color: "",
    loginData: {
      password: "",
      userName: "",
    },
    responseMsg: "",
    submitted: false,
    visible: false,
  }),
  methods: {
    async login() {
      this.submitted = true;
      let response = await this.$fetchData(
        "POST",
        "/sendtoken",
        this.loginData
      );
      console.log(response);
      if (!response.error) {
        this.color = "green";
        this.responseMsg = response.message;
        this.$store.state.userName = this.loginData.userName;
        this.$store.state.token = response.token;
        this.$store.updateToken();
        this.$router
          .push({
            name: "createquiz",
            params: { userName: this.$store.state.userName },
          })
          .catch((err) => err);
        this.$root.loggedIn = true;
      } else {
        this.color = "red";
        this.responseMsg = response.message;
      }
      this.submitted = false;
    },
  },
};
</script>