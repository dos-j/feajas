'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var babelPolyfill = require('babel-polyfill');
var app = _interopDefault(require('serenity-node'));

var routes = {
  'GET /': 'handler.root',
  'GET /test': 'handler.test'
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

  di.register('handler.test', [], function () {
    return function (req, res) {

      res.json({
        success: 'test'
      });
    };
  });
}

var engine = app({
  routes: routes,
  services: services
});

engine.listen(5000);
