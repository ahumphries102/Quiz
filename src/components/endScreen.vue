<template>
  <v-dialog v-model="dialog" :width="$isMobile()?'80%':'50%'" persistent>
    <v-card class="text-center" v-if="!answersViewing && !$router.currentRoute.path.includes('guest')">
      <v-card-title class="justify-center">
        <h2>Final Score</h2>
      </v-card-title>
      <v-divider class="my-2" />
      <v-card-subtitle>
        <h3>You answered {{quizObj.points}}/{{quizObj.quiz.length}} questions correctly</h3>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text color="primary" class="mx-auto" @click="answersViewing = true">View Answers</v-btn>
        <v-btn text class="mx-auto" color="primary" @click="$emit('retake')">Retake</v-btn>
        <v-btn text class="mx-auto" color="primary" :to="{name:'createquiz'}">Home</v-btn>
      </v-card-actions>
    </v-card>

    <!-- this card is only displayed to guest users -->
    <v-card class="text-center" v-if="!answersViewing && $router.currentRoute.path.includes('guest')">
      <v-card-title class="justify-center">
        <h2>Final Score</h2>
      </v-card-title>
      <v-divider class="my-2" />
      <v-card-subtitle>
        <h3>You answered {{quizObj.points}}/{{quizObj.quiz.length}} questions correctly</h3>
        <p>{{responseMsg}}</p>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text color="primary" class="mx-auto" @click="answersViewing = true">View Answers</v-btn>
        <v-btn text class="mx-auto" color="primary" :to="{name:'login'}">Home</v-btn>
      </v-card-actions>
    </v-card>
    <QuizReview @close="answersViewing = false" v-if="answersViewing" :quizObj="quizObj" :wQ="wQ" />
  </v-dialog>
</template>

<script>
import QuizReview from "./quizreview";
import { isMobile } from "../mixins/mixins";
export default {
  name: "EndGame",
  components: { QuizReview },
  props: {
    quizObj: Object,
    wQ: Number,
  },
  data: () => ({
    answersViewing: false,
    dialog: false,
    responseMsg: "",
  }),
  mixins: [isMobile],
  mounted() {
    this.dialog = true;
    this.saveScore();
  },
  methods: {
    async saveScore() {
      
      let newBody = JSON.parse(JSON.stringify(this.quizObj));
      const dateObj = new Date();
      const month = dateObj.getUTCMonth(); //months from 1-12
      const date = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      newBody = {
        date: date,
        month: monthNames[month],
        year: year,
        userName:this.quizObj.userName,
        quizName:this.quizObj.quizName,
        points:this.quizObj.points,
        pointsPossible: this.quizObj.quiz.length,
        whoSentQuiz: this.$store.emailInfo.from,
        completed: true,
        reviewed:false,
      };
      console.log(this.$store.emailInfo);
       const response = await this.$fetchData("POST", "/saveScore", newBody);
       this.responseMsg = response.message;
    },
  },
};
</script>