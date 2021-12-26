const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
  mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error(error.message));
};

module.exports = connectDB;