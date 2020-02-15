<template>
<v-card>
  <v-card-title>Quiz</v-card-title>
  <v-text-field label="Enter Question" />
  <v-data-table v-model="selected" :headers="headers" :items="data" :single-select="singleSelect" item-key="id" show-select class="elevation-1" v-on:item-selected="cat">
    <template v-slot:item.name="{ item }">
      <v-edit-dialog :return-value.sync="item.name">
        <v-text-field readonly :label="item.name"/>
        <template v-slot:input>
          <v-text-field @input='addAnswer(item.id)' v-model="item.name" label="Edit" single-line counter></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.edit="{ item }">
      <v-icon @click="deleteAns(item.id)">mdi-delete</v-icon>
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
          selected:[],
          singleSelect: true,
          name: "",
          headers: [
            {
              text: 'Answers',
              value: 'name',
            },
            {
              text: 'Remove',
              value: 'edit'
            },
          ],
          data: [{}, {}]
        }
    },
    mounted(){
      this.data = []
      for(let i = 0; i < 2; i++){
        this.data.push({ id:i, name:'', edit: '', delete:this.addAnswer})
      }
    },
    methods:{
        getRowData(value){
          console.log(this.name)
        },
        cat(value){
          console.log(value)
          return value
        },
        deleteAns(value){
          if(this.data.length > 2)this.data = this.data.filter(ele => ele.id != value)
        },
        addAnswer(id){
          let dataIds = this.data.map( ele => ele.id)
          let maxValue = Math.max(...dataIds)
            if(maxValue === id){
              this.data.push( {
                id: Date.now(),
                name: '',
                edit: '',
                delete: this.addAnswer
              } )
            }
        } 
    }
}
</script>