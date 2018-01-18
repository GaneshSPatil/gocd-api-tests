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

const prepareRequestConfig = (config) => {
  const requestConfig = {};

  requestConfig.url     = 'http://localhost:8153' + config.request.endpoint;
  // requestConfig.path    = ;
  requestConfig.headers = config.request.headers;
  requestConfig.method  = config.request.method;
  requestConfig.auth    = {'username': 'admin', 'password': 'badger'};

  return requestConfig;
};

const validateResponse = (res, configuration) => {
  console.log("Here i am going to validate the api response against the expected configuration");
  console.log("body:", res.body);
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);
  console.log("expectation:", configuration.response);
  console.log("############### done ###############")
};

const executeMethodTest = (methodPath, gocdApiService) => {
  console.log("Executing tests for method ", methodPath);
  const configuration = JSON.parse(fs.readFileSync(methodPath, 'utf8'));
  const requestConfig = prepareRequestConfig(configuration);
  console.log(configuration);
  console.log(requestConfig);

  gocdApiService.makeAPICall(requestConfig)
    .then((res) => validateResponse(res, configuration))
    .catch((err) => console.log("Whoops, some error, need to fail the test"));
};

const ApiTestConfiguration = function (apiPath) {
  const self = this;

  const allConfigurationFiles = fs.readdirSync(apiPath);
  const configurationMap      = getConfigurationMap(apiPath, allConfigurationFiles);

  console.log(configurationMap);

  self.setup = (gocdApiService) => {
    return gocdApiService.updateXml(configurationMap.xmlPath);
  };

  self.executeInOrder = (gocdApiService) => {
    console.log('******************************************************');
    console.log(configurationMap.methods);
    executeMethodTest(path.join(apiPath, configurationMap.methods[0]), gocdApiService);
    console.log('******************************************************');
  };

};

module.exports = ApiTestConfiguration;
