/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Subscription } from '../schemas/Subscription';
import { Context } from '../context';

@InputType()
class SubscriptionInputData {
  @Field(type => Number, { nullable: false })
  ride_id: number;

  @Field(type => Number, { nullable: false })
  user_id: number;
}

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

    return await ctx.prisma.subscription.create({ data });
  }
}
