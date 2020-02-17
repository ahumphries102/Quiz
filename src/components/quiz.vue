
<template>
  <div>
    <h1>Question: {{quizShow[0][0][0]}}</h1>
    <h6 v-for="(answer, ind) in quizShow[0]" :key="ind">{{answer[2].answer}}</h6>
  </div>
</template>
<script>
//import CreateQuiz from './CreateQuiz'
export default {
  name:'quiz',
  props:{
    quiz: Array
  },
  data(){
    return{
      quizShow:[{
        id:Date.now(),
        gameOver:'Game Over',
        totalScore:0
      }]
    }
  },
  mounted(){
    this.quizShow.unshift(this.quiz)
    console.log(this.quizShow)
  },
  methods:{
      nextQ(){
        this.whichQ++
      },
      handleClick(){
        console.log('yolo')
      },
      test(){
        console.log(this.$parent)
        this.testId = !this.testId
      },
    testComp(){

      return this.testId
    }
  },
  computed:{
  }
}
</script>
