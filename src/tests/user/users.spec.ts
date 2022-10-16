import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { RegistrationResolver } from "../../Registration/RegistrationResolver";
import { RidesResolver } from "../../Rides/RidesResolver";
import { User } from "../../User/User";
import { UserResolver } from "../../User/UserResolver";

const server = new ApolloServer({
  User,
  UserResolver,
});

const { query, mutate } = createTestClient(server);

test("find user", async () => {
  const FIND_USER = gql`
    query {
      findUser(id: "1") {
        id
        name
      }
    }
  `;

  const {
    data: { findUser },
  } = await query({ query: FIND_USER });

  expect(findUser).toEqual({ id: "1", name: "Name1" });
});

// describe("Test for POST method at /users", () => {
//   const FIND_USER = gql`
//     query {
//       findUser(id: "10") {
//         id
//         name
//       }
//     }
//   `;
//   const {
//     data: { findUser },
//   } = await query({ query: FIND_USER });

//   expect(findUser).toEqual({ id: "1", name: "Name1" });
// });

// // import { AppDataSource } from "../../data-source";
// // import { DataSource } from "typeorm";
// // import app from "../../app";
// import request from "supertest";
// import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
// import { PrismaClient } from "@prisma/client";
// import { app } from "../..";
// import { ApolloServer } from "apollo-server-express";
// import type { ListenOptions } from 'net';

// // Schema definition
// export const typeDefs = `
//   #graphql
//   type Query {
//     hello(name: String): String!
//   }
// `;

// // Resolver map
// export const resolvers = {
//   Query: {
//     hello: (_, { name }:any) => `Hello ${name}!`,
//   },
// };

// // This function will create a new server Apollo Server instance
// export const createApolloServer = async (listenOptions: ListenOptions = { port: 4000 }) => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

// describe("Test for POST method at /users", () => {

//   const queryData = {
//     query: `query sayHello($name: String) {
//       hello(name: $name)
//     }`,
//     variables: { name: 'world' },
//   };

//   let server, url;

//   beforeAll(async () => {
//     // Note we must wrap our object destructuring in parentheses because we already declared these variables
//     // We pass in the port as 0 to let the server pick its own ephemeral port for testing
//     ({ server, url } = await createApolloServer({ port: 0 }));
//   });

//   // after the tests we'll stop the server
//   afterAll(async () => {
//     await server?.stop();
//   });

//   let testUser = {
//     email: "ana@mail.com",
//     password: "Aa12345@",
//   };

//   let result = await app.server.executeOperation({
//     query: gql`
//       query {
//         test(bool: false)
//       }
//     `,
//   });

//   // beforeAll(async () => {
//   //   await AppDataSource.initialize()
//   //     .then((res) => (connection = res))
//   //     .catch((err) => {
//   //       console.error("Error during Data Source initialization", err);
//   //     });
//   // });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   test("Create an user", async () => {
//     const query = `
//     query {
//       login(data: $data) {
//         token
//       }
//     }
//     `;

//     const response = await request(app).post("").send(testUser);

//     expect("201").toEqual("201");
//     // expect(response.body.id.length).toEqual(36);
//     // expect(response.body).not.toHaveProperty("password");
//     // expect(response.body).toEqual(
//     //   expect.objectContaining({
//     //     isAdm: response.body.isAdm,
//     //     id: response.body.id,
//     //     name: testUser.name,
//     //     email: testUser.email,
//     //     created_at: response.body.created_at,
//     //     updated_at: response.body.updated_at,
//     //   })
//     // );
//   });

//   // test("Trying to create an user with the same email address", async () => {
//   //   const response = await request(app).post("/users").send(testUser);

//   //   expect(response.status).toEqual(400);
//   //   expect(response.body).toHaveProperty("message");
//   // });

//   // test("Trying to create an user without passing data", async () => {
//   //   const response = await request(app).post("/users").send();

//   //   expect(response.status).toEqual(400);
//   //   expect(response.body).toHaveProperty("error");
//   // });
// });
