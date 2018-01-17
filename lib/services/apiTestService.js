const path = require('path');

const ApiTestsConfiguration = require(path.resolve('lib/model/ApiTestsConfiguration'));

const APITestService = function (gocdApiService) {
  const endpointsPath = path.resolve('endpoints');
  self                = this;

  self.gocdApiService = gocdApiService;
  self.endpoints      = new ApiTestsConfiguration(endpointsPath);

  self.execute = () => {
    self.endpoints.execute(gocdApiService);
  };
};

module.exports = APITestService;
