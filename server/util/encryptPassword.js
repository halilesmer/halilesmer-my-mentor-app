import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};
export { encryptPassword };