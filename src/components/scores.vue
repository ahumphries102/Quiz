<template>
  <v-card>{{scores[0].points}}</v-card>
</template>

<script>
export default {
  name: "view score",
  data() {
    return {
      scores: null,
    };
  },
  mounted() {
    this.getScore();
  },
  methods: {
    async getScore() {
      let response = await this.$fetchData("GET", "/viewscore");
      this.scores = response;
    },
  },
};
</script>

<style>
</style>