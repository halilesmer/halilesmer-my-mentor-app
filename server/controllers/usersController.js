import UserModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword } from "../util/encryptPassword.js";
import usersModel from "../models/usersModel.js";

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
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

const signUp = async (req, res) => {
  console.log("req.body: ", req.body);

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user allready exists" });
      console.log("user allready exists: ");
    } else {
      console.log("user doesn't exist... ");
      //use here express validator

      const hashedPassword = await encryptPassword(req.body.pw);

      const newUser = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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
        avatarPicture: req.body.avatarPicture,
      });
      
      console.log("newUser: ", newUser);
      
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
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
            avatarPicture: savedUser.avatarPicture,
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

export { uploadUserPicture, signUp };
