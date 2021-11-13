<template>
  <v-container fluid>
    <v-data-table :items="yourMail" :headers="submitting?headers1:headers" :search="search">
      <template v-if="submitting" #body>
        <td class="text-center"><v-progress-circular indeterminate rotate="360"/></td>
      </template>
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
    headers1:[],
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
    submitting:false,
    search: "",
    yourMail: [],
  }),
  mounted() {
    this.checkEmail();
  },
  methods: {
    async checkEmail() {
        this.submitting = true
        const response = await this.$fetchData("POST", "/checkmail", {
          userName: this.$store.state.userName,
        });
        this.submitting = false
        console.log(response);
        response.request.ok?this.yourMail = response.requestData:''
        this.yourMail.forEach(ele => {
          ele.reviewed = true
        })
        this.updateEmail()
    },
    async updateEmail(){
      const response = await this.$fetchData("PUT", "/checkmail", {
          reviewed: true,
        });
    }
  },
};
</script>

<style>
</style>