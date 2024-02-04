import bcrypt from "bcrypt";

export class Password {
  static hashAsync = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12);
  };

  static verifyAsync = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  };
}
