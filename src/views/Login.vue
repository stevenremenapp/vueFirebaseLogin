<template>
  <div class="container pt-5">
    <h1 class="mb-5">Welcome Back</h1>
    <div class="form-container p-4">
      <form @submit.stop.prevent="login">
        <div>
          <label for="email">Email:&nbsp;</label>
          <input v-model="email" id="email" type="email" />
          <br />
          <br />
          <label for="password">Password:&nbsp;</label>
          <input v-model="password" id="password" type="password" />
        </div>
        <div>
          <div>
            <input
              v-model="accountType"
              type="radio"
              id="pro"
              name="userType"
              value="pro"
            />
            <label for="pro">&nbsp;Pro</label>
          </div>
          <div>
            <input
              v-model="accountType"
              type="radio"
              id="consumer"
              name="userType"
              value="consumer"
            />
            <label for="consumer">&nbsp;Consumer</label>
          </div>
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      accountType: null
    };
  },
  methods: {
    testType() {
      console.log(this.accountType);
    },
    login() {
      if (this.accountType === "consumer") {
        this.$store
          .dispatch("loginConsumer", {
            email: this.email,
            password: this.password
          })
          .catch(err => console.log(err));
      }
      if (this.accountType === "pro") {
        this.$store
          .dispatch("loginPro", {
            email: this.email,
            password: this.password
          })
          .catch(err => console.log(err));
      }
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
