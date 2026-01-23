import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { JWTPayload } from '../types';

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload as any, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn
  } as any);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload as any, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn
  } as any);
};

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, jwtConfig.accessSecret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
