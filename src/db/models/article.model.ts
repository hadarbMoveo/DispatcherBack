import mongoose from 'mongoose';

const { Schema } = mongoose;

const articleSchema = new Schema({
  author: String,
  content: String,
  description: String,
  publishedAt: String,
  title: String,
  urlToImage: String,
  user: String,
});

const Article = mongoose.model('Article', articleSchema);

export default Article;