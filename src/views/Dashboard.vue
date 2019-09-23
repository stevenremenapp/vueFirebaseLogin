<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="this.$store.getters.userBusinessName">
      Hello {{ this.$store.getters.userFirstName }} from
      {{ this.$store.getters.userBusinessName }}!
    </p>
    <p v-else>
      Hello {{ this.$store.getters.userFirstName }}
      {{ this.$store.getters.userLastName }}!
    </p>
    <p>
      You are a
      {{ this.$store.getters.userProStatus === false ? "consumer" : "pro" }}.
    </p>
  </div>
</template>

<script>
export default {
  name: "dashboard"
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 6rem 0 3rem 0;
}
</style>
