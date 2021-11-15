<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(email, ind) in emails" :key="ind">
        <router-link
          :to="{
            name: 'individualMail',
            params: {
              userName: $store.state.userName
                ? $store.state.userName
                : 'default',
              id: email._id,
            },
          }"
          >{{ email.userName }}</router-link
        >
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "mainMail",
  data: () => ({
    emails: [],
  }),
  async mounted() {
    this.emails = await this.$store.checkEmail()
  },
};
</script>

<style>
</style>