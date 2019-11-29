const express = require('express'),
  path = require('path'),
  config = require('config'),
  voyagerMiddleware = require('graphql-voyager/middleware').express,
  { ApolloServer } = require('apollo-server-express'),
  { version } = require('../package.json'),
  contextHelper = require('./helpers/context_helper'),
  winston = require('winston'),
  executableSchema = require("./schema"),
  bodyParser = require('body-parser'),
  R = require('ramda')


// const logger = winston.createLogger({
//   level: 'info',
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'combined.log' })
//   ]
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => {
    return R.path(['context'], req);
  },
});

const app = express();

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql?voyager' }));
app.use('/health', (req, res) => res.send('ok'));
app.use('/graphql', (req, res, next) => {
  contextHelper.createContext(req);
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });

  // res.sendFile(path.join('__dirname' + '/index.html'));
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || config.port;

app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server (${version}) ready at http://localhost:${PORT}${server.graphqlPath}`)
);
