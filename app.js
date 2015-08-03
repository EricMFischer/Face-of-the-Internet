var app = angular.module('flapperNews', []);

app.factory('posts', [function() { // factories & services -> both instances of a Provider. created so we can later inject data anywhere.
  var o = { // by exporting obj that contains post array, we can later add new objects and methods to our services
    posts: [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ];
  };
  return o;
}]);

// Injects posts service into MainCtrl
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.test = 'Hello world!'; // sets up two-way data binding
  // $scope -> connects controllers and templates.
  // Bind functions or variables to $scope to have them avail. in template
  $scope.posts = posts.posts; // two-way data binding only works with $scope
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

