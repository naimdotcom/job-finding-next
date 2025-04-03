import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "SldUX1NFQ1JFVA";
const EXPIRE = process.env.JWT_EXPIRE_IN || "5d";

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRE as string,
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
