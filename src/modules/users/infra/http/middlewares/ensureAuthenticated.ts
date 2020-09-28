import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  expo: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  //posição 1 do array = type -> Bearer e segunda o próprio -> token;
  //Omitir o parâmetro entende-se que o mesmo não será utilizado pelo dev;
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    //Forçar o formato de token para a variável decoded, que pode ser string ou objetct;
    const { sub } = decoded as TokenPayload;

    //Sobrescrever tipos de uma lib para que user seja válido dentro do request;
    //Que na verdade é só um anexo do que será colocado nela a partir do arquivo express.d.ts;
    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
}
