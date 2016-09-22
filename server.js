'use strict';

require("source-map-support").install();
var babelPolyfill = require('babel-polyfill');

var app = function (config) {
  if (!config.routes) {
    throw new Error('Serenity config had no property "routes". The routes should be a key value object of route:serenityDependencyFunc');
  }

  if (!config.services) {
    throw new Error('Serenity config had no property "services". Your root services file should be a function which registers dependencies with serenity');
  }

  console.log(config);
}

var routes = {
  '/': 'handler.root',

  '/test': 'handler.test'
};

var services = function (di) {

  di.register('handler.root', [], function () {
    return function (req, res) {
      console.log('hello, world');

      res.json({
        success: true
      });
    };
  });
}

app({
  routes: routes,
  services: services
});
//# sourceMappingURL=server.js.map
