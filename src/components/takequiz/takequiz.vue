<template>
  <v-card >
    <v-card-title v-if="dataRetrieved">
      <p>Choose a Quiz to Take</p>
    </v-card-title>
    <v-card-text>
      <v-list >
        <v-btn text @click="changeFilter">{{aThroughZ?'A-Z':'Z-A'}}</v-btn>
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
      aThroughZ:true,
      allQuizzes: [],
      dataRetrieved: false,
    };
  },
  mounted() {
    this.viewQuiz();
  },
  methods: {
    changeFilter(){
      this.aThroughZ = !this.aThroughZ
      this.aThroughZ?this.allQuizzes.sort((a,b) => (a.quizName > b.quizName)? 1 : -1):this.allQuizzes.sort((a,b) => (a.quizName < b.quizName)? 1 : -1)
    },
    async viewQuiz() {
      let response = await this.$fetchData("GET", "/allquizzes");
      this.allQuizzes = response.sort((a,b) => (a.quizName > b.quizName)? 1 : -1)
      this.dataRetrieved = true
    }
  }
};
</script>