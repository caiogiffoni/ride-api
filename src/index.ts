import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./User/UserResolver";
import { buildSchema } from "type-graphql";
import { RidesResolver } from "./Rides/RidesResolver";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { RegistrationResolver } from "./Registration/RegistrationResolver";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  token: string | undefined;
  idUser: string;
}

const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RidesResolver, RegistrationResolver],
  });

  new ApolloServer({
    schema,
    context: ({ req }) => {
      return { prisma, req, token: req?.headers?.authorization, idUser: "" };
    },
  }).listen({ port: 3000 }, () => console.log(`Server is running 🚀`));
};

app();
