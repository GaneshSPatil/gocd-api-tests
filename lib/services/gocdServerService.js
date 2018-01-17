const GoCDServerService = function () {
  const self       = this;
  self.startServer = () => {
    console.log("I am going to start the server!!");
  };

  self.stopServer = () => {
    console.log("I am going to stop the server!!");
  };
};

module.exports = GoCDServerService;
