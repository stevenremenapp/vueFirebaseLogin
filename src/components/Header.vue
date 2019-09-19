<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link v-if="!loggedIn" to="/login">Login</router-link>
    <a v-else @click="logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
