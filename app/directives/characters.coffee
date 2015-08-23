characterDirectives = angular.module 'characterDirectives', []

characterDirectives.directive 'characterThumbnail', ->
  return ({character}, element) ->
    thumbnailUri = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    if character.thumbnail
      thumbnailUri = "#{character.thumbnail.path}.#{character.thumbnail.extension}"
    element.css {
      'background-image': "url(#{thumbnailUri})"
    }
