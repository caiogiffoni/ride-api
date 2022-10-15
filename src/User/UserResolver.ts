import { compare, hash } from "bcryptjs";
import { IsEmail } from "class-validator";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { ResponseToken, ReturnUser, User, UserInputData } from "./User";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Context } from "..";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query((returns) => [ReturnUser])
  //  LIST USERS
  async users(@Ctx() ctx: Context): Promise<User[]> {
    return await ctx.prisma.users.findMany();
  }

  @Mutation((returns) => ReturnUser)
  // CREATE USER
  async signUp(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<User> {
    // HASH PASSWORD
    const hashedPassword = await hash(data.password, 10);
    return await ctx.prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
  }

  @UseMiddleware(isAuth)
  @Query((returns) => ReturnUser)
  //  LIST USER UNIQUE
  async user(@Arg("id") id: string, @Ctx() ctx: any): Promise<User | null> {
    const user = await ctx.prisma.users.delete({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error("User not Found");

    return user;
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => String)
  //  DELETE USER
  async deleteUser(@Arg("id") id: string, @Ctx() ctx: any): Promise<string> {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error("User not Found");

    await ctx.prisma.users.delete({ where: { id: user.id } });

    return "Deleted User";
  }

  @Query((returns) => ResponseToken)
  async login(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: any
  ): Promise<ResponseToken> {
    const user = await ctx.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error("Invalid Credentials");

    const validation = await compare(data.password, user.password);

    if (!validation) throw new Error("Invalid Credentials");

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return { token: token };
  }
}
