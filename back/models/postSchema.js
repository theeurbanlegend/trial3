const mongoose = require('mongoose');


// Define the schema for the post
const postSchema = new mongoose.Schema({
  poster: {type:String},
  postTitle:{type:String},
  postSummary:{type:String},
  likes:{type:String},
  image: {
    filename: {type:String}
  },
  category: {
    type: String
  }
},{timestamps:true});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;

