import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { compare } from 'bcryptjs';
import Auth from '../schemas/Auth';
import AuthConfig from '../config/auth';
import { sign } from 'jsonwebtoken';
import { UserInputData } from './UserResolver';
import { Context } from '../context';
import { User } from '../schemas/User';

@Resolver(Auth)
class SessionResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async privateInfo(
    @Arg('token') token: string,
    @Ctx() ctx: Context,
  ): Promise<User | null> {
    const dbToken = await ctx.prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!dbToken) return null;

    const { user } = dbToken;

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

    const tokenCode = sign({}, secret, {
      subject: `"${user.id}`,
      expiresIn,
    });

    const token = await ctx.prisma.token.create({
      data: { token: tokenCode, user: { connect: { id: user.id } } },
    });

    return {
      token: token.token,
      user,
    };
  }
}

export default SessionResolver;
