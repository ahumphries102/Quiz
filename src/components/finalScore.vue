<template>
    <div>
        <v-card>
            <v-card-title class="d-flex flex-column align-start">
                <p>Question {{quiz.length - quiz.length + currentQuestion + 1}}</p>
                <p>{{questions[currentQuestion]}}</p>
            </v-card-title>
            <v-divider/>
            <v-card-text>
            
                <h3 class="my-5" v-for="(answer, ind) in quiz[currentQuestion]" :key="ind" :style="{color:answer.answered?'green':'red'}">
                    {{answer.answer}}
                </h3>
                <p>
                    Your answer was <b>{{tallyScore[currentQuestion].answered===true?tallyScore[currentQuestion].answer:tallyScore[currentQuestion].answer}}</b>
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="currentQuestion--" :disabled="currentQuestion < 1">Previous Question
                </v-btn>
                <v-btn v-show="!finalQuestionReached" color="primary" @click="currentQuestion++">Next Question</v-btn>
                <v-btn color="primary" v-show="finalQuestionReached" @click="$emit('close')">Return to Score Screen</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'finalscore',
    props:{
        quiz:Array,
        questions:Array,
        tallyScore:Array
    },
    data:()=>({
        currentQuestion: 0,
        finalQuestionReached: false
    }),
    watch:{
        currentQuestion(){
            if(this.currentQuestion < 1){
                this.currentQuestion = 0
            }

            if(this.currentQuestion >= this.quiz.length - 1){
                this.finalQuestionReached = true
            }else{
                this.finalQuestionReached = false
            }
        }
    }
}
</script>