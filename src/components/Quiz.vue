
<template>
  <v-content>
    <!-- <CreateQuiz v-show="!ready" :quizShow="quizShow" :testComp="testComp" :test="test" ref="quiz"/> -->
    <Datatable />
  </v-content>
</template>
<script>
//import CreateQuiz from './CreateQuiz'
import Datatable from './datatable'
export default {
  name:'Quiz',
  components:{
    //CreateQuiz,
    Datatable
  },
  data(){
    return{
      testId:false,
      ready:false,
      msg:'Game Time',
      whichQ:0,
      quizShow:[{
        id:Date.now(),
        gameOver:'Game Over',
        totalScore:0
      }]
    }
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
