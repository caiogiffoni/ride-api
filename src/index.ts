import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { UserResolver } from "./UserResolver";
import { buildSchema } from "type-graphql";

const app = async () => {
  const schema = await buildSchema({ resolvers: [UserResolver] });

  new ApolloServer({ schema, context: context }).listen({ port: 3000 }, () =>
    console.log(`Server is running on port 🚀`)
  );
};

app();
