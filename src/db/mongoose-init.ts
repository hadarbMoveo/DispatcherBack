import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI ?? ""
const dbName = process.env.DB_NAME

mongoose.connect(mongoURI, {
  dbName: dbName,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });