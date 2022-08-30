import MenteesModel from "../models/menteesModel.js";
import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import { issueToken } from "../util/jwt.js";

const postLikes = async (req, res) => {
  console.log("res: postLikes ", res);
  console.log("request body- postLikes:>> ", req.body);
  console.log("req.body.likes- postLikes", req.body.likes);

  //   try {
  //       console.log("req.user.id- postLikes: ", req.user.id);

  //       const mentee = await MenteesModel.findById(req.user.id);

  //       //   ----- Mentee update -------- starts ---
  //     if(user_type === 'mentee'){
  // if (mentee.likes.includes(req.body.mentorId)) {
  //       mentee.likes.pull(req.body.mentorId);
  //     } else {
  //       mentee.likes.push(req.body.mentorId);
  //     }
  //     await mentee.save();
  //     //   ----- Mentee update -------- ends ---
  //     }

  //   ----- Mentee update -------- starts ---
  try {
    console.log("req.user.id- postLikes: ", req.user.id);

    const mentee = await MenteesModel.findById(req.user.id);
    const mentor = await MenteesModel.findById(req.user.id);
    if (mentee.user_type === "mentee") {
      if (mentee.likes.includes(req.body.mentorId)) {
        mentee.likes.pull(req.body.mentorId);
      } else {
        mentee.likes.push(req.body.mentorId);
      }
      await mentee.save();
      //   ----- Mentee update -------- ends ---
    } else {
      //   ----- Mentor update -------- starts ---
      if (mentor.likes.includes(req.body.mentorId)) {
        mentor.likes.pull(req.body.mentorId);
      } else {
        mentor.likes.push(req.body.mentorId);
      }
      await mentor.save();

      //   ----- Mentor update -------- ends ---
    }
    console.log("mentee-postLikes: ", mentee);
    res.status(200).json({
      msg: "Mentee like update successfull",
    });
  } catch (error) {
    console.log("error update mentee like: ", error);
    res.status(400).json({
      msg: "Can not update mentee likes!",
    });
  }
};

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

export { getLikes, postLikes };
