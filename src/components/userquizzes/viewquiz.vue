<template>
  <v-card>
    <v-card-title>
      <p>Which Quiz Would You Like to View?</p>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(quiz, ind) in allQuizzes" :key="ind">
          <router-link :to="{ name:'userquiz', params:{id:ind}}">{{ind + 1}}: {{quiz.quizName}}</router-link>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "viewquiz",
  data: () => ({
    allQuizzes: [],
    responseMsg: ""
  }),
  beforeMount() {
    this.viewQuiz();
  },
  methods: {
    async viewQuiz() {
      let response = await this.$fetchData("POST", "/viewquiz", {
        userName: this.$store.state.userName
      });
      console.log(response)
      this.allQuizzes = response;
      this.responseMsg = response;
    }
  }
};
</script>

<style>
</style>