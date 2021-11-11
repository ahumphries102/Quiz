<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(letter, ind) in mail" :key="ind">
        <router-link
          :to="{
            name: 'individualMail',
            params: {
              userName: $store.state.userName
                ? $store.state.userName
                : 'default',
              id: letter._id,
            },
          }"
          >{{ letter.userName }}</router-link
        >
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "mainMail",
  data: () => ({
    mail: [],
  }),
  mounted() {
    this.checkEmail();
  },
  methods: {
    async checkEmail() {
      this.submitting = true;
      const response = await this.$fetchData("POST", "/checkmail", {
        userName: this.$store.state.userName,
      });
      this.submitting = false;
      response.requestData.ok ? (this.mail = response.requestData) : "";
      this.mail.forEach((ele) => {
        ele.reviewed = true;
      });
    },
  },
};
</script>

<style>
</style>