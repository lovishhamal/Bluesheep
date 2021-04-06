const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const db = require('./database');
const PORT = process.env.PORT || 8080;
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

/* Basic server setup */
app.use(helmet());
/* Database */
app.use(express.static(path.join(__dirname, 'client')));
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('err connecting database ' + err));

require('dotenv').config();
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
});

/* Body parser */
app.use(express.json());
app.use('/', require('./routes/routes'));

http.listen(PORT, () => {
  console.log(`Server started ast port -> ${PORT}`);
});
