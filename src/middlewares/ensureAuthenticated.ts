import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // ex: Bearer sdfkajsdfkjasdfçlkasjdfklçsdj
  // [0] = Bearer
  // [1] = sdfkajsdfkjasdfçlkasjdfklçsdj
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "e7aa4e8d20d397bfeaa84b3b523a6da7"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
