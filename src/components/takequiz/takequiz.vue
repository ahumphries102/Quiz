<template>
  <v-card>
    <v-card-title>
      <h3>Choose a Quiz to Take</h3>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(quiz, ind) in allQuizzes" :key="ind">
          <router-link :to="{path:`/takequiz/${ind}`, params:'id'}">Quiz {{ ind+1 }}</router-link>
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
        username: this.$store.state.username
      });
      this.allQuizzes = request;
    }
  }
};
</script>