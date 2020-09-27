<template>
  <v-card class="mx-auto">
    <v-card-title>Review</v-card-title>
    <v-card-text>
      <h3>Question {{quizObj.quiz[wQu].question}}</h3>
      <p
        :style="{color:answer.theAnswer?'green':'red'}"
        v-for="(answer, ind) in quizObj.quiz[wQu].answers"
        :key="ind"
      >
        {{String.fromCharCode('A'.charCodeAt(0)+ind)}}:
        {{answer.theAnswer?`The correct answer is ${String.fromCharCode('A'.charCodeAt(0)+ind)}, `+answer.answer: answer.answer}}
        <br />
        {{answer.userAnswer?`You selected ${String.fromCharCode('A'.charCodeAt(0)+ind)}, ${answer.answer}`:''}}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="wQu < 1" color="primary" @click="wQu -= 1">Prev</v-btn>
      <v-btn :disabled="wQu + 1 === quizObj.quiz.length" color="primary" @click="wQu += 1">Next</v-btn>
      <v-btn color="primary" @click="$emit('close')">Return</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "quizreview",
  props: {
    quizObj: Object,
  },
  data() {
    return {
      currentAnswer: "",
      dataFetched: false,
      gameOver: false,
      // used when to check the quizObj length -1. It's a 'magic number'
      lr: 1,
      nextQuestionButtonText: ">",
      userChoicesMade: [],
      valid: true,
      // wQ stands for which quiz
      wQ: 1,
      // wQu stand for which question
      wQu: 0,
    };
  },
  mounted() {
    console.log(JSON.stringify(this.quizObj, undefined, 2));
  },
  methods: {},
};
</script>