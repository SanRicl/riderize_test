import 'reflect-metadata';
import 'dotenv/config';
// import morgan from 'morgan';
import { ApolloServer } from 'apollo-server';

import { context } from './context';

import schemas from './schemas';

const app = async () => {
  const schema = await schemas;
  const server = new ApolloServer({
    schema,
    context,
  });
  server.listen({ port: 4000 }, () =>
    console.log('Server is running on port 4000'),
  );
};

app();
