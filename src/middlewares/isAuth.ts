import { MiddlewareFn, NextFn } from "type-graphql";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Context } from "..";

export const isAuth: MiddlewareFn<Context> = async (
  { context },
  next: NextFn
): Promise<any> => {
  const { token } = context;
  if (!token) {
    throw new Error("No token found");
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(
    splitToken,
    process.env.SECRET_KEY as string,
    async (error: any, decoded: any) => {
      if (error) {
        throw new Error("Invalid token");
      }

      context.idUser = decoded.id;
    }
  );
  return next();
};
