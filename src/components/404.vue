<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">404</h1>

        <p>Looks like you may be lost</p>

        <v-btn
          :to="{name:'creatingquiz', params:{userName:$store.state.userName}}"
          color="primary"
        >
          Click to Take Me Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'FourOhFour',
    props: {
      lang: {
        type: String,
        default: 'en',
      },
    },
  }
</script>