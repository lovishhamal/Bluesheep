const express = require('express');
const app = express();
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
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
}
