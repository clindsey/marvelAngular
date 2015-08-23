angular.module('templates-main', ['templates/characters/details.html', 'templates/characters/list.html']);

angular.module("templates/characters/details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/characters/details.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">{{character.name}}</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>{{ character.description }}</p>\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"url in character.urls\">\n" +
    "      <a href=\"{{url.url}}\">{{url.type}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/characters/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/characters/list.html",
    "<div class=\"page-header\">\n" +
    "  <h1>clindsey/marvelAngular</h1>\n" +
    "  <p class=\"lead\">Search through Marvel characters.</p>\n" +
    "</div>\n" +
    "<div class=\"search-area\">\n" +
    "  <form class=\"form-horizontal\" ng-submit=\"search()\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"inputSearch\" class=\"col-sm-2 control-label\">Search</label>\n" +
    "      <div class=\"col-sm-10\">\n" +
    "        <input class=\"form-control\" type=\"text\" placeholder=\"Character Name\" ng-model=\"searchQuery\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"media-tabs\">\n" +
    "  <!--\n" +
    "  <ul class=\"nav nav-pills\">\n" +
    "    <li class=\"active\"><a href=\"#characters\" data-toggle=\"tab\">Characters <span class=\"badge\"></span></a></li>\n" +
    "    <li><a href=\"#comics\" data-toggle=\"tab\">Comics <span class=\"badge\"></span></a></li>\n" +
    "    <li><a href=\"#creators\" data-toggle=\"tab\">Creators <span class=\"badge\"></span></a></li>\n" +
    "  </ul>\n" +
    "  -->\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane active\" id=\"characters\">\n" +
    "      <div class=\"characters-list media-list\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-6 col-md-3\" ng-repeat=\"character in characters\">\n" +
    "            <a ng-click=\"characterClick(character.id)\" class=\"characters-list-item media-list-item\" character-thumbnail>\n" +
    "              <h4>{{character.name}}</h4>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      <div>\n" +
    "    </div>\n" +
    "    <div class=\"tab-pane\" id=\"comics\">\n" +
    "      <div class=\"comics-list media-list\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"tab-pane\" id=\"creators\">\n" +
    "      <div class=\"creators-list media-list\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<pagination\n" +
    "  total-items=\"totalItems\"\n" +
    "  ng-model=\"currentPage\"\n" +
    "  ng-change=\"pageChanged()\"\n" +
    "  max-size=\"maxSize\"\n" +
    "  boundary-links=\"true\"\n" +
    "  rotate=\"false\"\n" +
    "  items-per-page=\"itemsPerPage\">\n" +
    "</pagination>\n" +
    "");
}]);
