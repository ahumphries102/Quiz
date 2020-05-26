<template>
    <div>
        <v-card>
            <v-card-title class="d-flex flex-column align-start">
                <p>Question {{currentQuestion + 1}}/{{allQuizzes[wQ].quiz.length}}<br>{{allQuizzes[wQ].quiz[currentQuestion].question}}</p>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <h3 class="my-5" v-for="(answer, ind) in allQuizzes[wQ].quiz[currentQuestion].answers" :key="ind" :style="{color:answer.answered?'green':'red'}">
                    {{answer.answer}}
                </h3>
                <p>
                    Your answer was<b>{{tallyScore[currentQuestion].answered?tallyScore[currentQuestion].answer:tallyScore[currentQuestion].answer}}</b>
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn v-show="currentQuestion <= 0" color="primary" @click="$emit('close')">Go Back</v-btn>
                <v-btn color="primary" @click="previousQuestion" v-show="currentQuestion > 0"><
                </v-btn>
                <v-btn color="primary" v-show="!finalQuestionReached" @click="nextQuestion" :disabled="currentQuestion === allQuizzes[wQ].quiz.length-1">{{endOfQuizText}}</v-btn>
            </v-card-actions>
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
        finalQuestionReached: false,
    }),
    methods:{
        nextQuestion(){
            if(this.currentQuestion !== this.allQuizzes[this.wQ].quiz.length -1){
                this.currentQuestion++
            }
//:this.endOfQuizText = 'Return to Previous Screen'
            // if(this.endOfQuizText === 'Return to Previous Screen'){
            //     this.$emit('close')
            // }
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