const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const db = require('./database');
const PORT = process.env.PORT || 8080;

/* Basic server setup */
app.use(helmet());

/* Database */

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('err connecting database ' + err));

require('dotenv').config();
app.use(cors());

/* Body parser */
app.use(express.json());

app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
  console.log(`Server started ast port -> ${PORT}`);
});
