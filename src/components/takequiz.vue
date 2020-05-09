<template>
  <v-container fill-height>
    <v-card class="mx-auto" v-show="!gameOver" v-if="dataRetrieved" width="35%">
      <v-card-title>
        <h3>Quiz</h3>
      </v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <v-list-item :style="{'border-radius':'50px'}"
            :dark="currentAnswer === allQuizzes[0].quiz[0].answers[ind].answered"
            :class="currentAnswer === allQuizzes[0].quiz[0].answers[ind].answered?'light-green':''"
            v-for="(quiz, ind) in allQuizzes[0].quiz[nextQ].answers" :key="ind" @click="saveAnswer(quiz.answered)">
            {{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{quiz.answer}}
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="nextQ < 1" @click="removeAnswer">
            <</v-btn> <v-btn color="primary" :disabled="noSelectedAnswer || nextQ >= allQuizzes[0].quiz.length + lr"
              @click="nextQuestion">{{nextQuestionButtonText}}
          </v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
    <EndScreen v-if="gameOver" :allQuestionsAnswers="allQuestionsAnswers" :allQuizzes="allQuizzes"
      :finalScore="finalScore" @viewAnswers="viewAnswers" :tallyScore='tallyScore' />
  </v-container>
</template>

<script>
  import EndScreen from './endScreen'
  export default {
    name: 'takequiz',
    props: {
      allQuestionsAnswers: Array
    },
    components: {
      EndScreen
    },
    data() {
      return {
        allQuizzes: [],
        currentAnswer: '',
        dataRetrieved: false,
        finalScore: 0,
        gameOver: false,
        //used when I must check the allQuizzes length -1
        lr: 1,
        nextQ: 0,
        nextQuestionButtonText: '>',
        noSelectedAnswer: true,
        tallyScore: [],
        test: false,
        valid: true,
      }
    },
    filters: {
      alwaysCap() {
        return this.allQuizzes[0].quiz[0].answers.charAt(0).toUpperCase()
      }
    },
    beforeMount() {
      this.viewQuiz()
    },
    methods: {
      async viewQuiz() {
        let request = await this.$root.fetchData('POST', "/viewquiz", {
          username: this.$store.state.username
        })
        if (request) {
          this.dataRetrieved = true
        }
        this.allQuizzes = request
      },
      removeAnswer() {
        this.nextQ--
        this.tallyScore.pop()
      },
      nextQuestion() {
        this.tallyScore.push(this.currentAnswer)
        this.finalScore = this.tallyScore.reduce((acc, ele) => {
          if (ele === true) {
            acc++
          }
          return acc
        }, 0)

        if (this.nextQ === this.allQuizzes[0].quiz.length - this.lr) {
          this.gameOver = true
        } else {
          this.noSelectedAnswer = true
          this.nextQ++
        }
        this.currentAnswer = ''
      },
      prevQuestion() {
        this.nextQ--
        if (this.allQuizzes.length - this.lr != this.nextQ) {
          this.nextQuestionButtonText = 'Save Answer?'
        }
      },
      saveAnswer(value) {
        this.noSelectedAnswer = false
        this.currentAnswer = value
      },
      viewAnswers() {
        this.gameOver = false
        this.nextQ = 0
      },
    },
    watch: {
      nextQ() {
        if (this.nextQ >= this.allQuizzes[0].quiz.length - this.lr) {
          return this.nextQuestionButtonText = 'View Final Score'
        } else {
          return this.nextQuestionButtonText = '>'
        }
      }
    }
  }
</script>