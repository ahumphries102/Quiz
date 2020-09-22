<template>
    <v-card class="mx-auto">
      <v-card-title>
        {{scoreCard}}
      </v-card-title>
      <v-card-text >
          <p v-for="(quiz) in this.scoreCard.wholeQuiz[0]" :key="quiz.answer">
            {{quiz.answer}}
            <br>
            {{quiz.theAnswer}}
          </p>
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