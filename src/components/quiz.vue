<template>
  <div>
    <h1>Question {{nextQ + 1}}/{{quiz.length}}: {{questions[nextQ]}}</h1>
    <div v-for="(answer, ind) in quiz[nextQ]" :key="ind">
      <v-btn v-on:click="saveAnswer(quiz[nextQ][ind])">add</v-btn>{{answer.answer}}
    </div>
    <p>Your Current Answer: {{ currentAnswer.answer }}</p>
    <v-btn @click="nextQuestion">{{nextQuestionButtonText}}</v-btn>
    <v-btn @click="prevQuestion">Previous Question</v-btn>
    <p>Final Score: {{finalScore}}</p>
  </div>
</template>
<script>
  //import CreateQuiz from './CreateQuiz'
  export default {
    name: 'quiz',
    props: {
      quiz: Array,
      questions: Array
    },
    data() {
      return {
        finalScore:0,
        nextQuestionButtonText: 'Save Answer?',
        currentAnswer:'',
        nextQ: 0,
        tallyScore:[],
        quizShow: [{
          id: Date.now(),
          gameOver: 'Game Over',
          totalScore: 0
        }]
      }
    },
    mounted() {
    },
    methods: {
      nextQuestion() {
        this.nextQ++
        this.tallyScore.push(this.currentAnswer)
        if(this.quiz.length-1 === this.nextQ){
          this.nextQuestionButtonText = 'Finish Quiz?'
        }
        if(this.nextQ > this.quiz.length - 1){
          console.log(this.tallyScore)
          this.tallyScore.forEach( ele =>{
            if(ele.answered === true){
              console.log(ele)
              this.finalScore++
            }
          })
          this.nextQuestionButtonText = "game Over"
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
        console.log(value)
      },
    },
  }
</script>