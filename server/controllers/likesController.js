import MenteesModel from "../models/menteesModel.js";
import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import { issueToken } from "../util/jwt.js";


const postLikes = async (req, res) => {
  // console.log("edit Mentor: req,res: ", req, res);
  console.log("request body-postLikes:>> ", req.body);
  console.log("req.user-postLikes", req.body.likes);
  // const filter = { email: "test@mail.de" };
//   const update = {
//     likes: '11111',
//     // likes: req.body.likes,
//   };

  try {
    // const updateMentee = await mongoose.MenteeModel.findOneAndUpdate(id_mentee, )  delete this
    console.log("req.user.id-postLikes: ", req.user.id);

    const doc = await MenteesModel.findById(req.user.id);
    doc.likes = req.body.likes;
    await doc.save();

    // const doc = await MenteesModel.findByIdAndUpdate(req.user.id, update, {
    //   new: true,
    // });


    // const doc = await MenteesModel.updateOne(
    //   { _id: req.user.id },
    //   { likes: req.user.likes }
    // );

   
    console.log("doc-postLikes: ", doc);
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