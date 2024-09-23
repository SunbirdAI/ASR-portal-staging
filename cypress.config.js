const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,

  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      localUrl: "http://localhost:3000",
      productionUrl: "https://speech.sunbird.ai",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
