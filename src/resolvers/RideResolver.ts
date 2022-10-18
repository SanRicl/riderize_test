import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { Ride } from '../schemas/Ride';
import { Context } from '../context';
import { User } from '../schemas/User';
import { RideInputData } from './InputTypes/InputTypes';

@Resolver(Ride)
export class RideResolver {
  @Mutation(() => Ride)
  async createRide(
    @Arg('data') data: RideInputData,
    @Ctx() ctx: Context,
  ): Promise<Ride> {
    return await ctx.prisma.ride.create({
      data,
    });
  }

  @FieldResolver(() => User)
  async user(@Root() ride: Ride, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ride.userId },
    });
    return user;
  }
}
