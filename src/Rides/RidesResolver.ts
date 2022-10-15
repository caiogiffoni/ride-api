import { IsEmail } from "class-validator";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "..";
import { isAuth } from "../middlewares/isAuth";
import { RideInputData, Rides } from "./Rides";

@Resolver()
export class RidesResolver {
  @UseMiddleware(isAuth)
  @Query((returns) => [Rides])
  //  LIST RIDES
  async rides(@Ctx() ctx: any): Promise<Rides[]> {
    return ctx.prisma.rides.findMany();
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => Rides)
  // CREATE RIDES
  async createRide(
    @Arg("data") data: RideInputData,
    @Ctx() ctx: Context
  ): Promise<Rides> {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id: ctx.idUser,
      },
    });
    if (!user) {
      throw new Error("User not Found");
    }
    console.log(user);
    return await ctx.prisma.rides.create({
      data: { ...data, userId: user.id },
    });
  }

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
