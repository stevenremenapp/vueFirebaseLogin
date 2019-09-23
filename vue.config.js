const apiMocker = require("connect-api-mocker");

module.exports = {
  devServer: {
    before: function(app) {
      app.use(apiMocker("/api", "mocks/api"));
    }
  }
};
