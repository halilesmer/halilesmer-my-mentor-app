import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import MentorsModel from "../models/mentorsModel.js";
import { v2 as cloudinary } from "cloudinary";
import { issueToken } from "../util/jwt.js";
import mongoose from "mongoose";
import signInModel from "../models/signInModel.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-it-mentor",
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
  console.log("req.body: ", req.body);
  console.log("Here is the backend : ", {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    language: req.body.language,
    experience: req.body.experience,
    website: req.body.website,
    fee: req.body.fee,
    couching_medium: req.body.couching_medium,
    email: req.body.email,
    skills: req.body.skills,
    password: req.body.password,
    avatar_picture: req.body.avatar_picture,
  });

  try {
    const existingUser = await MentorsModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user allready exists" });
      console.log("user allready exists: ");
    } else {
      console.log("user doesn't exist... ");
      //use here express validator

      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new MentorsModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        language: req.body.language,
        experience: req.body.experience,
        website: req.body.website,
        fee: req.body.fee,
        couching_medium: req.body.couching_medium,
        email: req.body.email,
        skills: req.body.skills,
        password: hashedPassword,
        avatar_picture: req.body.avatar_picture,
      });

      console.log("newUser: ", newUser);

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            birthday: savedUser.birthday,
            gender: savedUser.gender,
            language: savedUser.language,
            experience: savedUser.experience,
            website: savedUser.website,
            fee: savedUser.fee,
            couching_medium: savedUser.couching_medium,
            email: savedUser.email,
            skills: savedUser.skills,
            password: savedUser.password,
            avatar_picture: savedUser.avatar_picture,
          },
        });
      } catch (error) {
        console.log("SavedUser error: ", error);
        res
          .status(401)
          .json({ msg: "registration not possible", error: error });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const allMentors = async (req, res) => {
  console.log("req.body: ", req.body);
  const response = await MentorsModel.find();
  // const result = await response.json();
  res.status(200).json(response);
};

const mentorsSignIn = async (req, res) => {
  const user = await MentorsModel.findOne({ email: req.body.email });
  console.log("user: ", user);
  if (!user) {
    res.status(409).json({
      msg: "User not found.",
    });
  } else {
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
      const token = issueToken(user._id);
      res.status(201).json({
        msg: "You are logged in!",
        user: {
          email: user.email,
          picture: user?.avatar_picture,
          id: user._id
        },
        token,
      });
    }
  }
};
export { uploadUserPicture, signUp, allMentors, mentorsSignIn };
