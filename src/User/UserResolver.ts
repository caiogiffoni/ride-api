import { compare, hash } from "bcryptjs";
import { IsEmail } from "class-validator";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../context";
import { ReturnUser, User, UserInputData, UserWithToken } from "./User";
import { v4 as uuid } from "uuid";

@Resolver()
export class UserResolver {
  @Query((returns) => [ReturnUser])
  //  LIST USERS
  async users(@Ctx() ctx: Context): Promise<User[]> {
    return ctx.prisma.users.findMany();
  }

  @Mutation((returns) => ReturnUser)
  // CREATE USER
  async signUp(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<User> {
    // HASH PASSWORD
    const hashedPassword = await hash(data.password, 10);
    return ctx.prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
  }

  @Query((returns) => ReturnUser)
  //  LIST USER UNIQUE
  async user(@Arg("id") id: string, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation((returns) => String)
  //  DELETE USER
  async deleteUser(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<User | string> {
    try {
      await ctx.prisma.users.delete({
        where: {
          id: id,
        },
      });
      return "Deleted User";
    } catch {
      return "False";
    }
  }

  @Query((returns) => User, { nullable: true })
  async privateInfo(
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!dbToken) return null;

    const { user } = dbToken;

    return user;
  }

  @Mutation((returns) => UserWithToken)
  async login(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<{ user: User; token: string } | null> {
    const user = await ctx.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) return null;

    const validation = await compare(data.password, user.password);

    if (!validation) return null;

    const tokenCode = uuid();

    const token = await ctx.prisma.tokens.create({
      data: { token: tokenCode, user: { connect: { id: user.id } } },
    });

    return { user, token: token.token };
  }
}
