<template>
<div>
  <v-card>{{scores}}</v-card>
</div>
</template>

<script>
export default {
  name: "viewScore",
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