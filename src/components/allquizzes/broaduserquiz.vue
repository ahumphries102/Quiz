<template>
    <v-card v-if="dataFetched">
      <v-card-title><p>Title</p></v-card-title>
      <v-card-text>
        <h4>Question {{nextQuestion + 1}}/{{allQuizzes[routeId].quiz.length}}: {{allQuizzes[routeId].quiz[nextQuestion].question}}</h4>
        <v-list>
          <v-list-item
            v-for="(element, ind) in allQuizzes[routeId].quiz[nextQuestion].answers"
            :key="ind"
          >{{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{element.answer}}</v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "broaduserquiz",
  data() {
    return {
      allQuizzes: [],
      dataFetched:false,
      nextQuestion: 0,
      routeId: 0
    };
  },
  mounted() {
    this.getAllQuizzes();
    this.routeId = this.$route.params.id;
  },
  methods: {
    async getAllQuizzes() {

      const response = await this.$fetchData("GET", "/allquizzes");
      console.log(response)
      this.allQuizzes = response.response;
      this.dataFetched = true
    }
  }
};
</script>