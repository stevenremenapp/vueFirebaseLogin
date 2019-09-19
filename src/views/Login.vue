<template>
  <form>
    <h1>Sign In</h1>
    <div>
      <label for="email">Email: </label>
      <input v-model="email" id="email" type="email" />
      <br />
      <br />
      <label for="password">Password: </label>
      <input v-model="password" id="password" type="password" />
    </div>
    <br />
    <div>
      <button @click.stop.prevent="login">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
