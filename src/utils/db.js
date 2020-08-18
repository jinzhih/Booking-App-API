const mongoose = require("mongoose");

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }

  const db = mongoose.connection;
  db.on('connected', () => {
      console.log('DB connected');
  });
  db.on('error', (error) => {
      console.log('DB connection failed.');
      console.error(error.message);
      process.exit(1);

  });
  db.on('disconnected', () =>{
      console.log('mongoose connection is disconnected.');
  });

  return mongoose.connect(connectionString,{
      useUnifiedTopology: true,
      useNewUrlParser: true
  });
};
