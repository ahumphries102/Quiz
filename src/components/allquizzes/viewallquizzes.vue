<template>
  <div>
    <v-card>
      <v-card-title>
          <p>All Quizzes</p>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(quiz, ind) in allQuizzes" :key="ind">
              <router-link :to="{path:`/viewallquizzes/${ind}`, params:'id'}">Quiz {{ind + 1}}</router-link>
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
      let request = await this.$root.fetchData("GET", "/allquizzes")
      this.allQuizzes = request
    }
  }
};
</script>