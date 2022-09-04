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
      folder: "my-it-mentor/mentees",
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

  res.status(200).json({
    id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    birthday: req.user.birthday,
    gender: req.user.gender,
    language: req.user.language,
    couching_medium: req.user.couching_medium,
    skills: req.user.skills,
    about: req.user.about,
    email: req.user.email,
    password: "",
    user_type: req.user.user_type,
    likes: req.user.likes,
    avatar_picture: req.user?.avatar_picture,
  });
};

export { uploadUserPicture, signUp, getMenteesProfile, menteesSignIn };
