<template>
  <div>
    <v-card>
      <v-card-title>
          <p>All Quizzes</p>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(quiz, ind) in allQuizzes" :key="ind">
              <router-link :to="{name:'broaduserquiz', params:{userName:$store.state.userName, id:ind}}">{{quiz.quizName}}</router-link>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "viewallquizzes",
  data() {
    return {
      allQuizzes: []
    };
  },
  mounted() {
    this.getAllQuizzes();
  },
  methods: {
    async getAllQuizzes() {
      const response = await this.$fetchData("GET", "/allquizzes")
      this.allQuizzes = response.requestData
    }
  }
};
</script>