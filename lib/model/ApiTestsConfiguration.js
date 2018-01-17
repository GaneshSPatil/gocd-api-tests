const fs   = require('fs');
const path = require('path');

const ApiTestConfiguration = require(path.resolve('lib/model/ApiTestConfiguration.js'));

const ApiTestsConfiguration = function (endpointsPath) {
  const self             = this;
  const allEndpointsPath = fs.readdirSync(endpointsPath);
  const allEndpoints     = allEndpointsPath.map((apiPath) => new ApiTestConfiguration(apiPath));

  self.execute = (gocdApiService) => {
    allEndpoints.forEach((endpoint) => {
      endpoint.setup(gocdApiService);
      endpoint.executeInOrder(gocdApiService);
    });
  }
};

module.exports = ApiTestsConfiguration;