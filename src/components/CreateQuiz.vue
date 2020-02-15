<template>
  <v-form v-model="valid">
      <v-container>
          <v-row justify="center">
              <v-col cols="6">
                  <v-card>
                      <v-card-title>Create Your Quiz</v-card-title>
                      <v-card-subtitle>Question {{ currentQuestion }}</v-card-subtitle>
                      <v-card-text>
                          <v-text-field label="Enter Question" v-model="question" />
                          <v-row justify="space-between">
                          <v-col cols="1">
                              <v-checkbox :disabled="isAnswer[ind].disabled" @change="saveAns(ind)" v-for="(ele,ind) in isAnswer" :key="ind"/>
                          </v-col>
                          <v-col cols=10>
                          <v-text-field label="Enter an Answer" v-for="(ele,id) in isAnswer" :key="id"
                              v-model="isAnswer[id].text" @input="addAnswer(id)"
                              :append-icon="isAnswer[id].text != '' ? 'mdi-close':'' " @click:append="removeAnswer(id)" />
                          </v-col>
                          </v-row>
                            <v-card-actions>
                          <v-btn color="primary" @click="saveAnswers" :disabled="!readyToAdd">Save Answers</v-btn>
                          <v-btn color="primary" @click='addToQuiz' :disabled="!readyToAdd">Add to Quiz</v-btn>
                            </v-card-actions>
                          {{answers}}
                          <p v-for="(ele,id) in quizShow" :key="ele.id">Quiz Show: {{quizShow}}</p>
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
      </v-container>
  </v-form>
</template>
<script>
export default {
    name: 'CreateQuiz',
        props: {
            quizShow: Array
        },
        data() {
            return {
                lengthChecker: 3,
                disableCheckBox:false,
                currentQuestion:1,
                readyToAdd: false,
                question: '',
                answers: [],
                isAnswer: [{
                    text: '',
                    correctAns: false,
                    disabled: true
                }, {
                    text: '',
                    correctAns: false,
                    disabled: true
                }],
                valid: false,
                firstname: '',
                lastname: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 10 || 'Name must be less than 10 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        methods: {
            addAnswer(id) {
                // If the disableCheckbox is false, we no longer unlock checkboxes when a word has 3 or more characters. It is enabled in the saveAns function.
                if(this.disableCheckBox === false){
                    // Checks on input if the length of the text is this.lengthChecker or more. If it is then we can reenable the checkbox.
                    if(this.isAnswer[id].text.length >= this.lengthChecker){
                        this.isAnswer[id].disabled = false
                    }else{
                        this.isAnswer[id].disabled = true
                    }
                }
                if (id === this.isAnswer.length - 1) {
                    this.isAnswer.push({
                        text: '',
                        correctAns: false,
                        disabled: true
                    })
                }
            },
            removeAnswer(id) {
                // removes an answer from the list
                this.isAnswer = this.isAnswer.filter((ele, ind) => id != ind)
            },
            saveAns(ind) {
                // Switch the current prepended icon to checked and change the correctAns value to true for the specific icon. 
                if (this.isAnswer[ind].text.length >= this.lengthChecker) {
                    this.isAnswer[ind].correctAns = !this.isAnswer[ind].correctAns

                    // Once an answer has been selected we can no longer unlock checkboxes by typing.
                    this.disableCheckBox = true
                    // Then check and see if the one you clicked has been correctAns. If it has then loop through the array and find each correctAns value and if it is false disable that icon.
                    if (this.isAnswer[ind].correctAns === true) {
                        this.isAnswer.forEach(ele => {
                            if (ele.correctAns != true) {
                                ele.disabled = true
                            }
                        })
                    } else{
                        // However; if the icon you clicked has a correctAns value of false, loop through the array and enable all the buttons.
                        
                        // Re-enable the checkbox ability to be  clicked.
                        this.disableCheckBox = false
                        this.isAnswer.forEach((ele, ind) => {
                            if (ele.correctAns != true && ele.text.length >= this.lengthChecker) {
                                ele.disabled = false
                            }
                        })
                    }
                }
            },
            addToQuiz() {
                this.quizShow.unshift({
                    id: Date.now(),
                    qObjQ: this.question,
                    qObjAs: this.answers
                })
                //** reset input
                this.question = ''
                this.answer = ''
            },
            saveAnswers() {
                this.currentQuestion++
                this.isAnswer.forEach((ele, id) => {
                    // only save answers that have an answer
                    if (ele.text != "") {
                        // we push in an array of objects with an answer and if it's the correct answer
                        this.answers.push({
                            answer: ele.text,
                            correctAns: ele.correctAns
                        })
                    }
                })
                this.answer = ''
                this.isAnswer.forEach(ele=>{
                    ele.text = ""
                    ele.disabled = false
                    ele.correctAns = false
                })
                this.readyToAdd = false
                console.log(this.resetIsAnaswerDefault)
            }
        },
        computed: {
            computedAnswers() {
                let goat = this.isAnswer.map(ele => ele.text)
                return this.isAnswer
            }
        },
        watch: {
            isAnswer: {
                deep: true,
                handler(val) {
                    let quizChecker = 0
                    val.forEach((ele, ind) => {
                        if (ele.text.length >= this.lengthChecker) {
                            quizChecker++
                        }
                        if (ele.correctAns === true) {
                            quizChecker++
                        }
                        if (quizChecker >= this.lengthChecker) {
                            this.readyToAdd = true
                        } else {
                            this.readyToAdd = false
                        }

                        if(ele.text.length < this.lengthChecker && ele.correctAns === true){
                            val.correctAns = false
                        }
                    })
                    console.log(quizChecker)
                },
                
            }
        }
    }
</script>