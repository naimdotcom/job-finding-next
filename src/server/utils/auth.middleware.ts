import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = process.env.JWT_SECRET;
const key = new TextEncoder().encode(SECRET_KEY);

export async function generateToken(payload: object) {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("10d")
    .sign(key);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {});
    return payload;
  } catch (error) {
    console.log("error while verifying token", error);
    return null;
  }
}
