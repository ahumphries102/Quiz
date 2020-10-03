<template>
  <v-container>
    <p>Name: {{yourMail.userName}}</p>
    <p>Name of quiz taken: {{yourMail.quizName}}</p>
    <p>Points scored: {{yourMail.points}}</p>
    <p>Quiz taken on {{yourMail.month}}/ {{yourMail.date}}/ {{yourMail.year}}</p>
  </v-container>
</template>

<script>
export default {
  name: "checkemail",
  data: () => ({
    yourMail: {},
  }),
  mounted() {
    this.checkEmail();
  },
  methods: {
    async checkEmail() {
      let response = await this.$fetchData("POST", "/checkmail", {
        userName: this.$store.state.userName,
      });
      this.yourMail = response[0];
    },
  },
};
</script>

<style>
</style>