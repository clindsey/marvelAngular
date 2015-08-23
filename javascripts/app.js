window.require.register('app', function(require, module) {
var marvelApp;

require('controllers/characters');

require('services/characters');

require('directives/characters');

marvelApp = angular.module('marvelApp', ['ngRoute', 'templates-main', 'ui.bootstrap', 'characterControllers', 'characterServices', 'characterDirectives']);

marvelApp.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/characters', {
      templateUrl: 'templates/characters/list.html',
      controller: 'CharacterListController',
      reloadOnSearch: false
    }).otherwise({
      redirectTo: '/characters'
    });
  }
]);

});

window.require.register('config', function(require, module) {
var config;

config = {
  itemsPerPage: 16,
  baseUri: 'http://gateway.marvel.com:80/v1/public',
  apiKey: '5bcc3f454ee3374c9426e6c9f0f5ad84'
};

module.exports = config;

});

window.require.register('config.example', function(require, module) {
var config;

config = {
  itemsPerPage: 16,
  baseUri: 'http://gateway.marvel.com:80/v1/public',
  apiKey: 'YOUR KEY HERE'
};

module.exports = config;

});

window.require.register('controllers/characters', function(require, module) {
var characterControllers, config, onCharacterClick, onRouteUpdate, pageChanged, search, setInitialState, showPage;

config = require('config');

characterControllers = angular.module('characterControllers', []);

setInitialState = function($scope) {
  $scope.characters = [];
  $scope.totalItems = 0;
  $scope.itemsPerPage = config.itemsPerPage;
  $scope.currentPage = 1;
  return $scope.maxSize = 5;
};

showPage = function($scope) {
  return function(_arg) {
    var limit, offset, results, total;
    results = _arg.results, total = _arg.total, offset = _arg.offset, limit = _arg.limit;
    $scope.characters = results;
    $scope.totalItems = total;
    return $scope.currentPage = (offset / limit) + 1;
  };
};

pageChanged = function($scope, Character, $location) {
  return function() {
    var offset, params, q;
    $scope.characters = [];
    offset = ($scope.currentPage - 1) * $scope.itemsPerPage;
    params = {
      offset: offset
    };
    q = $location.search().q;
    if (q !== '') {
      params.nameStartsWith = q;
    }
    Character.query(params, showPage($scope));
    return $location.search({
      p: $scope.currentPage,
      q: q
    });
  };
};

onRouteUpdate = function($scope, $routeParams, $modal, $location, Character) {
  return function() {
    var modal, params;
    if ($routeParams.id) {
      modal = $modal.open({
        templateUrl: 'templates/characters/details.html',
        scope: $scope
      });
      modal.result.then(angular.noop, function() {
        return $location.search({
          id: null,
          q: $scope.searchQuery,
          p: $scope.currentPage
        });
      });
      $scope.character = Character.get({
        characterId: $routeParams.id
      });
    }
    if ($routeParams.q) {
      params = {};
      if ($scope.searchQuery !== '') {
        params.nameStartsWith = $scope.searchQuery;
      }
      if ($routeParams.p) {
        params.offset = ($routeParams.p - 1) * $scope.itemsPerPage;
      }
      Character.query(params, showPage($scope));
      return $scope.characters = [];
    }
  };
};

search = function($scope, $location) {
  return function() {
    return $location.search({
      q: $scope.searchQuery,
      p: null
    });
  };
};

onCharacterClick = function($scope, $location) {
  return function(characterId) {
    return $location.search({
      id: characterId,
      q: $scope.searchQuery,
      p: $scope.currentPage
    });
  };
};

characterControllers.controller('CharacterListController', [
  '$scope', '$routeParams', 'Character', '$modal', '$location', function($scope, $routeParams, Character, $modal, $location) {
    var id, p, params, q, _ref;
    setInitialState($scope);
    $scope.search = search($scope, $location);
    $scope.pageChanged = pageChanged($scope, Character, $location);
    $scope.characterClick = onCharacterClick($scope, $location);
    $scope.$on('$routeUpdate', onRouteUpdate($scope, $routeParams, $modal, $location, Character));
    _ref = $location.search(), q = _ref.q, id = _ref.id, p = _ref.p;
    if (q || id) {
      if (q) {
        $scope.searchQuery = q;
      }
      onRouteUpdate($scope, $routeParams, $modal, $location, Character)();
    }
    if (!q) {
      params = {};
      if (p) {
        params.offset = $scope.itemsPerPage * (p - 1);
      }
      return Character.query(params, showPage($scope));
    }
  }
]);

});

window.require.register('directives/characters', function(require, module) {
var characterDirectives;

characterDirectives = angular.module('characterDirectives', []);

characterDirectives.directive('characterThumbnail', function() {
  return function(_arg, element) {
    var character, thumbnailUri;
    character = _arg.character;
    thumbnailUri = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    if (character.thumbnail) {
      thumbnailUri = "" + character.thumbnail.path + "." + character.thumbnail.extension;
    }
    return element.css({
      'background-image': "url(" + thumbnailUri + ")"
    });
  };
});

});

window.require.register('index', function(require, module) {

require('templates');

require('app');

});

window.require.register('services/characters', function(require, module) {
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

});
