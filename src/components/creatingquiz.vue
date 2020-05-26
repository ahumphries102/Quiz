<template>
  <v-container fill-height class="justify-center">
    <v-card flat>
    <v-data-table v-if="!quizReady" v-model="selected" disable-sort :headers="headers" :items="listOfAnswers"
      :single-select="singleSelect" item-key="id" show-select class="pa-10 elevation-1" v-on:item-selected="setAnswer">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quiz
          </v-toolbar-title>
        </v-toolbar>
        <v-text-field label="Enter Question" v-model="question" />
      </template>
      <template v-slot:item.answer="{ item }">
        <v-form v-model="valid">
          <v-text-field :rules="rules.answer" @input='addAnswerInput(item.id)' v-model="item.answer" label="Edit"
            single-line counter append-icon="mdi-close" @click:append="deleteAns(item.id)" />
        </v-form>
      </template>
      <template v-slot:footer>
        <div>
          <v-btn color="primary" @click="addAnswer" :disabled="!valid || !checked || question.length < 1">
            Add Answer | {{ numberOfQuestions }}</v-btn>
          <v-btn :class="isMobile()?'':'mx-5'" color="primary" :disabled=" numberOfQuestions < 2? true:false" @click="quizBegin">Submit Quiz</v-btn>
          <v-btn color="primary" @click="saveQuiz">Save Quiz</v-btn>
        </div>
      </template>
    </v-data-table>
    </v-card>
    <TakeQuiz v-if="quizReady" :allQuestionsAnswers='allQuestionsAnswers' />
  </v-container>
</template>

<script>
  import TakeQuiz from './takequiz/takequiz'
  import { isMobile } from '../mixins/mixins'
  export default {
    name: 'creatingquiz',
    components:{
      TakeQuiz
    },
    data() {
      return {

        answer: "",
        checked: false,
        allQuestionsAnswers: [],

        headers: [
          {
            text: 'Answers',
            value: 'answer',
          }
        ],

        listOfAnswers: [
          {
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
        newWayToQuiz:{
          answers:[],
          question:'',
        },

        numberOfQuestions: 0,
        
        question: '',
        questions: [],
        quizReady: false,
        
        reset: true,
        rules: {
          answer: [v => v.length > 0 || 'Answer cannot be empty']
        },
        selected: [],
        singleSelect: true,
          
        valid: true,
      }
    },
    mixins:[isMobile],
    methods: {
      setAnswer(value) {
        // sets the object returned from the row from false to whatever value passed in is. Value.value is the boolean from vuetify datatable
        if(value.value === true){
          value.item.answered = value.value
        }
        this.checked = true
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
        //First we add the question the user inputs
        this.newWayToQuiz.question = this.question


        //loop through all the answers the user input and only push the answers that contain content
        this.listOfAnswers.forEach((ele, ind) => {
          if (ele.answer.length > 0) {
            this.newWayToQuiz.answers.push(this.listOfAnswers[ind])
          }
        })


        //allQuestionsAnswers is an array of arrays. Each array is a set of questions.
        this.allQuestionsAnswers.push(this.newWayToQuiz)

        //reset the quiz so we don't keep sending in old data or erasing it as we push it in to allQuestionsAnswers
        this.newWayToQuiz = {
          answers:[],
          question:'',
        }

        //check if there is a true answer
        this.checked = false
        //check if a question has more than 1 answer
        this.numberOfQuestions++
        //reset the question
        this.question = ''
        //reset the list of answers 
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
      },
      async saveQuiz(){
        let request = await this.$root.fetchData('POST', '/addquiz',{ 
          username:this.$store.state.username, 
          quiz:this.allQuestionsAnswers
        })
        this.$router.push({name:'creatingquiz'}).catch(err=>err)
        if(request){
            this.color = 'green'
            this.responseMsg = request.msg
        }else{
            this.color = 'red'
            this.responseMsg = request.err
        }
        this.submitted = false
        console.log(request)
      }
    }
  }
</script>