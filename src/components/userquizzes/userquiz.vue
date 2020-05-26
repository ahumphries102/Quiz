<template>
  <div>
      <v-card v-if="dataRetrieved">
          <v-card-title>
              <h3>User Quiz</h3>
          </v-card-title>
          <v-card-text v-if="dataRetrieved">
              <h4>Question {{nextQuestion + 1}}/{{allQuizzes[routeId].quiz.length}}: {{allQuizzes[routeId].quiz[nextQuestion].question}}</h4>
              <v-list-item v-for="(element, ind) in allQuizzes[routeId].quiz[nextQuestion].answers" :key="ind" :style="{color:element.answered?'green !important':'red !important'}">
                {{String.fromCharCode('A'.charCodeAt(0)+ind)}}: {{element.answer}}
              </v-list-item>
          </v-card-text>
          <v-card-actions>
              <v-btn v-show="nextQuestion <= 0" color="primary" :to="{name:'viewquiz'}">View Quizzes</v-btn>
              <v-btn v-show="nextQuestion > 0" color="primary" :disabled="nextQuestion < 1" @click="nextQuestion--">
                  <</v-btn> <v-btn color="primary" :disabled="nextQuestion >= allQuizzes[routeId].quiz.length - 1 "
                      @click="nextQuestion++">>
              </v-btn>
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
        nextQuestion:0
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