const request = require('request');
const fs      = require('fs');
const {exec}  = require('child_process');

const getCurrentXmlMD5 = () => {
  const requestConfig = {
    'url':    `http://localhost:8153/go/admin/restful/configuration/file/GET/xml`,
    'method': 'GET',
    'auth':   {
      'username': 'admin',
      'password': 'badger'
    }
  };

  return new Promise((fulfil, reject) => request(requestConfig, (err, res) => {
    err ? reject(err) : fulfil(res.headers['x-cruise-config-md5']);
  }));
};

const postNewXml = (md5, xmlPath) => {
  const command = [
    `curl -X POST http://localhost:8153/go/admin/restful/configuration/file/POST/xml`,
    `-u 'admin:badger'`,
    `-H 'Confirm: true'`,
    `-d md5=${md5}`,
    `--data-urlencode xmlFile@${xmlPath} -i`
  ].join(" ");

  return new Promise((fulfil, reject) => {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      err ? reject(stderr) : fulfil(stdout);
    });
  });
};

const GoCDApiService = function (gocdServerService) {
  const self             = this;
  self.gocdServerService = gocdServerService;

  self.updateXml = (xmlPath) => {
    return getCurrentXmlMD5().then((md5) => postNewXml(md5, xmlPath));
  };

  self.makeAPICall = (requestConfig) => {
    return new Promise((fulfil, reject) => request(requestConfig, (err, res) => {
      err ? reject(err) : fulfil(res);
    }));
  };
};

module.exports = GoCDApiService;
