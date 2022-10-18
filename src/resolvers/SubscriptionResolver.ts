import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { Subscription } from '../schemas/Subscription';
import { Context } from '../context';
import { Ride } from '../schemas/Ride';
import { SubscriptionInputData } from './InputTypes/InputTypes';

@Resolver(Subscription)
export class SubscriptionResolver {
  @Mutation(() => Subscription)
  async createSubscription(
    @Arg('data') data: SubscriptionInputData,
    @Ctx() ctx: Context,
  ): Promise<Subscription> {
    const user = ctx.prisma.user.findUnique({ where: { id: data.user_id } });

    if (!user) throw new Error('User does not exists');

    const ride = ctx.prisma.ride.findUnique({ where: { id: data.ride_id } });

    if (!ride) throw new Error('Ride does not exists');

    const subscriptionLimitDate = await ctx.prisma.ride.findFirst({
      where: {
        end_date_registration: {
          lt: data.subscription_date,
        },
      },
    });
    if (subscriptionLimitDate) throw new Error('You cant register anymore.');

    return await ctx.prisma.subscription.create({ data });
  }

  @Authorized()
  @FieldResolver(() => [Ride])
  async rides(
    @Root() subscription: Subscription,
    @Ctx() ctx: Context,
  ): Promise<Ride[]> {
    const rides = await ctx.prisma.ride.findMany({
      where: { id: subscription.user_id },
    });
    return rides;
  }
}
