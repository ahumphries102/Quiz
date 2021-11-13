<template>
  <v-card
    :width="
      $router.currentRoute.path.includes('viewquiz')
        ? '100%'
        : $isMobile()
        ? '80%'
        : '50%'
    "
    :class="$isMobile() ? 'mx-auto' : ''"
  >
    <v-form v-model="valid" :disabled="submitted">
      <v-card-title>Email a Quiz</v-card-title>
      <v-card-subtitle
        >Simply enter the users emailBody address and a subject letting them
        know you're sending.</v-card-subtitle
      >
      <v-card-text>
        <v-text-field
          label="to"
          v-model="emailBody.to"
          :rules="$rules.length"
        />
        <v-text-field
          :disabled="true"
          label="from"
          v-model="emailBody.from"
          :rules="$rules.length"
        />
        <p :style="{ color: color }" />
        <v-text-field
          label="subject"
          v-model="emailBody.subject"
          :rules="$rules.length"
        />
        <v-select
          :items="quizNames"
          v-model="chosenQuiz"
          label="Choose a Quiz"
          :rules="$rules.length"
        />
        <v-text-field
          label="Token"
          v-model="emailBody.userToken"
          :disabled="true"
        />
        <p :style="{ color: rsp.error ? 'red' : 'green' }">{{ rsp.msg }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          color="primary"
          text
          @click="sendEmail"
          :loading="submitting"
          >send</v-btn
        >
        <v-btn color="primary" text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
console.clear()
export default {
  name: "emailform",
  data: () => ({
    allQuizzes: [],
    chosenQuiz: "",
    color: "",
    emailBody: {
      from: "",
      quizUrl: "",
      subject: "",
      to: "",
      read: false,
      userToken: 0,
    },
    quizNames: [],
    listOfUrls: [],
    rsp: {
      error: false,
      msg: "",
    },
    submitted: false,
    submitting: false,
    valid: true,
  }),
  mounted() {
    this.generateToken()
    this.emailBody.from = this.$store.state.userName;
    this.getAllQuizzes();
  },
  methods: {
    generateToken() {
      const min = Math.floor(1000);
      const max = Math.ceil(9999);
      this.emailBody.userToken = Math.floor(Math.random() * (max - min) + min);
    },
    createUrls() {
      this.quizNames = this.allQuizzes.map((ele) => ele.quizName);
      // find the element in the router options that contains the object with the path that has takequiz in it
      const routerPathTakeQuiz = this.$router.options.routes[this.$router.options.routes.findIndex((ele) =>
        ele.path.includes("takequiz/:quizName") ? ele.path : ""
      )];
      this.quizNames.push(routerPathTakeQuiz);
      this.listOfUrls = this.quizNames.map(
        (ele) =>
          this.quizNames[this.quizNames.length - 1].path.split(
            ":"
          )[1] + ele
      );
    },
    async getAllQuizzes() {
      this.allQuizzes = (await this.$fetchData("GET", "/allquizzes")).requestData
      this.createUrls();
    },
    async sendEmail() {
      this.submitting = true;
      let quizSending = "";
      this.listOfUrls.forEach((ele) =>
        ele.includes(this.chosenQuiz) ? (quizSending = ele) : ""
      );
      quizSending = encodeURI(quizSending);
      this.emailBody.quizUrl = quizSending;
      this.emailBody.from = this.emailBody.from.toLowerCase();
      const response = await Promise.allSettled([this.$fetchData("POST","/savetokeninfo",this.emailBody), this.$fetchData("POST", "/sendEmail", this.emailBody)])
      this.submitting = false;
      if (!response[1].value.requestData.error) {
        this.submitted = true;
        this.rsp.error = false;
      } else {
        this.rsp.error = true;
      }
      this.rsp.msg = response[1].value.requestData.message;
    },
  },
};
</script>
