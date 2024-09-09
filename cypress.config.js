const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Default configuration shared across environments
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: {
    runMode: 2, // Retry failed tests twice in CI (run mode)
    openMode: 0, // No retries in Cypress GUI (open mode)
  },
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

  e2e: {
    setupNodeEvents(on, config) {
      const env = process.env.CYPRESS_ENV || 'dev';  // Default to dev if not specified
      
      // Define your environment configurations
      const environments = {
        dev: {
          baseUrl: 'https://www.webdriveruniversity.com',
          apiUrl: 'https://www.webdriveruniversity.com/Login-Portal/index.html',
          authToken: 'dev-token-here'
        },
        staging: {
          baseUrl: 'https://www.webdriveruniversity.com',
          apiUrl: 'https://api.staging.yourapp.com',
          authToken: 'staging-token-here'
        },
        prod: {
          baseUrl: 'https://www.udemy.com/course/the-api-master-class-testing-in-detail-using-postman/?couponCode=OF83024F',
          apiUrl: 'https://api.yourapp.com',
          authToken: 'prod-token-here'
        }
      };
      
      // Assign the configuration based on the environment
      const envConfig = environments[env];
      if (!envConfig) {
        throw new Error(`Unknown environment: ${env}`);
      }

      config.baseUrl = envConfig.baseUrl;
      config.env.apiUrl = envConfig.apiUrl;
      config.env.authToken = envConfig.authToken;

      return config;
    },
  }
});
