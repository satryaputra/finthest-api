import jwt from "jsonwebtoken";
import crypto from "crypto";

export class Token {
  static jwt = (payload: string | object | Buffer, secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET, options?: jwt.SignOptions): string => {
    return jwt.sign(payload, secretOrPrivateKey, {
      ...options,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
  };

  static claim = (
    token: string,
    secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET,
    options?: jwt.VerifyOptions & {
      complete?: false;
    }
  ): string | jwt.JwtPayload => {
    return jwt.verify(token, secretOrPrivateKey, options);
  };

  static refresh = (): { token: string; expire: Date } => {
    const token = crypto.randomBytes(32).toString("hex");
    const expire = new Date();
    expire.setDate(expire.getDate() + 7); // 7 days

    return {
      token,
      expire,
    };
  };
}
