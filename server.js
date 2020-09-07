const express = require('express');
const app = express();
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./database');
const PORT = 8080;

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
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
}
