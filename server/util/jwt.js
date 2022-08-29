import * as dotenv from "dotenv";

import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const issueToken = (userId, user_type) => {
  const payload = {
    sub: userId,
    role: user_type,
  };
  const signOptions = {
    expiresIn: "5 d",
  };
  const jwt = jsonwebtoken.sign(
    payload,
    process.env.SECRET_OR_KEY,
    signOptions
  );
  return jwt;
};
export { issueToken };



