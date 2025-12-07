const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.wiseadmit.io",
    specPattern: "cypress/e2e/**/*.cy.js",
    env: {
      email: "manindrajoshi1@gmail.com",
      password: "JoshiManey@12"
    }
  }
});
