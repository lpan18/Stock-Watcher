import express from 'express'
import path from 'path';
import config  from 'config'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { ApolloServer } from 'apollo-server-express'

import { version } from '../package.json'
import contextHelper from './helpers/context_helper'
import winston from 'winston'
import executableSchema from "./schema"

const bodyParser = require('body-parser'),
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
  schema:executableSchema,
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
  res.sendFile(path.join('__dirname' + '/index.html'));
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || config.port;

app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server (${version}) ready at http://localhost:${PORT}${server.graphqlPath}`)
);
