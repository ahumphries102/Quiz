<template>
  <v-container fill-height>
    <v-card :width="isMobile()?'100%':'50%'" class="mx-auto" v-if="dataFetched">
      <v-card-title>
        <p>Question {{wQu + 1}}/{{quizObj.quiz.length}}: {{quizObj.quiz[0].question}}</p>
      </v-card-title>
      <v-card-subtitle>
        <v-text-field v-model="scoreCard.userName">
          <template #prepend>
            <p>Name:</p>
          </template>
        </v-text-field>
      </v-card-subtitle>
      <v-card-text>
        <v-list-item
          v-for="(answer, ind) in quizObj.quiz[wQu].answers"
          :class="currentAnswer === answer?'light-green':''"
          :dark="currentAnswer === answer"
          :style="{'border-radius':'50px'}"
          :key="ind"
          @click="saveAnswer(answer)"
        >{{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{answer.answer}}</v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="wQu <= 0" color="primary" :to="{name:'takequiz'}">View Quizzes</v-btn>
        <v-btn v-show="wQu > 0" color="primary" @click="removeAnswer"><</v-btn>
        <v-btn
          color="primary"
          @click="nextQuestion"
        >{{nextQuestionButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
    <EndScreen
      v-if="gameOver"
      @viewAnswers="viewAnswers"
      :quizObj="quizObj"
      :scoreCard="scoreCard"
      :wQ="wQ"
    />
  </v-container>
</template>

<script>
import EndScreen from "../endScreen";
import { isMobile } from "../../mixins/mixins";
export default {
  name: "whichquiz",
  components: {
    EndScreen,
  },
  data() {
    return {
      currentAnswer: "",
      dataFetched: false,
      gameOver: false,
      //used when to check the quizObj length -1
      lr: 1,
      nextQuestionButtonText: ">",
      noSelectedAnswer: true,
      quizObj: [],
      scoreCard:{
        points:[],
        answerToChoose:[],
        answers:[],
        userName:"",
        quizName:"",
        question:""
      },
      valid: true,
      //wQ stands for which quiz
      wQ: 1,
      //wQu stand for which question
      wQu: 0,
    };
  },
  mounted() {
    this.viewQuiz();
  },
  mixins: [isMobile],
  methods: {
    async viewQuiz() {
      const response = await this.$fetchData("GET", `/viewquiz/?name=${this.$router.currentRoute.params.quizName}`);
      this.quizObj = response[0];
      this.dataFetched = true;
      console.log(this.quizObj)
      this.scoreCard.quizName = this.quizObj.quizName
    },
    nextQuestion() {
      this.nQ++;
      this.scoreCard.answers.push(this.currentAnswer);
      this.scoreCard.points = this.scoreCard.answers.reduce((acc, ele) => {
        if (ele === true) acc++
        return acc;
      }, 0);

      if (this.wQu === this.quizObj.quiz.length - this.lr) {
        this.gameOver = true;
      } else {
        this.noSelectedAnswer = true;
        this.wQu++;
      }
      this.currentAnswer = "";
    },
    removeAnswer() {
      this.wQu--;
      if (this.wQu < 0) {
        this.wQu = 0;
      }
      this.scoreCard.answers.points.pop();
    },
    saveAnswer(value) {
      console.log(value)
      this.noSelectedAnswer = false;
      this.currentAnswer = value;
    },
    viewAnswers() {
      this.gameOver = false;
      this.wQu = 0;
    },
  },
  watch: {
    wQu() {
      if (this.wQu >= this.quizObj.quiz.length - this.lr) {
        return (this.nextQuestionButtonText = "View Final Score");
      } else {
        return (this.nextQuestionButtonText = ">");
      }
    },
  },
};
</script>