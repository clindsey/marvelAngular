window.require.register("directives/characters", function(require, module) {var characterDirectives;

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
