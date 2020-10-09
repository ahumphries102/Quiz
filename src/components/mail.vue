<template>
  <v-card :width="$router.currentRoute.path.includes('viewquiz')?'100%':'50%'">
    <v-form ref="form">
      <v-card-title>Email a Quiz</v-card-title>
      <v-card-subtitle>Simply enter the users emailBody address and a subject letting them know you're sending.</v-card-subtitle>
      <v-card-text>
        <v-text-field label="to" v-model="emailBody.to" />
        <v-text-field label="from" v-model="emailBody.from" />
        <p :style="{color:color}" />
        <v-text-field label="subject" v-model="emailBody.subject" />
        <v-select :items="listOfFullUrls" v-model="chosenQuiz" label="Choose a Quiz"></v-select>
        <v-text-field label="Token" v-model="emailBody.userToken" :disabled="true" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="sendEmail">send</v-btn>
        <v-btn color="primary" text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "mail",
  data: () => ({
    allQuizzes: [],
    chosenQuiz: "",
    color: "",
    emailBody: {
      from: "",
      quizUrl: "",
      subject: "",
      to: "",
      userToken: 0,
    },
    listOfFullUrls: [],
    listOfUrls: [],
  }),
  mounted() {
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    this.emailBody.userToken = Math.floor(Math.random() * (max - min) + min);
    this.emailBody.from = this.$store.state.userName;
    this.getAllQuizzes();
  },
  methods: {
    createUrls() {
      let allQuizObjects = this.allQuizzes.map((ele) => ele.quizName);
      let filteredRouterProperties = this.$router.options.routes.filter((ele) =>
        ele.path.includes("takequiz/:quizName") ? ele.path : ""
      );
      this.listOfFullUrls = allQuizObjects.concat(filteredRouterProperties);
      
          console.log(allQuizObjects.concat(filteredRouterProperties))
      this.listOfUrls = this.listOfFullUrls.map(
        (ele) =>
          this.listOfFullUrls[this.listOfFullUrls.length-1].path.split(":")[1] +
          ele
      );
      this.listOfFullUrls = this.listOfFullUrls.map((ele) => ele);
    },
    async getAllQuizzes() {
      const response = await this.$fetchData("GET", "/allquizzes");
      this.allQuizzes = response;
      this.dataFetched = true;
      this.createUrls();
    },
    async sendEmail() {
      let quizSending = "";
      this.listOfUrls.forEach((ele) =>
        ele.includes(this.chosenQuiz) ? (quizSending = ele) : ""
      );
      quizSending = encodeURI(quizSending);
      this.emailBody.quizUrl = quizSending;
      this.emailBody.from = this.emailBody.from.toLowerCase()
      let response = await this.$fetchData("POST", "/savetokeninfo", this.emailBody);
      response = await this.$fetchData("POST", "/sendEmail", this.emailBody);
      //this.$refs.form.reset();
    },
  },
};
</script>
