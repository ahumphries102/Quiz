<template>
  <div>
    <v-data-table v-if="!quizReady" v-model="selected" :headers="headers" :items="data" :single-select="singleSelect" item-key="id"
      show-select class="elevation-1" v-on:item-selected="setAnswer">
      <template v-slot:top>
        <v-form v-model="valid">
        <v-card>
          <v-card-title>Quiz
          </v-card-title>
            
          <v-text-field label="Enter Question" v-model="question"/>
        </v-card>
        </v-form>
      </template>
      <template v-slot:item.answer="{ item }">
        <v-form v-model="valid">
          <v-text-field :rules="rules.answer" @input='addAnswerInput(item.id)' v-model="item.answer" label="Edit" single-line counter
            append-icon="mdi-close" @click:append="deleteAns(item.id)" />
        </v-form>
      </template>
      <template v-slot:footer>
        <v-btn color="primary" @click="addAnswer" :disabled="!valid || checked">Add Answer</v-btn>
        <v-btn @click="quizBegin">Submit Quiz</v-btn>
      </template>
    </v-data-table>
    <Quiz v-if='quizReady' :quiz="totalData"/>
    </div>
</template>
<script>
import Quiz from './quiz'
  export default {
    name: 'createQuiz',
    components:{
      Quiz
    },
    data() {
      return {
        quizReady:false,
        rules:{
          question: [ v=> v.length > 0 || 'Question cannot be empty'],
          answer:[ v=> v.length > 0 || 'Answer cannot be empty']
        },
        checked: true,
        valid:true,
        reset: true,
        selected: [],
        singleSelect: true,
        answer: "",
        headers: [{
            text: 'Answers',
            value: 'answer',
          },
        ],
        question:'',
        data: [{
          id: 0,
          answer: '',
          answered: false,
          delete: this.addAnswerInput
        },
        {
          id: 1,
          answer: '',
          answered: false,
          delete: this.addAnswerInput
        }],
        totalData: []
      }
    },
    mounted() {
    },
    methods: {
      setAnswer(value) {
        value.item.answered = value.value
        this.checked = !this.checked
      },
      deleteAns(value) {
        if (this.data.length > 2) this.data = this.data.filter(ele => ele.id != value)
      },
      addAnswerInput(id) {
        let dataIds = this.data.map(ele => ele.id)
        let maxValue = Math.max(...dataIds)
        if (maxValue === id) {
          this.data.push({
            id: Date.now(),
            answer: '',
            answered: false,
            delete: this.addAnswerInput
          })
        }
      },
      addAnswer(){
        this.totalData.push(this.question)
        this.data.forEach((ele,ind)=>{
          if(ele.answer.length > 0){
              this.totalData.push(this.data[ind])
            }
        })
        console.log(this.totalData)
      },
      quizBegin(){
        this.quizReady = true
      }
    }
  }
</script>