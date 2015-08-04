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
    })
    .state('posts', {
      url: '/posts/{id}', // 'id' -> route parameter made avail. to our controller
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() { // factories & services -> both instances of a Provider. created so we can later inject data anywhere.
  var o = { // by exporting OBJECT that contains post array, we can later add new objects and methods to our services
    posts: [
      {title: 'Hey, I love smoothies more than you think.', upvotes: 5},
      {title: 'Why are YOU petting that monkey?', upvotes: 15},
      {title: 'This doesnt make any since', upvotes: 2},
      {title: 'Oh no, Im just a blurp of existence!', upvotes: 9},
      {title: 'This site is cooler than Reddit', upvotes: 4}
    ]
  };
  return o;
}]);

// Injects posts service into MainCtrl
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
  // $scope -> connects controllers and html (two-way data binding)
  // Bind fn/vars to $scope to have them avail. in template
  $scope.posts = posts.posts; // Posts returns an obj. Access its posts prop.

  $scope.addPost = function() { // how to exec? -> "ng-submit="addPost()"
    if (!$scope.title || $scope.title === '') {return;}
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Billy', body: 'Yeah, youre right!', upvotes: 0},
        {author: 'Bob', body: 'Great idea!', upvotes: 0}
      ]
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };

}]);

app.controller('PostsCtrl', [
  '$scope', 
  '$stateParams', // obj with one key per url parameter
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function() {
      if ($scope.body === '') {return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'Anonymous',
        upvotes: 0
      });
      $scope.body = '';
    };

  }]);

