import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import LikesModel from "../models/LikesModel.js";
import { issueToken } from "../util/jwt.js";




const getLikes = (req, res) => {
  console.log("req, res in getProfile: ", req, res);
  console.log("req.user", req.user);

  res.status(200).json({
    id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    birthday: req.user.birthday,
    gender: req.user.gender,
    language: req.user.language,
    experience: req.user.experience,
    website: req.user.website,
    fee: req.user.fee,
    couching_medium: req.user.couching_medium,
    skills: req.user.skills,
    password: "",
    user_type: req.user.user_type,
    register_Date: req.user.register_Date,
    avatar_picture: req.user?.avatar_picture,
  });
};

export {getLikes};