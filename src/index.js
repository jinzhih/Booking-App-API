require('dotenv').config();
const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const morganLog =
  process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`);
    });
  })
  .catch(e => {
    console.log('DB connection failed');
    console.log(e);
    process.exit(1); //只有0才表示正常退出
  });