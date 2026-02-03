const express = require('express');
require('dotenv').config();

const dns = require('dns');

// Force Node to use public DNS resolvers for SRV lookups
dns.setServers(['1.1.1.1', '8.8.8.8']);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { initDb } = require('./db/connection');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
