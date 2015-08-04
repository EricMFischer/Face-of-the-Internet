var mongoose = require('mongoose'); // import Mongoose
var Post = mongoose.model('Post'); // handle to Post model
var Comment = mongoose.model('Comment'); // handle to Comment model
var express = require('express');
var router = express.Router();

// req: contains data fields about request made to server
// res: object used to respond to client
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
GET /posts - return a list of posts and associated metadata
POST /posts - create a new post
GET /posts/:id - return an individual post with associated comments
PUT /posts/:id/upvote - upvote a post, notice we use the post ID in the URL
POST /posts/:id/comments - add a new comment to a post by ID
PUT /posts/:id/comments/:id/upvote - upvote a comment
*/

// Define the URL for the route /posts. GET.
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {return next(err);}
    res.json(posts); // returns JSON list with all posts (i.e. sends JSON response of retrieved posts back to client)
  });
});

// POST.
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body); // using mongoose to create a new post object in memory before saving it to db
  post.save(function(err, post) {
    if (err) {return next(err);}
    res.json(post);
  });
});

// when we define a route URL with :post in it, this will be run first
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id); // retrieves post obj from db
  query.exec(function(err, post) {
    if (err) {return next(err);}
    if (!post) {return next(new Error('Cannot find post'));}

    req.post = post; // attaches post obj to the req obj
    return next(); // routeHandler is called
  });
});

router.get('/posts/:post', function(req, res) {
  res.json(req.post); // post was already attached to req object, so our request handler just has to return the JSON back to the client
});

module.exports = router;
