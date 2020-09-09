<template>
  <v-container fill-height>
    <v-card :width="isMobile?'100%':'50%'" class="mx-auto" v-if="initialData.dataFetched">
      <ul
        v-for="(answer, ind) in initialData.quizObj.quiz[initialData.wQu].answers"
        :style="{'border-radius':'50px', width:'50%'}"
        :key="ind"
      >
        <li>
          <p
            :class="answer.wasAnswered ?'light-green':''"
            @click="saveAnswer(answer)"
          >{{answer.answer}}</p>
          <p>{{answer.wasAnswered}}</p>
        </li>
      </ul>
      <!-- <v-card-title>
        <p>Question {{initialData.wQu + 1}}/{{initialData.quizObj.quiz.length}}: {{initialData.quizObj.quiz[initialData.wQu].question}}</p>
      </v-card-title>
      <v-card-subtitle>
        <v-text-field v-model="initialData.scoreCard.userName">
          <template #prepend>
            <p>Name:</p>
          </template>
        </v-text-field>
      </v-card-subtitle>
      <v-card-text>
        {{initialData.quizObj.quiz[0].answers}}
        
        <v-list-item
          v-for="(answer, ind) in initialData.quizObj.quiz[initialData.wQu].answers"
          :style="{'border-radius':'50px', width:'50%'}"
          :key="ind"
        >
          <v-list-item-content
            :class="answer.wasAnswered ?'light-green':''"
            @click="saveAnswer(answer, answer)"
          >{{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{answer.answer}}</v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="initialData.wQu <= 0" color="primary" :to="{name:'takequiz'}">Back</v-btn>
        <v-btn v-show="initialData.wQu > 0" color="primary" @click="removeAnswer"><</v-btn>
        <v-btn
          color="primary"
          @click="nextQuestion"
          :disabled="!initialData.quizObj.quiz[initialData.wQu].clicked || initialData.scoreCard.userName.length < 1"
        >{{initialData.nextQuestionButtonText}}</v-btn>
      </v-card-actions>-->
    </v-card>
    <EndScreen
      v-if="initialData.gameOver"
      @viewAnswers="viewAnswers"
      :scoreCard="initialData.scoreCard"
      :wQ="initialData.wQ"
      @retake="reset"
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
      initialData: {
        currentAnswer: "",
        dataFetched: false,
        gameOver: false,
        //used when to check the quizObj length -1. It's a 'magic number'
        lr: 1,
        nextQuestionButtonText: ">",
        noSelectedAnswer: true,
        quizObj: [],
        retakeQuiz: 0,
        scoreCard: { answers: [], questions: [], userName: "" },
        userChoicesMade: [],
        valid: true,
        //wQ stands for which quiz
        wQ: 1,
        //wQu stand for which question
        wQu: 0,
      },
      backUpData: {},
      test: false,
    };
  },
  mounted() {
    this.viewQuiz();
    this.backUpData = JSON.parse(JSON.stringify(this.initialData));
  },
  mixins: [isMobile],
  methods: {
    // reset is used to reset all the data when the user wishes to retake their quiz.
    reset() {
      this.initialData = this.backUpData;
      this.viewQuiz();
    },
    async viewQuiz() {
      const response = await this.$fetchData(
        "GET",
        `/viewquiz/?name=${encodeURI(
          this.$router.currentRoute.params.quizName
        )}`
      );
      this.initialData.quizObj = response[0];
      this.initialData.dataFetched = true;
      this.initialData.scoreCard.quizName = this.initialData.quizObj.quizName;
      this.initialData.scoreCard.questions = this.initialData.quizObj.quiz.map(
        (ele) => ele.question
      );
      // after we get the quiz from the db we need to ada few more properties to it
      this.initialData.quizObj.quiz.forEach((ele) => {
        // first we need to know if a user actually clicked on something so we can decide to let the user on
        // to the next question
        ele.clicked = false;
        // then we need to go through all the answers and add a wasAnswered property.
        // this sets which object the user clicked on. Read more on this in the savedAnswers function
        ele.answers.forEach((ele2) => {
          ele2.wasAnswered = false;
        });
      });
    },
    nextQuestion() {
      this.initialData.nQ++;
      this.initialData.scoreCard.answers.push(this.initialData.currentAnswer);
      this.initialData.scoreCard.points = this.initialData.scoreCard.answers.reduce(
        (acc, ele) => {
          if (ele.answered === true) acc++;
          return acc;
        },
        0
      );
      if (
        this.initialData.wQu ===
        this.initialData.quizObj.quiz.length - this.initialData.lr
      ) {
        this.initialData.gameOver = true;
      } else {
        this.initialData.noSelectedAnswer = true;
        this.initialData.wQu++;
      }
      this.initialData.currentAnswer = "";
    },
    removeAnswer() {
      this.initialData.wQu--;
      if (this.initialData.wQu <= 0) this.wQu = 0;
      this.initialData.scoreCard.answers.pop();
      console.log(this.initialData.scoreCard.points);
    },
    saveAnswer(quizObject) {
      
      // this.initialData.noSelectedAnswer = false;
      // this.initialData.currentAnswer = quizObject.answer;
      // we set if the user clicked on an object (an answer)
      //quizObject.clicked = true;
      // Loop through each answer and turn them all false.
      // If we don't do this then each time a user clicks on an answer it will turn green.
      this.initialData.quizObj.quiz.forEach((ele) => {
        ele.answers.forEach((ele2) => {
          if (ele2.answer === quizObject.answer) {
            ele2.wasAnswered = true;
            console.log(ele2)
          } else {
            console.log(ele2)
            ele2.wasAnswered = false;
          }
        });
      });
      

      // console.log(this.initialData.quizObj.quiz);
    },
    viewAnswers() {
      this.initialData.gameOver = false;
      this.initialData.wQu = 0;
    },
  },
  watch: {
    wQu() {
      if (
        this.initialData.wQu >=
        this.initialData.quizObj.quiz.length - this.initialData.lr
      ) {
        return (this.initialData.nextQuestionButtonText = "View Final Score");
      } else {
        return (this.initialData.nextQuestionButtonText = ">");
      }
    },
  },
};
</script>