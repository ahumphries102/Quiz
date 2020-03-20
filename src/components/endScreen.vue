<template>
  <div>
      <v-card class="text-center" v-if="!answersViewing">
        <v-card-title class="justify-center"><h2>Final Score</h2></v-card-title>
        <v-divider />
        <v-card-text>
            <h2>Congratulations You Answered</h2>
            <h2>{{finalScore}} out {{quiz.length}} Questions Correctly!</h2>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" class="mx-auto" @click="answersViewing = true">View Answers</v-btn>
        </v-card-actions>
      </v-card>
      <FinalScore v-if="answersViewing" :quiz="quiz" :questions="questions" :tallyScore='tallyScore'/>
  </div>
</template>

<script>
import FinalScore from './finalScore'
export default {
    name:'EndGame',
    components:{FinalScore},
    props:{
        finalScore: Number,
        quiz:Array,
        questions:Array,
        tallyScore: Array
    },
    mounted(){
        console.log(this.tallyScore)
    },
    data:()=>({
        answersViewing: false
    })
}
</script>

<style>

</style>