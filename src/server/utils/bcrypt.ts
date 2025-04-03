import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(
    process.env.SALT ? Number(process.env.SALT) : 10
  );

  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
