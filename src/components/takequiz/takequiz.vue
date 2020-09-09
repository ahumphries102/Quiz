<template>
  <v-card >
    <v-card-title v-if="dataRetrieved">
      <p>Choose a Quiz to Take</p>
    </v-card-title>
    <v-card-text>
      <v-list >
        <v-list-item  v-for="(quiz, ind) in allQuizzes" :key="ind">
          <router-link  v-if="dataRetrieved" :to="{name:'whichquiz', params:{userUrlName:$store.state.userName, quizName:quiz.quizName}}">{{quiz.quizName}}</router-link>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "takequiz",
  data() {
    return {
      test:0,
      allQuizzes: [],
      dataRetrieved: false,
    };
  },
  mounted() {
    this.viewQuiz();
  },
  methods: {
    async viewQuiz() {
      let request = await this.$fetchData("POST", "/viewquiz", {
        userName: this.$store.state.userName
      });
      this.allQuizzes = request;
      this.dataRetrieved = true
    }
  }
};
</script>