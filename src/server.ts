import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

import { context } from './context';

import schemas from './schemas';

const APP_PORT = 8000;

const app = async () => {
  const schema = await schemas;
  const server = new ApolloServer({
    schema,
    context,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  server.listen({ port: APP_PORT });
};

app();
