<template>
    <v-card>
        <v-card-text>
            <p v-for="(info, ind) in scoreCard.selectedAnswerInfo" :key="ind">{{info}}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="$emit('close')">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "quizreview",
  props: {
    scoreCard: Object,
  },
  data: () => ({
    currentQuestion: 0,
    endOfQuizText: ">",
  }),
  // methods:{
  //     nextQuestion(){
  //         if(this.currentQuestion !== this.allQuizzes[this.wQ].quiz.length -1){
  //             this.currentQuestion++
  //         }
  //     },
  //     previousQuestion(){
  //         this.currentQuestion--
  //         if(this.currentQuestion !== this.allQuizzes[this.wQ].quiz.length - 1){
  //             this.endOfQuizText = '>'
  //         }
  //     }
  // }
};
</script>