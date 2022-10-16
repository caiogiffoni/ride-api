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
import { Registration } from "./Registration";

@Resolver()
export class RegistrationResolver {
  @UseMiddleware(isAuth)
  @Query((returns) => [Registration])
  //  LIST REGISTRATION
  async registrations(@Ctx() ctx: Context): Promise<Registration[]> {
    return ctx.prisma.registratration.findMany();
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => Registration)
  // CREATE REGISTRATION
  async createRegistration(
    @Arg("rideId") rideId: string,
    @Ctx() ctx: Context
  ): Promise<Registration> {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id: ctx.idUser,
      },
    });
    if (!user) {
      throw new Error("User not Found");
    }
    return await ctx.prisma.registratration.create({
      data: {
        rideId,
        userId: user.id,
        subscription_date: new Date(Date.now()),
      },
    });
  }

  @UseMiddleware(isAuth)
  @Query((returns) => Registration)
  //  LIST REGISTRATION UNIQUE
  async registration(
    @Arg("registrationId") registrationId: string,
    @Ctx() ctx: Context
  ): Promise<Registration | string> {
    const registration = await ctx.prisma.registratration.findUnique({
      where: {
        id: registrationId,
      },
    });
    if (!registration) throw new Error("Registration not Found");
    return registration;
  }

  // @UseMiddleware(isAuth)
  // @Query((returns) => [Rides])
  // //  LIST RIDES BY USER
  // async userRides(@Ctx() ctx: Context): Promise<Rides[]> {
  //   const rides = await ctx.prisma.rides.findMany({
  //     where: {
  //       userId: ctx.idUser,
  //     },
  //   });
  //   return rides;
  // }

  @UseMiddleware(isAuth)
  @Mutation((returns) => String)
  //  DELETE REGISTRATION
  async deleteRegistratioin(
    @Arg("registrationId") registrationId: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const registration = await ctx.prisma.registratration.findUnique({
      where: {
        id: registrationId,
      },
    });
    if (!registration) throw new Error("Registration not Found");

    await ctx.prisma.rides.delete({ where: { id: registration.id } });
    return "Deleted Registration";
  }
}
