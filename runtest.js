const path              = require('path');
const GoCDServerService = require(path.resolve("lib/services/gocdServerService.js"));
const APITestService    = require(path.resolve("lib/services/apiTestService.js"));

const gocdServerService = new GoCDServerService();
console.log(gocdServerService);
const apiTestService    = new APITestService();


gocdServerService.startServer();
apiTestService.execute();
gocdServerService.stopServer();

// GoCDServerService.startServer(); //starts and waits until the server is up
// APITestService.execute(); //executes all tests
// GoCDServerService.stopServer(); //stops the gocd server


