import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { IsEmail } from 'class-validator';
import { User } from '../schemas/User';
import { Context } from '../context';
import { hash } from 'bcryptjs';
import { Ride } from '../schemas/Ride';
import { Subscription } from '../schemas/Subscription';

@InputType()
export class UserInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: Context,
  ): Promise<User> {
    const hashedPassword = await hash(data.password, 10);

    return await ctx.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
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
  @Query(() => [User])
  async getParticipatedRidesByUser(
    @Ctx() ctx: Context,
    @Arg('id') id: number,
  ): Promise<User[] | null> {
    const user = await ctx.prisma.user.findMany({
      where: { id },
    });
    return user;
  }

  @FieldResolver(() => [Subscription])
  async subscription(
    @Root() subscription: Subscription,
    @Ctx() ctx: Context,
  ): Promise<Subscription[]> {
    const rides = await ctx.prisma.subscription.findMany({
      where: { ride_id: subscription.id },
    });
    return rides;
  }
}
