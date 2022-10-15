import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import SessionResolver from '../resolvers/SessionResolver';
import Auth from './Auth';
import { User } from './User';

import AuthenticationAssurance from '../middlewares/AuthenticationAssurance';

const schema = buildSchema({
  resolvers: [UserResolver, SessionResolver, User, Auth],
  authChecker: AuthenticationAssurance,
});

export default schema;
