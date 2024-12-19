import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(`Invalid token ${error}`);
  }
}
