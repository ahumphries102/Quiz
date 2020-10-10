<template>
  <v-container fluid>
    <v-data-table :items="yourMail" :headers="headers" :search="search">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            <p>Email</p>
          </v-toolbar-title>
          <v-spacer />
          <v-text-field label="Filter" v-model="search" append-icon="mdi-magnify" />
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "checkemail",
  data: () => ({
    headers: [
      {
        text: "Test Taker",
        value: "userName",
      },
      {
        text: "Quiz Taken",
        value: "quizName",
      },
      {
        text: "Points Scored",
        value: "points",
      },
      {
        text: "Month",
        value: "month",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Year",
        value: "year",
      },
    ],
    search: "",
    yourMail: [],
  }),
  mounted() {
    this.checkEmail();
  },
  methods: {
    async checkEmail() {
        const response = await this.$fetchData("POST", "/checkmail", {
          userName: this.$store.state.userName,
        });
        response.request.ok?this.yourMail = response.response:''
    },
  },
};
</script>

<style>
</style>