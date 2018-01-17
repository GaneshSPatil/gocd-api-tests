const fs   = require('fs');
const path = require('path');

const getConfigurationMap = function (apiPath, allConfigFiles) {
  const configuration        = {};
  configuration.xmlPath      = path.join(apiPath, 'cruise-config.xml');
  configuration.metadataPath = path.join(apiPath, 'metadata.json');
  configuration.methods      = [];

  allConfigFiles.forEach((fileName) => {
    if (fileName !== 'cruise-config.xml' && fileName !== 'metadata.json') {
      configuration.methods.push(fileName);
    }
  });

  return configuration;
};

const ApiTestConfiguration = function (apiPath) {
  const self = this;

  const allConfigurationFiles = fs.readdirSync(apiPath);
  const configurationMap      = getConfigurationMap(apiPath, allConfigurationFiles);

  console.log(configurationMap);

  self.setup = (gocdApiService) => {
    console.log("Setup the gocd server with the api", apiPath);
  };

  self.executeInOrder = (gocdApiService) => {
    console.log("execute all the tests for api", apiPath);
  };

};

module.exports = ApiTestConfiguration;
