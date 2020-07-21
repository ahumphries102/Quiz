<template>
  <v-card>
    <v-card-title>
      <p>Choose a Quiz to Take</p>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(quiz, ind) in allQuizzes" :key="ind">
          <router-link :to="{name:'whichquiz', params:{userName:$store.state.userName, id:ind}}">{{quiz.quizName}}</router-link>
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
      allQuizzes: [],
      dataRetrieved: false
    };
  },
  beforeMount() {
    this.viewQuiz();
  },
  methods: {
    async viewQuiz() {
      let request = await this.$root.fetchData("POST", "/viewquiz", {
        userName: this.$store.state.userName
      });
      this.allQuizzes = request;
    }
  }
};
</script>