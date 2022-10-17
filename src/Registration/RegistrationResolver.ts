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
import { Registration, RegistrationRide } from "./Registration";

@Resolver()
export class RegistrationResolver {
  @UseMiddleware(isAuth)
  @Query((returns) => [Registration])
  //  LIST REGISTRATION
  async registrations(@Ctx() ctx: Context): Promise<Registration[]> {
    return ctx.prisma.registrations.findMany();
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => Registration)
  // CREATE REGISTRATION
  async createRegistration(
    @Arg("rideId") rideId: string,
    @Ctx() ctx: Context
  ): Promise<Registration | string> {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id: ctx.idUser,
      },
    });
    if (!user) throw new Error("User not Found");
    const ride = await ctx.prisma.rides.findUnique({
      where: {
        id: rideId,
      },
    });
    if (!ride) throw new Error("Ride not Found");

    const today = new Date(Date.now());
    if (today > ride.end_date_registration)
    // PASSOU DA DATA DE INSCRIÇÃO
      throw new Error("Registration date overdue");

    return await ctx.prisma.registrations.create({
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
    const registration = await ctx.prisma.registrations.findUnique({
      where: {
        id: registrationId,
      },
    });
    if (!registration) throw new Error("Registration not Found");
    return registration;
  }

  @UseMiddleware(isAuth)
  @Query((returns) => [RegistrationRide])
  //  LIST USER REGISTRATIONS RIDE
  async myRegistration(@Ctx() ctx: Context): Promise<RegistrationRide[]> {
    const registrations = await ctx.prisma.registrations.findMany({
      where: {
        userId: ctx.idUser,
      },
      include: {
        ride: true,
      },
    });
    return registrations;
  }

  @UseMiddleware(isAuth)
  @Mutation((returns) => String)
  //  DELETE REGISTRATION
  async deleteRegistration(
    @Arg("registrationId") registrationId: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const registration = await ctx.prisma.registrations.findUnique({
      where: {
        id: registrationId,
      },
    });
    if (!registration) throw new Error("Registration not Found");

    await ctx.prisma.registrations.delete({ where: { id: registration.id } });
    return "Deleted Registration";
  }
}
