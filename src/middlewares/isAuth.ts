import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const isAuth: MiddlewareFn = async ({ context }, next) => {
  // const token = context.token
  console.log(context);

  // if (!token) {
  //   throw new AppError("No token found", 404);
  // }

  // const splitToken = token.split(" ");

  // jwt.verify(
  //   splitToken[1],
  //   process.env.SECRET_KEY as string,
  //   (error: any, decoded: any) => {
  //     if (error) {
  //       throw new AppError("Invalid token", 401);
  //     }

  //     req.user = {
  //       id: decoded.id,
  //       isAdm: decoded.adm,
  //     };

  //     next();
  //   }
  // );
  await next();
};
