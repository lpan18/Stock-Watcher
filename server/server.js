require('dotenv').config()
const express = require('express'),
  path = require('path'),
  config = require('config'),
  expressJwt = require('express-jwt'),
  voyagerMiddleware = require('graphql-voyager/middleware').express,
  { ApolloServer } = require('apollo-server-express'),
  { version } = require('./package.json'),
  contextHelper = require('./helpers/context_helper'),
  executableSchema = require("./schema"),
  R = require('ramda');

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

const authentication = expressJwt({
  credentialsRequired: false,
  secret: config.jwt_secret,
  requestProperty: 'context.user',
  getToken: (req) => {
    let authorizations = (req.headers && req.headers.authorization || '').split(' ');
    if (authorizations.length === 2 && authorizations[0] === 'Bearer') {
      console.log("token" + authorizations[1])
      return authorizations[1];
    }
  }
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.use('/graphql', authentication);
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
