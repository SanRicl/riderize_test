import 'reflect-metadata';
import 'dotenv/config';
import morgan from 'morgan';

import express, { NextFunction, Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.listen(3000, () => {
  console.log('App running on port: 3000');
});
