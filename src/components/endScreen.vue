<template>
  <div>
    <v-dialog v-model="dialog" :width="isMobile()?'100%':'50%'" persistent>
      <v-card class="text-center" v-if="!answersViewing">
        <v-card-title class="justify-center">
          <h2>Final Score</h2>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <h2>Congratulations You Answered</h2>
          <!-- <h2>{{quizreview}} out {{allQuizzes[0].quiz.length}} Questions Correctly!</h2> -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="mx-auto" @click="answersViewing = true">View Answers</v-btn>
        </v-card-actions>
        <v-divider class="my-10" />
        <v-card-text>
          <h2>Would you like to save your quiz?</h2>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn class="mx-auto" color="primary" @click="saveQuiz">Save Quiz</v-btn> -->
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
    allQuizzes: Array,
    scoreCard: Object,
    wQ: Number,
  },
  data: () => ({
    answersViewing: false,
    dialog: false,
  }),
  mixins: [isMobile],
  mounted() {
    this.dialog = true;
    this.saveScore();
    console.log(this.scoreCard)
  },
  methods: {
    async saveScore() {
      const response = this.$fetchData("POST", "/saveScore");
    },
  },
};
</script>