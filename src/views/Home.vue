<template>
  <div class="container">
    <h1>Header will go here</h1>
    <h2>Splash info and call to action will go here</h2>
    <div>
      <b-card-group columns>
        <a
          :key="images.index"
          v-for="images in this.$store.getters.getHomeImages"
          class="card-link"
          :href="images.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b-card
            overlay
            :img-src="images.download_url"
            img-alt="Card Image"
            text-variant="white"
            title="Image Overlay"
            sub-title="Subtitle"
          >
            <b-card-text>
              {{ images.author }}
            </b-card-text>
          </b-card>
        </a>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    getHomeImages() {
      this.$store.dispatch("getHomeImages").catch(err => console.log(err));
    }
  },
  created() {
    this.getHomeImages();
  }
};

// style added inline to b-card, works but can't add hover/pseudostates inline
// :style="{'box-shadow': '2px 2px 6px 0px rgba(44,62,80,0.65)'}"
</script>

<style lang="scss" scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
