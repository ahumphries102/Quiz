<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-show="$isMobile()"/>
      <v-toolbar-title class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Quiz App</span>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="$root.loggedIn">
        <v-menu transition="slide-y-transition" left :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text dark v-bind="attrs" v-on="on" class="mr-3">
              <v-icon class="mr-2">mdi-account</v-icon>
              {{$isMobile()?'':'Hello ' + $store.state.userName}}
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-list>
                <v-btn text color="primary" @click="logout">Logout</v-btn>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
        <v-btn dark text>
          <router-link
            :style="{color:'white'}"
            :to="{name:'mainMail', params:{userName:$store.state.userName?$store.state.userName:'default'}}"
          >
            <v-icon :class="$isMobile()?'mr-1':'mr-2'">mdi-email</v-icon>
            <span :style="{color:'white'}">{{$store.emailInfo.unread}}</span>
          </router-link>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="$router.currentRoute.name !== 'login'"
    >
      <v-list
        :disabled="$store.state.token === ''"
        v-show="!$router.currentRoute.path.includes('guest')"
      >
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
        "Mail a Quiz",
      ],
      nameOfRoute: [
        "createquiz",
        "viewquiz",
        "takequiz",
        "viewallquizzes",
        "mailForm",
      ],
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