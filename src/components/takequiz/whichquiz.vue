<template>
  <v-container fill-height>
    <v-card :width="$isMobile()?'100%':!initialData.enteredName?'35%':'20%'" class="mx-auto" v-if="initialData.dataFetched">
      <v-card-title v-show="!initialData.enteredName">
        <p :style="{'word-break':'break-word'}">Who is taking this quiz?</p>
        <v-text-field label="Enter your name" v-model="initialData.quizObj.userName" />
      </v-card-title>
      <v-card-text v-show="initialData.enteredName" class="pt-5">
        <p>Question {{initialData.wQu + 1}}/{{initialData.quizObj.quiz.length}}: {{initialData.quizObj.quiz[initialData.wQu].question}}</p>
        <v-list-item
          v-for="(answer, ind) in initialData.quizObj.quiz[initialData.wQu].answers"
          @click="saveAnswer(answer, initialData.quizObj.quiz[initialData.wQu])"
          :disabled="answer.userAnswer"
          :class="answer.userAnswer?'light-green':''"
          :dark="answer.userAnswer"
          :key="ind"
          :style="{'border-radius':'50px', width:'50%'}"
        >
          <v-list-item-content>{{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{answer.answer}}</v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!initialData.quizObj.userName.length"
          color="primary"
          v-show="!initialData.enteredName"
          @click="initialData.enteredName = true"
        >Continue</v-btn>
        <div v-show="initialData.enteredName">
          <v-btn
            v-show="initialData.wQu <= 0 && !$router.currentRoute.path.includes('guest')"
            color="primary"
            :to="{name:'takequiz'}"
          >Back</v-btn>
          <v-btn v-show="initialData.wQu > 0" color="primary" @click="removeAnswer"><</v-btn>
          <v-btn
            color="primary"
            @click="nextQuestion"
            :disabled="!initialData.quizObj.quiz[initialData.wQu].clicked  || initialData.quizObj.userName.length < 1 || !initialData.quizObj.userName.length"
          >{{initialData.nextQuestionButtonText}}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <EndScreen
      v-if="initialData.gameOver"
      @retake="reset"
      @viewAnswers="viewAnswers"
      :quizObj="initialData.quizObj"
      :wQ="initialData.wQ"
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
      // creating an initial data property is a rare occurence. I did this because I have to reset the data
      // if a user requests to retake their quiz. Vue does not allow developers to simply reset the data function return values.
      // however; we can get around this by simply resetting the initalData object. It must be backed up in order to reset the values.
      initialData: {
        currentAnswer: "",
        dataFetched: false,
        enteredName: false,
        gameOver: false,
        // used when to check the quizObj length -1. It's a 'magic number'
        lr: 1,
        nextQuestionButtonText: ">",
        quizObj: {},
        points: 0,
        usersAnswers: [],
        valid: true,
        // wQ stands for which quiz
        wQ: 1,
        // wQu stand for which question
        wQu: 0,
      },
      backUpData: {},
    };
  },
  mounted() {
    this.viewQuiz();
    // we create a clone of initial data so when a user retakes their quiz they can simply refresh the page
    // which will set inital data to the clone which... resets the data!
    this.backUpData = JSON.parse(JSON.stringify(this.initialData));
  },
  mixins: [isMobile],
  methods: {
    // reset is used to reset all the data when the user wishes to retake their quiz.
    reset() {
      this.initialData = JSON.parse(JSON.stringify(this.backUpData));
      this.viewQuiz();
    },
    async viewQuiz() {
      const response = await this.$fetchData(
        "GET",
        `/viewquiz/?name=${encodeURI(
          this.$router.currentRoute.params.quizName
        )}`
      );
      this.initialData.quizObj = response.response;
      this.initialData.quizObj.userName = "";
      this.initialData.dataFetched = true;
    },
    nextQuestion() {
      this.initialData.nQ++;
      // After we choose our answer and go to the next question we push into the answers array
      // a boolean value based on if the answer selected was true or false (correct or wrong)
      this.initialData.usersAnswers.push(this.initialData.currentAnswer);
      // we loop through that array and set the scoreCard points
      this.initialData.quizObj.points = this.initialData.usersAnswers.reduce(
        (acc, ele) => {
          // since we're reducing, we're basically adding each true value up and setting the score to that.
          if (ele === true) acc++;
          // if we don't find a true value we return the value of the acc, which would be 0
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
        this.initialData.wQu++;
      }
    },
    removeAnswer() {
      this.initialData.wQu--;
      if (this.initialData.wQu <= 0) this.wQu = 0;
      this.initialData.usersAnswers.pop();
    },
    saveAnswer(quizObject, quizObjectParent) {
      // quizObjectParent is one step up from quizObject in its object hierarchy.
      // Each quiz has X amount of quizObjects based on how many the user creates. Each question must
      // have a click property so we can keep track if a user made chose an answer.
      quizObjectParent.clicked = true;
      this.initialData.currentAnswer = quizObject.theAnswer;
      quizObjectParent.answers.forEach((ele) => {
        // Loop through each answer and turn them all false.
        // If we don't do this then each time a user clicks on an answer it will turn green.
        ele.answer === quizObject.answer
          ? (ele.userAnswer = true)
          : (ele.userAnswer = false);
      });
      // vue is not observing when a user makes a selection so I force an update to happen.
      this.$forceUpdate();
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