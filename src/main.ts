import * as express from 'express';
import { graphqlRoute } from 'routes/graphql';

const app = express();

app.use(...graphqlRoute);

app.listen(3000);
console.log('Listening ...');
