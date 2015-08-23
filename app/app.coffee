require 'controllers/characters'
require 'services/characters'
require 'directives/characters'

marvelApp = angular.module 'marvelApp', [
  'ngRoute'
  'templates-main'
  'ui.bootstrap'
  'characterControllers'
  'characterServices'
  'characterDirectives'
]

marvelApp.config ['$routeProvider', ($routeProvider) ->
  $routeProvider.
  when('/characters', {
    templateUrl: 'templates/characters/list.html'
    controller: 'CharacterListController'
    reloadOnSearch: false
  }).
  otherwise {
    redirectTo: '/characters'
  }
]
