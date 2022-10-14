import { compare, hash } from "bcryptjs";
import { IsEmail } from "class-validator";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { Rides } from "./Rides";

@Resolver()
export class RidesResolver {
  @Query((returns) => [Rides])
  //  LIST USERS
  async rides(@Ctx() ctx: Context): Promise<Rides[]> {
    return ctx.prisma.rides.findMany();
  }

  // @Mutation((returns) => ReturnUser)
  // // CREATE USER
  // async signUp(
  //   @Arg("data") data: UserInputData,
  //   @Ctx() ctx: Context
  // ): Promise<User> {
  //   // HASH PASSWORD
  //   const hashedPassword = await hash(data.password, 10);
  //   return ctx.prisma.users.create({
  //     data: { ...data, password: hashedPassword },
  //   });
  // }

  // @Query((returns) => ReturnUser)
  // //  LIST USER UNIQUE
  // async user(@Arg("id") id: string, @Ctx() ctx: Context): Promise<User | null> {
  //   return ctx.prisma.users.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // @Mutation((returns) => String)
  // //  DELETE USER
  // async deleteUser(
  //   @Arg("id") id: string,
  //   @Ctx() ctx: Context
  // ): Promise<User | string> {
  //   try {
  //     await ctx.prisma.users.delete({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     return "Deleted User";
  //   } catch {
  //     return "False";
  //   }
  // }
}
