<template>
  <div>
    <v-dialog v-model="dialog" :width="isMobile()?'100%':'50%'" persistent>
      <v-card class="text-center" v-if="!answersViewing">
        <v-card-title class="justify-center">
          <h2>Final Score</h2>
        </v-card-title>
        <v-divider class="my-2"/>
        <v-card-subtitle>
          <h3>You answered {{scoreCard.points}}/{{scoreCard.questions.length}} questions correctly</h3>
          <p>{{responseMsg}}</p>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text color="primary" class="mx-auto" @click="answersViewing = true">View Answers</v-btn>
          <v-btn text class="mx-auto" color="primary" @click="$emit('update')">Retake</v-btn>
          <v-btn text class="mx-auto" color="primary" :to="{name:'createquiz'}">Home</v-btn>
        </v-card-actions>
      </v-card>
      <FinalScore
        v-if="answersViewing"
        :allQuizzes="allQuizzes"
        @close="answersViewing = false"
        :wQ="wQ"
      />
    </v-dialog>
  </div>
</template>

<script>
import FinalScore from "./quizreview";
import { isMobile } from "../mixins/mixins";
export default {
  name: "EndGame",
  components: { FinalScore },
  props: {
    scoreCard: Object,
    wQ: Number,
  },
  data: () => ({
    answersViewing: false,
    dialog: false,
    responseMsg:""
  }),
  mixins: [isMobile],
  mounted() {
    this.dialog = true;
    this.saveScore();
  },
  methods: {
    async saveScore() {
      let newBody = JSON.parse(JSON.stringify(this.scoreCard));
      const dateObj = new Date();
      const month = dateObj.getUTCMonth(); //months from 1-12
      const day = dateObj.getUTCDate();
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
      
      newBody.day = day;
      newBody.month = monthNames[month]
      newBody.year = year
      console.log(newBody)
      const response = await this.$fetchData("POST", "/saveScore", newBody);
      this.responseMsg = response.message
    },
  },
};
</script>