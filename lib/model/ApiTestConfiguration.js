const path = require('path');

const ApiTestConfiguration = function (apiPath) {
  const self = this;

  self.setup = (gocdApiService) => {
    console.log("Setup the gocd server with the api", apiPath);
  };

  self.executeInOrder = (gocdApiService) => {
    console.log("execute all the tests for api", apiPath);
  };

};

module.exports = ApiTestConfiguration;
