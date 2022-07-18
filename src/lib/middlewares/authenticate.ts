import { NextFunction, Request, Response } from "express";
import BusinessError from "../common/BussinessError";
import PlanningConstans from "../common/Constans";
import jwt from "jsonwebtoken";
import { UserClaims } from "../common/UserClaims";
import { container } from "tsyringe";

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.toLocaleLowerCase().startsWith("bearer") ||
      !authHeader.split(" ")[1]
    ) {
      const errorMessage = PlanningConstans.MESSAGE_NO_TOKEN_PROVIDED;
      throw new BusinessError(errorMessage, 401);
    }

    try {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.body.user = payload;

      const claims = container.resolve(UserClaims);
      claims.payload = payload;

      console.log("user paylaod =>", payload);

      next();
    } catch (error) {
      const errorMessage = PlanningConstans.MESSAGE_INVALID_TOKEN;
      throw new BusinessError(errorMessage, 401);
    }
  } catch (error) {
    next(error);
  }
}
