<template>
    <v-card class="mx-auto">
      <v-card-title>
        {{scoreCard}}
      </v-card-title>
      <v-card-text >
        <p>{{scoreCard.questions[0]}}?</p>
        <p>You answered, <strong>{{scoreCard.selectedAnswerInfo[0].answer}}</strong>, which was {{scoreCard.selectedAnswerInfo[0].answered?'correct':'incorrect'}}</p>
        <p>The correct answer is, <strong>{{scoreCard.selectedAnswerInfo[1].answer}}</strong></p>
      </v-card-text>
      <v-card-actions>
        
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "quizreview",
  props:{
      scoreCard:Object
  },
  data() {
    return {
      
        currentAnswer: "",
        dataFetched: false,
        gameOver: false,
        // used when to check the quizObj length -1. It's a 'magic number'
        lr: 1,
        nextQuestionButtonText: ">",
        quizObj: [],
        userChoicesMade: [],
        valid: true,
        // wQ stands for which quiz
        wQ: 1,
        // wQu stand for which question
        wQu: 0,
    };
  },
  methods: {
  }
};
</script>