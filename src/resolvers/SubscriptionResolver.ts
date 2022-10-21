import {
  Arg,
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
import { clearCache, getRedis, setRedis } from '../config/redis';

interface IRidesCached {
  id: number;
  name: string;
  start_date: string;
  start_date_registration: string;
  end_date_registration: string;
  additional_information?: string;
  start_place: string;
  participants_limit?: number;
  userId?: number;
}

@Resolver(Subscription)
export class SubscriptionResolver {
  @Mutation(() => Subscription)
  async createSubscription(
    @Arg('data') data: SubscriptionInputData,
    @Ctx() ctx: Context,
  ): Promise<Subscription> {
    const user = await ctx.prisma.user.findFirst({
      where: { id: data.user_id },
    });

    if (!user) throw new Error('User does not exists.');

    const ride = await ctx.prisma.ride.findFirst({
      where: { id: data.ride_id },
    });

    if (!ride) throw new Error('Ride does not exists.');

    const alreadySubscribed = await ctx.prisma.subscription.findFirst({
      where: {
        ride_id: data.ride_id,
        AND: {
          user_id: data.user_id,
        },
      },
    });

    if (alreadySubscribed) {
      throw new Error('You have already subscribed to this ride.');
    }

    const subscriptionLimitDate = await ctx.prisma.ride.findFirst({
      where: {
        end_date_registration: {
          lt: data.subscription_date,
        },
      },
    });
    if (subscriptionLimitDate) throw new Error('You cant register anymore.');

    clearCache();
    return await ctx.prisma.subscription.create({ data });
  }

  @FieldResolver(() => [Ride])
  async rides(
    @Root() subscription: Subscription,
    @Ctx() ctx: Context,
  ): Promise<Ride[]> {
    const cache = await getRedis('rides');

    if (!cache) {
      const rides = await ctx.prisma.ride.findMany({
        where: { id: subscription.ride_id },
      });
      setRedis('rides', JSON.stringify(rides));

      return rides;
    }

    const parsedCacheData = JSON.parse(cache as string);
    const rides = parsedCacheData.map((y: IRidesCached) => {
      return {
        id: y.id,
        name: y.name,
        start_date: new Date(Date.parse(y.start_date)),
        start_date_registration: new Date(
          Date.parse(y.start_date_registration),
        ),
        end_date_registration: new Date(Date.parse(y.end_date_registration)),
        additional_information: y.additional_information,
        start_place: y.start_place,
        userId: y.userId,
      };
    });

    return rides;
  }
}
