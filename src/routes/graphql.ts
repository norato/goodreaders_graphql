import { PathParams, RequestHandler } from 'express-serve-static-core';
import * as graphqlHTTP from 'express-graphql';
import { schema } from 'schemas/schema';

export const graphqlRoute: [PathParams, RequestHandler] = [
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
];
