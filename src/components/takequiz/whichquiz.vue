<template>
  <v-container fill-height>
    <v-card :width="isMobile()?'100%':'50%'" class="mx-auto" v-if="dataFetched">
      <v-card-title>
        <p>Question {{wQu + 1}}/{{allQuizzes[wQ].quiz.length}}: {{allQuizzes[wQ].quiz[0].question}}</p>
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
          v-for="(quiz, ind) in allQuizzes[wQ].quiz[wQu].answers"
          :class="currentAnswer === quiz.answered?'light-green':''"
          :dark="currentAnswer === quiz.answered"
          :style="{'border-radius':'50px'}"
          :key="ind"
          @click="saveAnswer(quiz.answered)"
        >{{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{quiz.answer}}</v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="wQu <= 0" color="primary" :to="{name:'takequiz'}">View Quizzes</v-btn>
        <v-btn v-show="wQu > 0" color="primary" @click="removeAnswer"><</v-btn>
        <v-btn
          color="primary"
          :disabled="noSelectedAnswer || wQu >= allQuizzes[wQ].quiz.length + lr"
          @click="nextQuestion"
        >{{nextQuestionButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
    <EndScreen
      v-if="gameOver"
      @viewAnswers="viewAnswers"
      :allQuizzes="allQuizzes"
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
      allQuizzes: [],
      currentAnswer: "",
      dataFetched: false,
      gameOver: false,
      //used when to check the allQuizzes length -1
      lr: 1,
      nextQuestionButtonText: ">",
      noSelectedAnswer: true,
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
      // const response = await this.$fetchData("GET", "/viewquiz/1", {
      //   userName: this.$store.state.userName,
      // });
      console.log(this.$router.currentRoute)
      const response = await this.$fetchData("GET", `/viewquiz/?name=`);
      this.allQuizzes = response;
      this.dataFetched = true;

      this.allQuizzes.forEach(ele => {
      this.scoreCard.quizName = ele.quizName
    })
    console.log(this.allQuizzes)
    },
    nextQuestion() {
      this.nQ++;
      this.scoreCard.answers.push(this.currentAnswer);
      this.scoreCard.points = this.scoreCard.answers.reduce((acc, ele) => {
        if (ele === true) acc++
        return acc;
      }, 0);

      if (this.wQu === this.allQuizzes[this.wQ].quiz.length - this.lr) {
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
      this.scoreCard.points.pop();
    },
    saveAnswer(value) {
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
      if (this.wQu >= this.allQuizzes[this.wQ].quiz.length - this.lr) {
        return (this.nextQuestionButtonText = "View Final Score");
      } else {
        return (this.nextQuestionButtonText = ">");
      }
    },
  },
};
</script>