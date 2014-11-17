"use strict"
var path = require('path');

module.exports = {
  routesPath: 'routes',
  routesLoader: function(routes, app) {
    for(var route in routes) {
      app.use(route, require(path.resolve(this.routesPath, routes[route])));
    }
  },

};
