<template>
  <v-container fill-height>
    <v-card :width="$isMobile()?'80%':'50%'" class="mx-auto" :loading="submitted">
      <v-card-title>Signup</v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field label="Enter a User Name" v-model="userName" :rules="$rules.length" />
          <v-text-field
            label="Enter a Password"
            v-model="password"
            :type="visible?'':'password'"
            :append-icon="visible?'mdi-eye':'mdi-eye-off'"
            @click:append="visible = !visible"
            :rules="$rules.length"
          />
          <p :style="{color:color}">{{responseMsg}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="$router.push({name:'login'})">Cancel</v-btn>
          <v-btn :disabled="!valid" color="primary"  @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    color: "",
    password: "",
    responseMsg: "",
    submitted: false,
    userName: "",
    valid: true,
    visible: false,
  }),
  methods: {
    async submit() {
      this.submitted = true;
      let response = await this.$fetchData(
        "POST",
        "/createUser",
        {
          userName: this.userName.toLowerCase(),
          password: this.password,
        } // body data type must match "Content-Type" header
      );
      if (!response.error) {
        this.$router.push({ name: "login" }).catch((err) => err);
      } else {
        this.color = "red";
        this.responseMsg = response.message;
        this.submitted = false;
      }
      this.submitted = false;
    },
  },
};
</script>