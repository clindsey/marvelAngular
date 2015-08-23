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
