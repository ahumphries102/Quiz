<template>
  <div>
      <v-card class="text-center">
        <v-card-title class="headline justify-center">Final Score</v-card-title>
        <v-divider />
        <v-card-text>
            <h2>Congratulations You Answered</h2>
            <h2>{{finalScore}} out {{quiz.length}} Questions Correctly!</h2>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" class="mx-auto" @click="$emit('viewAnswers')">View Answers</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
    name:'EndGame',
    props:{
        finalScore: Number,
        quiz:Array
    }
}
</script>

<style>

</style>