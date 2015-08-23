var characterServices, config;

config = require('config');

characterServices = angular.module('characterServices', ['ngResource']);

characterServices.factory('Character', [
  '$resource', function($resource) {
    return $resource("" + config.baseUri + "/characters", {
      apikey: config.apiKey
    }, {
      get: {
        method: 'GET',
        url: "" + config.baseUri + "/characters/:characterId",
        transformResponse: function(json) {
          return angular.fromJson(json).data.results[0];
        }
      },
      query: {
        method: 'GET',
        params: {
          limit: config.itemsPerPage,
          offset: 0
        },
        transformResponse: function(json) {
          return angular.fromJson(json).data;
        }
      }
    });
  }
]);
