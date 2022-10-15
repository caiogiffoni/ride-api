import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./User/UserResolver";
import { buildSchema } from "type-graphql";
import { RidesResolver } from "./Rides/RidesResolver";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  token: String | undefined;
}

const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RidesResolver],
  });

  new ApolloServer({
    schema,
    context: ({ req }) => {
      return { prisma, req, token: req?.headers?.authorization };
    },
  }).listen({ port: 3000 }, () => console.log(`Server is running 🚀`));
};

app();
