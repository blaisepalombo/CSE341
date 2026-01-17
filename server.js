const express = require('express');
require('dotenv').config();

const { initDb } = require('./db/connection');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3000;

initDb(process.env.MONGO_URI, process.env.DB_NAME)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
