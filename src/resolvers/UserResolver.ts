import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { User } from '../schemas/User';
import { Context } from '../context';
import { hash } from 'bcryptjs';

//when make a request, the fields need to have these informations bollow. It is alike an Interface on typescript.
@InputType()
export class UserInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@Resolver()
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
}
