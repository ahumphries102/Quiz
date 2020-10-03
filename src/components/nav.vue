<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Quiz App</span>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="$root.loggedIn" class="d-flex ">
        <p>Hello {{$store.state.userName}}</p>
        <router-link :to="{name:'checkemail', params:{userName:$store.state.userName?$store.state.userName:'default'}}">Mail Box {{$store.emailInfo.inbox}}</router-link>
        <v-btn depressed color="blue darken-3" @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="$router.currentRoute.name !== 'login'"
    >
      <v-list :disabled="$store.state.token === ''" v-show="!$router.currentRoute.path.includes('guest')">
        <v-list-item v-for="(routeName, ind) in routes.listName" :key="ind">
          <router-link
            :to="{name:routes.nameOfRoute[ind], params:{userName:$store.state.userName?$store.state.userName:'default'}}"
          >{{routeName}}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "navi",
  data: () => ({
    drawer: null,
    routes: {
      listName: [
        "Create a Quiz",
        "View Your Quizzes",
        "Take a Quiz",
        "View All Quizzes",
        "Mail a Quiz"
      ],
      nameOfRoute: ["createquiz", "viewquiz", "takequiz", "viewallquizzes", "mail"],
    },
  }),
  methods: {
    logout() {
      this.$router.push({ name: "login" }).catch((err) => err);
      this.$store.clearStorage();
      this.$root.loggedIn = false;
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>