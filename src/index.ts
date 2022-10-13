import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "graphql";
import { context } from "./context";

const app = async () => {
  const schema = await buildSchema({ resolvers: [] });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }),
    () => console.log(`Server is running on port 🚀`);
};

app();
