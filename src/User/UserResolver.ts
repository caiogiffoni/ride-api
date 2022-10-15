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
    // console.log("ctx");
    // console.log(ctx);
    return ctx.prisma.users.findMany();
  }

  @Mutation((returns) => ReturnUser)
  // CREATE USER
  async signUp(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: any
  ): Promise<User> {
    // HASH PASSWORD
    const hashedPassword = await hash(data.password, 10);
    return ctx.prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
  }

  @Query((returns) => ReturnUser)
  //  LIST USER UNIQUE
  async user(@Arg("id") id: string, @Ctx() ctx: any): Promise<User | null> {
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
    @Ctx() ctx: any
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

  @Mutation((returns) => ResponseToken)
  async login(
    @Arg("data") data: UserInputData,
    @Ctx() ctx: any
  ): Promise<ResponseToken | null> {
    const user = await ctx.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) return null;

    const validation = await compare(data.password, user.password);

    if (!validation) return null;

    const token = jwt.sign(
      {
        id: user.id, //preciso inserir dentro do token tanto o id do user
      },
      process.env.SECRET_KEY as string, //preciso desse alias pq caso contrário gera error.
      {
        expiresIn: "24h",
      }
    );

    return { token: token };
  }
  // @Query((returns) => User, { nullable: true })
  // async privateInfo(
  //   @Arg("token") token: string,
  //   @Ctx() ctx: Context
  // ): Promise<User | null> {
  //   const dbToken = await ctx.prisma.tokens.findUnique({
  //     where: { token },
  //     include: { user: true },
  //   });
  //   if (!dbToken) return null;

  //   const { user } = dbToken;

  //   return user;
  // }
}
