var mongoose = require('mongoose'); // mongoose object

// ObjectId: used to create relationships between data models
// ref: what type of object the ID references
var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}] // set comments field to to array of Comment references
});
mongoose.model('Post', PostSchema); // Post model

// adds an upvote method to the Posts schema
PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
