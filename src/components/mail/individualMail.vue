<template>
  <v-container>
      <v-list v-for="(value, name, index) in mailInfo" :key="index">
          {{name}}: {{value}}
      </v-list>
  </v-container>
</template>

<script>
export default {
  name: "checkemail",
  props:['mailInfo'],
  data: () => ({
  }),
  mounted() {
    this.updateEmail()
  },
  methods: {
    async updateEmail(){
      const response = await this.$fetchData("PUT", "/updateScore", {
        id: this.mailInfo.id,
      });
    }
  },
};
</script>