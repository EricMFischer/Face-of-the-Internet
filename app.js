var app = angular.module('flapperNews', ['ui.router']); // dep/external module

app.config ([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() { // factories & services -> both instances of a Provider. created so we can later inject data anywhere.
  var o = { // by exporting obj that contains post array, we can later add new objects and methods to our services
    posts: [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ]
  };
  return o;
}]);

// Injects posts service into MainCtrl
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {

  // $scope -> connects controllers and templates (two-way data binding)
  // Bind functions or variables to $scope to have them avail. in template
  $scope.posts = posts.posts;

  $scope.addPost = function() { // how will user execute this fn? -> index
    if (!$scope.title || $scope.title === '') {return;}
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };

}]);

