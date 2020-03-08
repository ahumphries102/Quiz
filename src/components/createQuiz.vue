<template>
  <v-container fill-height class="justify-center">
    <v-data-table v-if="!quizReady" v-model="selected" :headers="headers" :items="listOfAnswers" :single-select="singleSelect"
      item-key="id" show-select class="pa-10 elevation-1" v-on:item-selected="setAnswer">
      <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Quiz
            </v-toolbar-title>
          </v-toolbar>
            <v-text-field label="Enter Question" v-model="question"/>
            {{finalData}}
      </template>
      <template v-slot:item.answer="{ item }">
        <v-form v-model="valid">
          <v-text-field :rules="rules.answer" @input='addAnswerInput(item.id)' v-model="item.answer" label="Edit"
            single-line counter append-icon="mdi-close" @click:append="deleteAns(item.id)" />
        </v-form>
      </template>
      <template v-slot:footer>
        <v-btn color="primary" @click="addAnswer" :disabled="!valid || !checked || question.length < 1">Add Answer</v-btn>
        Quiz Size: {{ numberOfQuestions }}
        <v-spacer />
        <v-btn :disabled=" numberOfQuestions < 1? true:false" @click="quizBegin">Submit Quiz</v-btn>
      </template>
    </v-data-table>
    <Quiz v-if='quizReady' :quiz="finalData" :questions="questions"/>
  </v-container>
</template>
<script>
  import Quiz from './quiz'
  export default {
    name: 'createQuiz',
    components: {
      Quiz,
    },
    data() {
      return {
        numberOfQuestions: 0,
        quizReady: false,
        rules: {
          answer: [v => v.length > 0 || 'Answer cannot be empty']
        },
        errorMessage: false,
        checked: true,
        valid: true,
        reset: true,
        selected: [],
        singleSelect: true,
        answer: "",
        headers: [{
          text: 'Answers',
          value: 'answer',
        }, ],
        question: '',
        listOfAnswers: [{
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
          }
        ],
        questions: [],
        totalData: [],
        finalData: [],
        testHolder:[],
        valueHolder: ''
      }
    },
    mounted() {},
    methods: {
      setAnswer(value) {
        // sets the object returned from the row from false to whatever value passed in is. Value.value is the boolean from vuetify datatable
        if(value.value === true){
          value.item.answered = value.value
        }
        // used to disable and enable add answer button
        this.checked = value.value
      },
      deleteAns(value) {
        if (this.listOfAnswers.length > 2) this.listOfAnswers = this.listOfAnswers.filter(ele => ele.id != value)
      },
      //checks user input if they're adding any text. only fires on last answer input field
      addAnswerInput(id) {
        let dataIds = this.listOfAnswers.map(ele => ele.id)
        let maxValue = Math.max(...dataIds)
        if (maxValue === id) {
          this.listOfAnswers.push({
            id: Date.now(),
            answer: '',
            answered: false,
            delete: this.addAnswerInput
          })
        }
      },
      addAnswer() {
        this.questions.push(this.question)
        this.listOfAnswers.forEach((ele, ind) => {
          if (ele.answer.length > 0) {
            this.totalData.push(this.listOfAnswers[ind])
          }
        })
        //this.totalData.foEach(ele => console.log(ele.answer, ele.answered, 'totalData'))
        this.finalData.push(this.totalData)
        this.numberOfQuestions++
        this.question = ''
        this.totalData = []
        this.listOfAnswers = [{
            id: Date.now() + 1,
            answer: '',
            answered: false,
            delete: this.addAnswerInput
          },
          {
            id: Date.now() + 2,
            answer: '',
            answered: false,
            delete: this.addAnswerInput
          }
        ]
      },
      quizBegin() {
        this.quizReady = true
      }
    }
  }
</script>