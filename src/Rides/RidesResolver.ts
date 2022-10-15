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

  @UseMiddleware(isAuth)
  @Query((returns) => Rides)
  //  LIST RIDE UNIQUE
  async ride(
    @Arg("rideId") rideId: string,
    @Ctx() ctx: Context
  ): Promise<Rides | string> {
    const ride = await ctx.prisma.rides.findUnique({
      where: {
        id: rideId,
      },
    });
    if (!ride) {
      throw new Error("Ride not Found");
    }
    return ride;
  }

  @UseMiddleware(isAuth)
  @Query((returns) => [Rides])
  //  LIST RIDES BY USER
  async userRides(@Ctx() ctx: Context): Promise<Rides[]> {
    const rides = await ctx.prisma.rides.findMany({
      where: {
        userId: ctx.idUser,
      },
    });
    return rides;
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => String)
  //  DELETE RIDE
  async deleteRide(
    @Arg("rideId") rideId: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const ride = await ctx.prisma.rides.findUnique({
      where: {
        id: rideId,
      },
    });
    if (!ride) {
      throw new Error("Ride not Found");
    }

    await ctx.prisma.rides.delete({ where: { id: ride.id } });

    return "Deleted Ride";
  }
}
