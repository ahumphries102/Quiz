<template>
  <v-container fill-height class="justify-center">
    <v-card flat elevation="1" class="d-flex" :width="$isMobile()?'80%':'50%'">
      <v-row class="pa-5">
        <v-col :cols="$isMobile()?'12':'8'">
          <v-data-table
            disable-sort
            hide-default-footer
            item-key="id"
            v-if="!quizReady"
            v-model="selected"
            :headers="headers"
            :items="listOfAnswers"
          >
            <template v-slot:top>
              <v-toolbar flat class="pa-0 ma-0">
                <v-toolbar-title>
                  <p>Create a Quiz</p>
                </v-toolbar-title>
              </v-toolbar>
              <v-text-field label="Name Your Quiz" v-model="quizName" />
              <v-text-field label="Enter Question" v-model="question" />
            </template>
            <template #body="{items}">
              <tbody>
                <tr v-for="(item, ind) in items" :key="ind">
                  <td :class="$isMobile()?'pa-0 ma-0':''">
                    <v-row class="pa-0 ma-0">
                      <v-checkbox
                        :disabled="item.theAnswer"
                        class="checkBoxes"
                        @change="setChecked(item)"
                        v-model="item.theAnswer"
                      />
                      <v-text-field
                        :style="{overflow:'hidden'}"
                        append-icon="mdi-close"
                        label="Edit"
                        v-model="item.answer"
                        @input="addAnswerInput(item.id)"
                        @click:append="deleteAns(item.id, item.theAnswer)"
                      />
                    </v-row>
                  </td>
                </tr>
              </tbody>
            </template>
            <template v-slot:footer>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="addAnswer"
                  :disabled="answersFilledOut <= 1 || !checked || !question.length || !quizName.length "
                >Add Question</v-btn>
              </v-card-actions>
            </template>
          </v-data-table>
        </v-col>
        <v-divider v-show="!$isMobile()" vertical class="ml-5" />
        <v-col cols="auto" v-if="$isMobile()?false:true">
          <h3>Your Questions</h3>
          <v-list>
            <v-list-item class="pl-0" v-for="(test,ind) in allQuestionsAnswers" :key="ind">
              <p>
                {{ind + 1}} {{test.question}}
                <v-icon @click="deleteQuestion(test.question)">mdi-delete</v-icon>
              </p>
            </v-list-item>
          </v-list>
          <v-btn color="primary" @click="saveQuiz" :disabled="numberOfQuestions < 2">Save Quiz</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-menu transition="slide-x-transition" left :offset-x="true" v-if="$isMobile()?true:false">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="grey d-flex justify-center"
          v-bind="attrs"
          v-on="on"
          height="150px"
          width="25px"
        >
          <v-icon>mdi-menu-left</v-icon>
        </v-card>
      </template>
      <v-card>
        <v-card-text>
          <h3 class="text-center">Your Questions</h3>
          <v-list>
            <v-list-item class="pl-0" v-for="(test,ind) in allQuestionsAnswers" :key="ind">
              <p>
                {{ind + 1}}: {{test.question}}
                <v-icon @click="deleteQuestion(test.question)">mdi-delete</v-icon>
              </p>
            </v-list-item>
          </v-list>
          <v-btn color="primary" @click="saveQuiz" :disabled="numberOfQuestions < 2">Save Quiz</v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  name: "createquiz",
  data() {
    return {
      allQuestionsAnswers: [],
      answer: "",
      checked: false,
      headers: [
        {
          text: "Answers",
          value: "answer",
        },
      ],

      listOfAnswers: [
        {
          id: 0,
          answer: "",
          theAnswer: false,
          delete: this.addAnswerInput,
        },
        {
          id: 1,
          answer: "",
          theAnswer: false,
          delete: this.addAnswerInput,
        },
      ],
      newWayToQuiz: {
        answers: [],
        question: "",
      },
      named: false,
      numberOfQuestions: 0,
      question: "",
      questions: [],
      quizName: "",
      quizReady: false,
      reset: true,
      rules: {
        answer: [(v) => (v && v.length > 0) || "Answer cannot be empty"],
      },
      selected: [],
      singleSelect: true,
      valid: true,
    };
  },

  methods: {
    setChecked(rowData) {
      this.listOfAnswers.forEach((ele) => {
        if (rowData.id === ele.id) {
          ele.theAnswer = true;
        } else {
          ele.theAnswer = false;
        }
      });
      this.checked = true;
    },
    // deletes a question from the Your Questions list
    deleteQuestion(currentQuestion) {
      this.allQuestionsAnswers = this.allQuestionsAnswers.filter(
        (ele) => ele.question !== currentQuestion
      );
    },
    deleteAns(rowDataId, rowDataAnswer) {
      if (this.listOfAnswers.length > 2) {
        this.listOfAnswers = this.listOfAnswers.filter((ele) => {
          // if a user deletes an answer they checked as true we disable the add question button
          rowDataAnswer ? (this.checked = false) : null;
          return ele.id != rowDataId;
        });
      }
    },
    //checks user input if they're adding any text. only fires on last answer input field
    addAnswerInput(id) {
      const dataIds = this.listOfAnswers.map((ele) => ele.id);
      const maxValue = Math.max(...dataIds);
      if (maxValue === id) {
        this.listOfAnswers.push({
          id: Date.now(),
          answer: "",
          theAnswer: false,
          delete: this.addAnswerInput,
        });
      }
    },
    addAnswer() {
      //First we add the question the user inputs
      this.newWayToQuiz.question = this.question;

      //loop through all the answers the user input and only push the answers that contain content
      this.listOfAnswers.forEach((ele, ind) => {
        if (ele.answer.length > 0) {
          this.newWayToQuiz.answers.push(this.listOfAnswers[ind]);
        }
      });

      //allQuestionsAnswers is an array of arrays. Each array is a set of questions.
      this.allQuestionsAnswers.push(this.newWayToQuiz);

      //reset the quiz so we don't keep sending in old data or erasing it as we push it in to allQuestionsAnswers
      this.newWayToQuiz = {
        answers: [],
        question: "",
      };

      //check if there is a true answer
      this.checked = false;
      //check if a question has more than 1 answer
      this.numberOfQuestions++;
      //reset the question
      this.question = "";
      //reset the list of answers
      this.listOfAnswers = [
        {
          id: Date.now() + 1,
          answer: "",
          theAnswer: false,
          delete: this.addAnswerInput,
        },
        {
          id: Date.now() + 2,
          answer: "",
          theAnswer: false,
          delete: this.addAnswerInput,
        },
      ];
    },
    async saveQuiz() {
      const response = await this.$fetchData("POST", "/addquiz", {
        quizName: this.quizName,
        userName: this.$store.state.userName,
        quiz: this.allQuestionsAnswers,
        originalCreator: this.$store.state.userName,
        quizCompleted: false,
        quizLookedAt: false,
        whoIsSending: "",
      });
      this.$router.push({ name: "createquiz" }).catch((err) => err);
      if (response) {
        this.color = "green";
        this.responseMsg = response.msg;
      } else {
        this.color = "red";
        this.responseMsg = response.err;
      }
      this.submitted = false;
    },
  },
  computed: {
    // check how many answers users have filled out. We need at least 2 in order to let users move forward with adding a question.
    answersFilledOut() {
      let afo = 0;
      this.listOfAnswers.forEach((ele) => {
        if (ele.answer.length) afo += 1;
      });
      return afo;
    },
  },
};
</script>