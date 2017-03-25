angular.module('services.seo', [])
.factory('seoService',['$document', function($document) {
  var description;
  var tags;
  return {
    setTags: function(t) {
      tags = t;
      return $document.prop('meta', tags);
    },
    setDescription: function() {
      return $document.prop('meta');
    }
  };
}]);