config = require 'config'

characterControllers = angular.module 'characterControllers', []

setInitialState = ($scope) ->
  $scope.characters = []
  $scope.totalItems = 0
  $scope.itemsPerPage = config.itemsPerPage
  $scope.currentPage = 1
  $scope.maxSize = 5

showPage = ($scope) ->
  return ({results, total, offset, limit}) ->
    $scope.characters = results
    $scope.totalItems = total
    $scope.currentPage = (offset / limit) + 1

pageChanged = ($scope, Character, $location) ->
  return ->
    $scope.characters = []
    offset = ($scope.currentPage - 1) * $scope.itemsPerPage
    params = {offset}
    q = $location.search().q
    if q isnt ''
      params.nameStartsWith = q
    Character.query params, showPage($scope)
    $location.search {p: $scope.currentPage, q}

onRouteUpdate = ($scope, $routeParams, $modal, $location, Character) ->
  return ->
    if $routeParams.id
      modal = $modal.open
        templateUrl: 'templates/characters/details.html'
        scope: $scope
      modal.result.then angular.noop, ->
        $location.search {id: null, q: $scope.searchQuery, p: ($scope.currentPage)}
      $scope.character = Character.get {characterId: $routeParams.id}
    if $routeParams.q
      params = {}
      if $scope.searchQuery isnt ''
        params.nameStartsWith = $scope.searchQuery
      if $routeParams.p
        params.offset = ($routeParams.p - 1) * $scope.itemsPerPage
      Character.query params, showPage($scope)
      $scope.characters = []

search = ($scope, $location) ->
  return ->
    $location.search {q: $scope.searchQuery, p: null}

onCharacterClick = ($scope, $location) ->
  return (characterId) ->
    $location.search {id: characterId, q: $scope.searchQuery, p: ($scope.currentPage)}

characterControllers.controller 'CharacterListController', ['$scope', '$routeParams', 'Character', '$modal', '$location'
  ($scope, $routeParams, Character, $modal, $location) ->
    setInitialState $scope
    $scope.search = search($scope, $location)
    $scope.pageChanged = pageChanged($scope, Character, $location)
    $scope.characterClick = onCharacterClick($scope, $location)
    $scope.$on '$routeUpdate', onRouteUpdate($scope, $routeParams, $modal, $location, Character)
    {q, id, p} = $location.search()
    if q or id
      $scope.searchQuery = q if q
      onRouteUpdate($scope, $routeParams, $modal, $location, Character)()
    unless q
      params = {}
      if p
        params.offset = $scope.itemsPerPage * (p - 1)
      Character.query params, showPage($scope)
]
