import type { Request, Response, NextFunction } from "express";
import { _db } from "../../utils/_db";
import { Password } from "../../utils/password";
import { Token } from "../../utils/token";
import type { AuthenticatedRequest, User } from "../../utils/types";
import transporter from "../../utils/nodemailer/transporter";
import {
  NotFoundError,
  ClientError,
  ConflictError,
  ForbiddenError,
} from "../../exceptions";

/**
 * Handles user login.
 * @function loginFn
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction middleware
 * @returns Express Response
 */
export const loginFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { email, password } = req.body as Omit<User, "id" | "name">;

    const user = await _db.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new ClientError("Email salah");
    }

    if (!(await Password.verifyAsync(password, user.passwordHash))) {
      throw new ClientError("Password salah");
    }

    const { token, expire } = Token.refresh();

    await _db.users.update({
      where: { id: user.id },
      data: {
        refreshToken: token,
        refreshTokenExpire: expire,
      },
    });

    return res
      .cookie("refreshToken", token, {
        httpOnly: true,
        expires: expire,
      })
      .status(200)
      .json({ accessToken: Token.jwt({ userId: user.id }) });
  } catch (error) {
    next(error);
  }
};

/**
 * Hanldes user registration.
 * @function signupFn
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction middleware
 * @returns Express Response
 */
export const signupFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name, email, password } = req.body as Omit<User, "id">;

    const user = await _db.users.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new ConflictError("Email sudah terdaftar");
    }

    const { token, expire } = Token.refresh();

    const newUser = await _db.users.create({
      data: {
        name,
        email,
        passwordHash: await Password.hashAsync(password),
        refreshToken: token,
        refreshTokenExpire: expire,
        updatedAt: null,
      },
    });

    return res
      .cookie("refreshToken", token, {
        httpOnly: true,
        expires: expire,
      })
      .status(201)
      .json({
        accessToken: Token.jwt({ userId: newUser.id }),
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles refreshing the access token using the refresh token.
 * @function refreshTokenFn
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction middleware
 * @returns Express Response
 */
export const refreshTokenFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = req.query as { accessToken: string };

    const { userId } = Token.claim(accessToken, process.env.ACCESS_SECRET, {
      ignoreExpiration: true,
    }) as { userId: string };

    const user = await _db.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenError("User tidak ditemukan");
    }

    if (refreshToken && refreshToken !== user.refreshToken) {
      throw new ForbiddenError("Refresh token tidak valid");
    }

    if (
      user.refreshTokenExpire &&
      user.refreshTokenExpire.getTime() > Date.now()
    ) {
      throw new ForbiddenError("Refresh token kadaluarsa");
    }

    const { token, expire } = Token.refresh();

    await _db.users.update({
      where: { id: user.id },
      data: {
        refreshToken: token,
        refreshTokenExpire: expire,
        updatedAt: new Date(),
      },
    });

    return res
      .cookie("refreshToken", token, {
        httpOnly: true,
        expires: expire,
      })
      .status(200)
      .json({ accessToken: Token.jwt({ userId: user.id }) });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles logout user.
 * @function logoutFn
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express NextFunction middleware
 * @returns {Promise<Response>} Express Response
 */
export const logoutFn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { userId } = req.decodeToken as { userId: string };

    const user = await _db.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError("User tidak ditemukan");
    }

    await _db.users.update({
      where: { id: user.id },
      data: {
        refreshToken: null,
        refreshTokenExpire: null,
        updatedAt: new Date(),
      },
    });

    return res.clearCookie("refreshToken").status(204);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles forgot password.
 * @function forgotPasswordFn
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express NextFunction middleware
 * @returns {Promise<Response>} Express Response
 */
export const forgotPasswordFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { email } = req.query as { email: string };

    const user = await _db.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundError("Email belum terdaftar");
    }

    const token = Token.jwt({ userId: user.id }, process.env.RESET_PW_SECRET, {
      expiresIn: process.env.RESET_PW_EXPIRE,
    });

    await transporter.sendMail({
      from: "Finthest",
      to: user.email,
      subject: "Forgot Passsword Request",
      html: `Link forgot password: <a href="${process.env.ORIGIN}/forgot-password/${token}">Klik disini</a>`,
    });

    return res
      .status(200)
      .json({ message: "Berhasil mengirim link forgot password ke email" });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles reset password
 * @function resetPasswordFn
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express NextFunction middleware
 * @returns {Promise<Response>} Express Response
 */
export const resetPasswordFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    try {
      const { token, newPassword } = req.body;

      const { userId } = Token.claim(token, process.env.RESET_PW_SECRET) as {
        userId: string;
      };

      const user = await _db.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new ClientError("Token tidak valid");
      }

      if (await Password.verifyAsync(newPassword, user.passwordHash)) {
        throw new ConflictError(
          "Password baru tidak boleh sama dengan password lama"
        );
      }

      await _db.users.update({
        where: { id: user.id },
        data: {
          passwordHash: await Password.hashAsync(newPassword),
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({ message: "Berhasil reset password" });
    } catch (error) {
      throw new Error("invalid_reset_password_token");
    }
  } catch (error) {
    next(error);
  }
};
