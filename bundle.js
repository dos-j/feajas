'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var babelPolyfill = require('babel-polyfill');
var express = _interopDefault(require('express'));
var serenity = _interopDefault(require('serenitydi'));

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var expressApp = express();
/**
 * The router is the start of all things serenity-node, each time we
 * receive a new request, it will have looked up a route from the specified
 * routes and will attempt to match to the dependency associated and invoke it 
 * as a function.
 *
 * @param di - the serenity instance to be used for dependencies
 * @param routes {Object} - Key/Val store of route/dependency.
 */
function router(di, routes) {

  for (var route in routes) {
    var routeExecutor = executeRoute.bind(this, di, routes[route]);

    var _route$split$map = route.split(' ').map(function (item) {
      return item.toLowerCase();
    });

    var _route$split$map2 = slicedToArray(_route$split$map, 2);

    var method = _route$split$map2[0];
    var uri = _route$split$map2[1];

    console.log(method);

    expressApp[method](uri, routeExecutor);
  }
}

function executeRoute(di, dependency) {
  console.log("here");

  var routeHandler = di.fetch(dependency);

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  routeHandler.apply(undefined, args);
}

var app = function (config) {
  var routes = config.routes;
  var services = config.services;


  if (!routes) {
    throw new Error('Serenity config had no property "routes". The routes should be a key value object of route:serenityDependencyFunc');
  }

  if (!services) {
    throw new Error('Serenity config had no property "services". Your root services file should be a function which registers dependencies with serenity');
  }

  services(serenity);

  router(serenity, routes);
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

  di.register('handler.test', [], function () {
    return function (req, res) {

      res.json({
        success: 'test'
      });
    };
  });
}

app({
  routes: routes,
  services: services
});
