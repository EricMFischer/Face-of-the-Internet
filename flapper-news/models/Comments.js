var mongoose = require('mongoose'); // mongoose object

// ObjectId: used to create relationships between data models
// ref: what type of object the ID references

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

mongoose.model('Comment', CommentSchema); // Comment model