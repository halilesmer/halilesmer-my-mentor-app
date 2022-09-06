import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import MenteesModel from "../models/menteesModel.js";
import { v2 as cloudinary } from "cloudinary";
import { issueToken } from "../util/jwt.js";

// import { issueToken } from "../util/jwt.js";
// import mongoose from "mongoose";
// import signInModel from "../models/signInModel.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-it-mentee/mentees",
    });
    console.log("uploadResult", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    res.status(200).json({
      message: "Image upload succesfull",
      imageUrl: uploadResult.url,
    });
    console.log("Image upload succesfull");
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

const signUp = async (req, res) => {
  console.log("req.body-signUp: ", req.body);

  try {
    const existingUser = await MenteesModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user allready exists" });
      console.log("user allready exists: ");
    } else {
      console.log("user doesn't exist... ");
      //use here express validator

      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new MenteesModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        language: req.body.language,
        couching_medium: req.body.couching_medium,
        email: req.body.email,
        skills: req.body.skills,
        password: hashedPassword,
        avatar_picture: req.body.avatar_picture,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            birthday: savedUser.birthday,
            gender: savedUser.gender,
            language: savedUser.language,
            website: savedUser.website,
            couching_medium: savedUser.couching_medium,
            email: savedUser.email,
            skills: savedUser.skills,
            password: savedUser.password,
            avatar_picture: savedUser.avatar_picture,
          },
        });
      } catch (error) {
        console.log("SavedUser error: ", error);
        if (error.code)
          res
            .status(401)
            .json({ msg: "registration not possible", error: error });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const menteesSignIn = async (req, res) => {
  const user = await MenteesModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(409).json({
      msg: "User not found.",
    });
  } else {
    console.log("req.body-Mentee Sing In: ", req.body);
    const verifiedPassword = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      res.status(409).json({
        msg: "Password is incorrect!",
      });
    } else {
      console.log("You are logged in!");
      console.log("user.id -menteesSignIn: ", user._id);
      console.log("user-menteesSignIn: ", user);
      const token = issueToken(user._id, user.user_type);
      res.status(201).json({
        msg: "You are logged in!",
        successful: true,
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_type: user.user_type,
          email: user.email,
          avatar_picture: user.avatar_picture,
        },

        token,
      });
    }
  }
};

const getMenteesProfile = (req, res) => {
  console.log("req, res in getMenteesProfile: ", req, res);
  console.log("req.user-getMenteesProfile controller:", req.user);

  res.status(200).json(req.user);
  // res.status(200).json({
  //   id: req.user.id,
  //   first_name: req.user.first_name,
  //   last_name: req.user.last_name,
  //   birthday: req.user.birthday,
  //   gender: req.user.gender,
  //   language: req.user.language,
  //   couching_medium: req.user.couching_medium,
  //   skills: req.user.skills,
  //   about: req.user.about,
  //   about: req.user.createdAt,
  //   email: req.user.email,
  //   password: "",
  //   user_type: req.user.user_type,
  //   likes: req.user.likes,
  //   avatar_picture: req.user?.avatar_picture,
  // });
};


// ----------- editMentee -------------------//
const editMentee = async (req, res) => {
  // console.log("edit Mentee: req,res: ", req, res);
  console.log("request body:>> ", req.body);
  console.log("req.user- editMentee controller", req.user);
  const hashedPassword = await encryptPassword(req.body.password);
  // const filter = { email: "test@mail.de" };
  const update = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    language: req.body.language,
    couching_medium: req.body.couching_medium,
    skills: req.body.skills,
    email: req.body.email,
    password: hashedPassword,
    about: req.body.about,
    avatar_picture: req.body?.avatar_picture,
  };

  try {
    // const updateMentee = await mongoose.MenteeModel.findOneAndUpdate(id_mentee, )  delete this
    console.log("req.user.id- editMentee controller: ", req.user.id);

    const mentee = await MenteesModel.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });

    console.log("mentee- editMentee controller: ", mentee);
    res.status(200).json({
      msg: "Mentee update successfull",
    });
  } catch (error) {
    console.log("error update mentee: ", error);
    res.status(400).json({
      msg: "Can not update mentee!",
    });
  }
};




// ------- Get All Mentees ------------------- starts//
const allMentees = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const response = await MenteesModel.find();
    console.log('Getting all mentees successfully!')
    res.status(200).json(response);
  } catch (error) {
    console.log("error, getting all mentees failed: ", error);
    res.status(400).json({
      msg: "getting all mentees failed:",
      error: error,
    });
  }
};
// ------- Get All Mentees ------------------- ends//


// ---------- Delete Mentees Account ----------- starts --//
const deleteAccount = async (req, res) => {
  console.log("req.body- deleteAccount-mentee: ", req.body);
  try {
    const mentee = await MenteesModel.findByIdAndDelete(
      req.body.menteeId
    );
    console.log("Mentee delete account successfully.");
    res.status(200).json({
      msg: "Mentee delete account successfully.",
    });
  } catch (error) {
    console.log("error deleting Mentee account: ", error);
    res.status(400).json({
      msg: "error deleting Mentee: ",
      error,
    });
  }
};
export {
  uploadUserPicture,
  signUp,
  getMenteesProfile,
  menteesSignIn,
  deleteAccount,
  allMentees,
  editMentee,
};
