import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { UserResolver } from "./User/UserResolver";
import { buildSchema } from "type-graphql";
import { RidesResolver } from "./Rides/RidesResolver";

const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RidesResolver],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 3000 }, () =>
    console.log(`Server is running 🚀`)
  );
};

app();
