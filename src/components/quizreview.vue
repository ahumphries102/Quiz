<template>
    <div>
        <v-card>
            
        </v-card>
    </div>
</template>

<script>
export default {
    name:'quizreview',
    props:{
        allQuizzes:Array,
        questions:Array,
        tallyScore:Array,
        wQ:Number
    },
    data:()=>({
        currentQuestion: 0,
        endOfQuizText:'>',
    }),
    methods:{
        nextQuestion(){
            if(this.currentQuestion !== this.allQuizzes[this.wQ].quiz.length -1){
                this.currentQuestion++
            }
        },
        previousQuestion(){
            this.currentQuestion--
            if(this.currentQuestion !== this.allQuizzes[this.wQ].quiz.length - 1){
                this.endOfQuizText = '>'
            }
        }
    }
}
</script>