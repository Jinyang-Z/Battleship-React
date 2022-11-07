import { jwtPrivateKey } from './config';
import jwt from 'jsonwebtoken';
import AuthenticationException from './exceptions/AuthenticationException';

export function generateTokenJwt(data: object, expire?: number): string {
  if (expire) {
    return jwt.sign(data, jwtPrivateKey, { expiresIn: expire });
  }
  return jwt.sign(data, jwtPrivateKey);
}

export function getDataTokenJwt<T>(token: string): T {
  try {
    return jwt.verify(token, jwtPrivateKey) as T;
  } catch (error) {
    console.error(`Error in getDataTokenJwt: Error: ${error as string}`);
    throw new AuthenticationException(500, `Error in getDataTokenJwt: Error: ${error as string}`);
  }
}