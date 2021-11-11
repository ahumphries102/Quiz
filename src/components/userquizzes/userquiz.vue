<template>
  <div>
    <v-card v-if="dataRetrieved">
      <v-card-title :style="{'word-break':'break-word'}">
        <h3 >Question {{nextQuestion + 1}}/{{allQuizzes[routeId].quiz.length}}: {{allQuizzes[routeId].quiz[nextQuestion].question}}</h3>
      </v-card-title>
      <v-card-subtitle>
        <v-icon @click="emailDialog = true">mdi-email</v-icon>
      </v-card-subtitle>
      <v-card-text v-if="dataRetrieved">
        <v-list-item
          v-for="(element, ind) in allQuizzes[routeId].quiz[nextQuestion].answers"
          :key="ind"
          :style="{color:element.theAnswer?'green !important':'red !important'}"
        >
        {{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{element.answer}}</v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="nextQuestion <= 0" color="primary" :to="{name:'viewquiz'}">Back</v-btn>
        <v-btn
          v-show="nextQuestion > 0"
          color="primary"
          :disabled="nextQuestion < 1"
          @click="nextQuestion--"
        ><</v-btn>
        <v-btn
          color="primary"
          :disabled="nextQuestion >= allQuizzes[routeId].quiz.length - 1 "
          @click="nextQuestion++"
        >></v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="emailDialog" :width="$isMobile()?'80%':'35%'">
      <Mail @close="emailDialog = false"/>
    </v-dialog>
  </div>
</template>

<script>
import Mail from '../mail/mailForm'
export default {
  name: "userquiz",
  components:{ Mail },
  data: () => ({
    adjustedQuizzes: [],
    allQuizzes: [],
    color:'',
    dataRetrieved: false,
    email: {
      from: "",
      to: "",
      password: "",
      subject: "",
      quizUrl: ""
    },
    emailDialog: false,
    responseMsg: "",
    routeId: 0,
    changeQ: 0,
    nextQuestion: 0,
    visible:false,
  }),
  created() {
    this.viewQuiz();
    this.routeId = this.$route.params.id;
    this.email.quizUrl = 'https://quizzor.herokuapp.com/#'+this.$router.currentRoute.path
  },
  methods: {
    async viewQuiz() {
      const response = await this.$fetchData("POST", "/viewquiz", {
        userName: this.$store.state.userName
      });
      this.allQuizzes = response.requestData;
      this.responseMsg = response.requestData;
      this.dataRetrieved = true;
    },
    async sendEmail() {
      const response = await this.$fetchData(
        "POST",
        "/sendEmail",
        this.email
      );
      this.$refs.form.reset()
    }
  }
};
</script>

<style>
</style>