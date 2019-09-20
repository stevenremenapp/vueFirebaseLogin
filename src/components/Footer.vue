<template>
  <footer>
    <b-container fluid class="footer-container">
      <b-container>
        <b-row align-h="start" align-v="center" class="logo-socials-container footer-row">
          <div class="socials-container">
            <b-col>
              <i class="fab fa-facebook-square"></i>
            </b-col>
            <b-col>
              <i class="fab fa-instagram"></i>
            </b-col>
            <b-col>
              <i class="fab fa-pinterest-square"></i>
            </b-col>
            <b-col>
              <i class="fab fa-twitter-square"></i>
            </b-col>
          </div>
          <div class="logo-container">
            <img src="../assets/img/houseLogo.png" alt="House logo" />
          </div>
        </b-row>
        <b-row class="info-container text-left footer-row">
          <b-col>
            <h6>About TagPro</h6>
            <p>Who we are</p>
            <p>What we're up to</p>
            <p></p>
          </b-col>
          <b-col>
            <h6>Discover</h6>
            <p>Become a Pro</p>
            <p>Services</p>
            <p></p>
          </b-col>
          <b-col>
            <h6>Support</h6>
            <p>Help</p>
            <p>Contact Us</p>
          </b-col>
        </b-row>
        <b-row class="legal-container">
          <b-col>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </b-col>
        </b-row>
        <b-row class="copyright-container">
          <b-col>TagPro &copy; 2019</b-col>
        </b-row>
      </b-container>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer-container {
  background: #f5f5f5;
  border-top: 1px solid #e4e5e7;
  padding: 2rem 0;
  margin-top: 6rem;
  position: relative;
  bottom: 0;
  .footer-row {
    margin-bottom: 50px;
  }
  h6 {
    font-weight: bold;
    text-transform: uppercase;
  }
  p {
    margin: 0;
  }
  i {
    font-size: 175%;
    text-align: right;
  }
}
</style>
