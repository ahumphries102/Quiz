<template>
  <div>
      <v-card v-if="dataRetrieved">
          <v-card-title>
              <h3>User Quiz</h3>
          </v-card-title>
          <v-card-text v-if="dataRetrieved">
              <h4>Question {{test + 1}}: {{allQuizzes[routeId].quiz[test].question}}</h4>
              <v-list-item v-for="(element, ind) in allQuizzes[routeId].quiz[test].answers" :key="ind">
                  {{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{element.answer}}</v-list-item>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="test < 1" @click="test--"><</v-btn>
            <v-btn color="primary" :disabled="test >= allQuizzes[routeId].quiz.length - 1 " @click="test++">></v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
    name:'userquiz',
    data:()=>({
        adjustedQuizzes:[],
        allQuizzes:[],
        dataRetrieved: false,
        responseMsg:'',
        routeId: 0,
        changeQ: 0,
        test:0
    }),
    created(){
        this.viewQuiz()
        this.routeId = this.$route.params.id
    },
    methods:{
        async viewQuiz(){
           let request = await this.$root.fetchData('POST', "/viewquiz", 
              {
                  username:this.$store.state.username
              }
            )
            this.allQuizzes = request
            this.responseMsg = request
            this.dataRetrieved = true
        }
    }
}
</script>

<style>

</style>