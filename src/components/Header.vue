<template>
  <nav>
    <b-navbar toggleable="sm">
      <b-navbar-brand to="/">
        <img src="../assets/img/houseLogo.png" alt="Logo" id="logo" />
        TagPro
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto nav-text">
          <b-nav-item to="/prosignup">Join as a Pro</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item v-if="!loggedIn" to="/login">Login</b-nav-item>
          <b-nav-item v-else @click="logout">Logout</b-nav-item>
          <b-nav-item v-if="!loggedIn" to="/signup">
            <b-button variant="outline-secondary" class="ml-2 my-sm-0">
              Sign Up
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </nav>
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

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid #e4e5e7;
  #logo {
    max-width: 50px;
    height: auto;
  }
  .nav-text {
    text-align: right;
  }
}
</style>
