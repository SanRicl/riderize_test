import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { compare } from 'bcryptjs';
import Auth from '../schemas/Auth';
import AuthConfig from '../config/auth';
import { sign } from 'jsonwebtoken';
import { UserInputData } from './UserResolver';
import { Context } from '../context';
import { User } from '../schemas/User';

@Resolver(Auth)
export class SessionResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async privateInfo(
    @Arg('id') id: number,
    @Ctx() ctx: Context,
  ): Promise<User | null> {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;

    return user;
  }

  @Mutation(() => Auth)
  async signIn(@Arg('data') data: UserInputData, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error('Incorrect email/password combination');

    const matchedPassword = await compare(data.password, user.password);

    if (!matchedPassword) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: `"${user.id}`,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default SessionResolver;
