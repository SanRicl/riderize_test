import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { User } from '../schemas/User';
import { Context } from '../context';
import { hash } from 'bcryptjs';
import { Ride } from '../schemas/Ride';
import { Subscription } from '../schemas/Subscription';
import { UserInputData } from './InputTypes/InputTypes';

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: Context,
  ): Promise<User> {
    const hashedPassword = await hash(data.password, 10);

    const newUser = await ctx.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    return newUser;
  }

  @Authorized()
  @Query(() => User)
  async getRideCreatedByUser(
    @Ctx() ctx: Context,
    @Arg('id') id: number,
  ): Promise<User | null> {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error('User does not exists');
    return user;
  }

  @FieldResolver(() => [Ride])
  async ride(@Root() user: User, @Ctx() ctx: Context): Promise<Ride[]> {
    const rides = await ctx.prisma.ride.findMany({
      where: { userId: user.id },
    });

    return rides;
  }

  @Authorized()
  @Query(() => User)
  async getParticipatedRidesByUser(
    @Ctx() ctx: Context,
    @Arg('id') id: number,
  ): Promise<User> {
    const user = await ctx.prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User does not exists');
    return user;
  }

  @FieldResolver(() => [Subscription])
  async subscription(
    @Root() subscription: Subscription,
    @Ctx() ctx: Context,
  ): Promise<Subscription[]> {
    const subscriptions = await ctx.prisma.subscription.findMany({
      where: { user_id: subscription.id },
    });

    return subscriptions;
  }
}
