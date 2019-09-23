<template>
  <div class="container pt-5">
    <h1>Sign Up</h1>
    <p class="mb-5">You are signing up as a <strong>consumer!</strong></p>
    <div class="form-container p-4">
      <form @submit.stop.prevent="signup">
        <div>
          <label for="firstName">First Name:&nbsp;</label>
          <input v-model="firstName" id="firstName" type="text" />
          <br />
          <br />
          <label for="lastName">Last Name:&nbsp;</label>
          <input v-model="lastName" id="lastName" type="text" />
          <br />
          <br />
          <label for="email">Email:&nbsp;</label>
          <input v-model="email" id="email" type="email" />
          <br />
          <br />
          <label for="password">Password:&nbsp;</label>
          <input v-model="password" id="password" type="password" />
        </div>
        <br />
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      this.$store
        .dispatch("signupConsumer", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  h1 {
    font-weight: bold;
    font-size: 2rem;
  }
  .form-container {
    border: 1px solid #000;
    border-radius: 4px;
  }
}
</style>
