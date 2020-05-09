<template>
  <div>
      <v-card>
        <v-card-title>
            <h3>Which Quiz Would You Like to View?</h3>
        </v-card-title>
        <v-card-text>
            <v-list v-for="(quiz, ind) in allQuizzes" :key="ind">
                <router-link :to="{ path:`/viewquiz/${ind}`, params:'id' }">Quiz {{ ind+1 }}</router-link>
            </v-list>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
    name:'viewquiz',
    data:()=>({
        allQuizzes:[],
        responseMsg:'',
    }),
    beforeMount(){
        this.viewQuiz()
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

            console.log(request)
        }
    }
}
</script>

<style>

</style>