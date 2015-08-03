var app = angular.module('flapperNews', []);

app.controller('MainCtrl', ['$scope', function($scope) {
  $scope.test = 'Hello world!'; // sets up two-way data binding
  // $scope -> connects controllers and templates
  // bind functions or variables to $scope to have them avail. in template
  $scope.posts = [ // defines a list of post titles
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 9},
    {title: 'post 5', upvotes: 4}
  ];
  $scope.addPost = function() { // how will user execute this fn? -> index
    if (!$scope.title || $scope.title = '') {return;}
    $scope.posts.push({title: $scope.title, upvotes: 0});
    $scope.title = '';
  };

}]);

