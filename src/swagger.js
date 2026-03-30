const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: 'lms',            // by default: '1.0.0'
    title: '',              // by default: 'REST API'
    description: ''         // by default: ''
  },
  host: 'localhost:2022',                 // by default: 'localhost:3000'
  basePath: '/api/v1',             // by default: '/'
  schemes: [],              // by default: ['http']
  consumes: ['multipart/form-data'],             // by default: ['application/json']
  produces: [],             // by default: ['application/json']
  tags: [                   // by default: empty Array
    {
      name: 'Category',             // Tag name
      description: 'Category'       // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {}           // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./routes/api/v1/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);