<template>
  <v-container>
      <v-list >
        <v-list-item  v-for="(letter, ind) in mail" :key="ind">
            <v-list-item @click="route(letter, ind)">{{letter.userName}}</v-list-item>
        </v-list-item>
      </v-list>
  </v-container>
</template>

<script>
export default {
  name: "mainMail",
  data: () => ({
      mail:[]
  }),
  mounted(){
      this.checkEmail()
  },
  methods: {
    route(mailInfo, ind){
        this.$router.push({
            name:"individualMail",
            params:{
                id:ind,
                mailInfo:mailInfo
            }
        })
    },
    async checkEmail() {
      this.submitting = true;
      const response = await this.$fetchData("POST", "/checkmail", {
        userName: this.$store.state.userName,
      });
      this.submitting = false;
      response.request.ok ? (this.mail = response.response) : "";
      this.mail.forEach((ele) => {
        ele.reviewed = true;
      });
    },
  },
};
</script>

<style>
</style>