<template>
    <div>
        <v-card>
            <v-card-title class="d-flex flex-column align-start">
                <p>Question {{quiz.length - quiz.length + currentQuestion + 1}}</p>
                <p>{{questions[currentQuestion]}}</p>
            </v-card-title>
            <v-card-text>
                {{quiz}}
                <p :style="{color:answer.answered===true?'green':'', padding:'1%'}" v-for="(answer, ind) in quiz[currentQuestion]" :key="ind">{{answer.answer}} {{answer.answered === true?'Correct':''}}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="currentQuestion--" :disabled="currentQuestion < 1">Previous Question
                </v-btn>
                <v-btn :disabled="finalQuestionReached" color="primary" @click="currentQuestion++">Next Question</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'finalscore',
    props:{
        quiz:Array,
        questions:Array
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