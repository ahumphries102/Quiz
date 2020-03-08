<template>
  <v-container fill-height>
    <v-form v-model="valid" class="mx-auto">
    <v-card class="mx-auto" v-show="!gameOver">
      <v-card-title class="headline">Question {{nextQ + 1}}/{{quiz.length}}<br>{{questions[nextQ]}}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-radio-group>
          <v-radio :rules="[v => v != 5 || 'select answer']" v-for="(answer, ind) in quiz[nextQ]" :key="ind" :label="answer.answer"
            v-on:change="saveAnswer(quiz[nextQ][ind])" />
        </v-radio-group>

        <p>Your Current Answer Is: {{ currentAnswer.answer }}</p>
      </v-card-text>
      <v-card-actions>

        <v-btn color="primary" @click="prevQuestion" :disabled="nextQ === 0">Previous Question</v-btn>
        <v-btn color="primary" @click="nextQuestion" :disabled="nextQ + 1 > quiz.length || !valid">{{nextQuestionButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
    <v-dialog v-model="gameOver" width="50%">
      <EndScreen :quiz="quiz" :finalScore="finalScore" @viewAnswers="viewAnswers"/>
    </v-dialog>
  </v-container>
</template>
<script>
  //import CreateQuiz from './CreateQuiz'
  import EndScreen from './endScreen'
  export default {
    name: 'quiz',
    props: {
      quiz: Array,
      questions: Array
    },
    components:{
      EndScreen
    },
    data() {
      return {
        valid: true,
        gameOver: false,
        finalScore:0,
        nextQuestionButtonText: 'Next Question',
        currentAnswer:'',
        nextQ: 0,
        tallyScore:[]
      }
    },
    mounted() {
      console.log(this.quiz)
    },
    filters:{
      alwaysCap(){
        return this.questions[0].toUpperCase()
      }
    },
    methods: {
      viewAnswers(){
        this.gameOver = false
        this.nextQ = 0
      },
      nextQuestion() {
        this.nextQ++
        this.tallyScore.push(this.currentAnswer)
        if(this.nextQ > this.quiz.length - 1){
          this.tallyScore.forEach( ele =>{
            console.log(ele, 'answers')
            if(ele.answered === true){
              this.finalScore++
            }
          })
        }
      },
      prevQuestion() {
        this.nextQ--
        if(this.quiz.length-1 != this.nextQ){
          this.nextQuestionButtonText = 'Save Answer?'
        }
      },
      saveAnswer(value) {
        this.currentAnswer = value
        console.log(value, 'value')
      },
    },
    watch:{
      nextQ(){
         if(this.nextQ + 1 === this.quiz.length){
          return this.nextQuestionButtonText = 'View Final Score'
         }
         else if(this.nextQ+1 > this.quiz.length){
          this.gameOver = true
         }else{
          return this.nextQuestionButtonText = 'Next Question'
         }
      }
    }
  }
</script>