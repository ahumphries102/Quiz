<template>
  <v-container fill-height>
    <v-card :width="isMobile()?'100%':'50%'" class="mx-auto" v-if="dataFetched">
      <v-card-title>
        <p>Question {{wQu + 1}}/{{allQuizzes[wQ].quiz.length}}: {{allQuizzes[wQ].quiz[0].question}}</p>
        <v-text-field label="Who is taking this quiz?" v-model="userName" />
      </v-card-title>
      <v-card-text> 
        <v-list-item
          v-for="(quiz, ind) in allQuizzes[wQ].quiz[wQu].answers"
          :class="currentAnswer === allQuizzes[wQ].quiz[0].answers[ind].answered?'light-green':''"
          :dark="currentAnswer === allQuizzes[wQ].quiz[0].answers[ind].answered"
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
      :allQuizzes="allQuizzes"
      :quizreview="quizreview"
      @viewAnswers="viewAnswers"
      :tallyScore="tallyScore"
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
    EndScreen
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
      quizChosen: false,
      quizreview: 0,
      userScoreCard: {},
      userName: "",
      valid: true,
      //wQ stands for which quiz
      wQ: 1,
      //wQu stand for which question
      wQu: 0
    };
  },
  mounted() {
    this.viewQuiz();
  },
  mixins: [isMobile],
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    async viewQuiz() {
      let request = await this.$root.fetchData("POST", "/viewquiz", {
        userName: this.$store.state.userName
      });
      this.allQuizzes = request;
      this.dataFetched = true;
    },
    chooseQuiz(chosenQuiz) {
      this.quizChosen = true;
      this.wQ = chosenQuiz;
    },
    nextQuestion() {
      this.nQ++;
      this.tallyScore.push(this.currentAnswer);
      this.quizreview = this.tallyScore.reduce((acc, ele) => {
        if (ele === true) {
          acc++;
        }
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
    prevQuestion() {
      this.wQu--;
      if (this.allQuizzes.length - this.lr != this.wQu) {
        this.nextQuestionButtonText = "Save Answer?";
      }
    },
    removeAnswer() {
      this.wQu--;
      if (this.wQu < 0) {
        this.quizChosen = false;
        this.wQu = 0;
      }
      this.tallyScore.pop();
    },
    saveAnswer(value) {
      this.noSelectedAnswer = false;
      this.currentAnswer = value;
    },
    viewAnswers() {
      this.gameOver = false;
      this.wQu = 0;
    }
  },
  watch: {
    wQu() {
      if (this.wQu >= this.allQuizzes[this.wQ].quiz.length - this.lr) {
        return (this.nextQuestionButtonText = "View Final Score");
      } else {
        return (this.nextQuestionButtonText = ">");
      }
    }
  }
};
</script>