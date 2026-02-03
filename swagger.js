const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for Contacts project'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    schemas: {
      Contact: {
        firstName: 'Blaise',
        lastName: 'Palombo',
        email: 'blaise@email.com',
        favoriteColor: 'blue',
        birthday: '1999-01-01'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // routes entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
