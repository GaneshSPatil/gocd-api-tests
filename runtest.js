const path              = require('path');
const GoCDServerService = require(path.resolve("lib/services/GocdServerService.js"));
const GoCDApiService    = require(path.resolve("lib/services/GocdApiService.js"));
const APITestService    = require(path.resolve("lib/services/ApiTestService.js"));

const gocdServerService = new GoCDServerService();
const gocdApiService    = new GoCDApiService(gocdServerService);
const apiTestService    = new APITestService(gocdApiService);

gocdServerService.startServer();
apiTestService.execute();
gocdServerService.stopServer();
