import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  const verified = await bcrypt.compare(password, hashedPassword);
  console.log("login password verified?: ", verified);
  return verified;
};
export { encryptPassword, verifyPassword };
