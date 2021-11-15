<template>
  <v-container>
    <v-card>
      <v-card-title>
        <router-link text color="primary" :to="{name:'mainMail'}"><v-icon>mdi-arrow-left</v-icon></router-link>
        <v-list>
          <v-list-item><v-icon @click="deleteLetter">mdi-delete</v-icon></v-list-item>
        </v-list>
      </v-card-title>
      <v-card-text>
        <p><strong>User Name:</strong> {{mailInfo.userName}}</p>
        <p><strong>Test Taken:</strong> {{mailInfo.month}}, {{mailInfo.date}}, {{mailInfo.year}}</p>
        <p><strong>Score:</strong> {{mailInfo.points}} out of {{mailInfo.pointsPossible}}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "checkemail",
  props:['id'],
  data: () => ({
    mailInfo:{}
  }),
  mounted() {
    this.checkIndividualMail()
  },
  methods: {
    async deleteLetter(){
      await this.$fetchData("DELETE", "/deleteScore", {
        id: this.id,
      });
      this.$router.push({name:"mainMail"})
    },
    async checkIndividualMail() {
      this.submitting = true;
      const response = await this.$fetchData("POST", "/individualMail", {
        id: this.id,
      });
      this.submitting = false;
      this.mailInfo = response.requestData
      this.updateEmail();
    },
    async updateEmail() {
      // sending id as the key is the same as sending _id for mongo. Mongo reads id as _id
      const response = await this.$fetchData("PUT", "/updateScore", {
        id: this.mailInfo._id,
      });
    },
  },
};
</script>