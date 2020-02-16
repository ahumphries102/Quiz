<template>
  <v-card>
    <v-data-table v-model="selected" :headers="headers" :items="data" :single-select="singleSelect" item-key="id"
      show-select class="elevation-1" v-on:item-selected="setAnswer">
      <template v-slot:top>
        <v-card>
          <v-card-title>Quiz
          </v-card-title>
            
          <v-text-field label="Enter Question" />
        </v-card>
      </template>
      <template v-slot:item.name="{ item }">
        
          <v-text-field @input='addAnswerInput(item.id)' v-model="item.name" label="Edit" single-line counter
            append-icon="mdi-close" @click:append="deleteAns(item.id)" />
        
      </template>
      <template v-slot:footer>
        <v-btn color="primary" @click="addAnswer">Add Answer</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'CreateQuiz',
    data() {
      return {
        reset: true,
        selected: [],
        singleSelect: true,
        name: "",
        headers: [{
            text: 'Answers',
            value: 'name',
          },
        ],
        data: [{}, {}],
        totalData: []
      }
    },
    mounted() {
      this.data = []
      for (let i = 0; i < 2; i++) {
        this.data.push({
          id: i,
          name: '',
          answered: false,
          delete: this.addAnswerInput
        })
      }
    },
    methods: {
      setAnswer(value) {
        value.item.answered = value.value
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
            name: '',
            answered: false,
            delete: this.addAnswerInput
          })
        }
      },
      addAnswer(){
        this.totalData.push(this.data)
        console.log(this.totalData)
      }
    }
  }
</script>