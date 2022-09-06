import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import MentorsModel from "../models/mentorsModel.js";
import { v2 as cloudinary } from "cloudinary";
import { issueToken } from "../util/jwt.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-it-mentor/mentors",
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
  // console.log("Here is the backend : ", {
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   birthday: req.body.birthday,
  //   gender: req.body.gender,
  //   language: req.body.language,
  //   experience: req.body.experience,
  //   website: req.body.website,
  //   fee: req.body.fee,
  //   couching_medium: req.body.couching_medium,
  //   email: req.body.email,
  //   skills: req.body.skills,
  //   password: req.body.password,
  //   avatar_picture: req.body.avatar_picture,
  // });

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
            about: savedUser.about,
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
  try {
    const response = await MentorsModel.find();
    res.status(200).json(response);
  } catch (error) {
    console.log("error, getting all mentors failed: ", error);
    res.status(400).json({
      msg: "getting all mentors failed:",
      error: error,
    });
  }
};

const mentorsSignIn = async (req, res) => {
  const user = await MentorsModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(409).json({
      msg: "User not found.",
    });
  } else {
    console.log("req.body: ", req.body);
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
      console.log("user.id: ", user._id);
      const token = issueToken(user._id, user.user_type);
      res.status(201).json({
        msg: "You are logged in!",
        successful: true,
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_type: user.user_type,
          avatar_picture: user.avatar_picture,
        },

        token,
      });
    }
  }
};

// ------- getMentorsProfile -------------------//
const getMentorsProfile = (req, res) => {
  console.log("req, res in getMentorsProfile: ", req, res);
  console.log("req.user- getMentorsProfile", req.user);

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
    about: req.user.about,
    avatar_picture: req.user?.avatar_picture,
  });
};

// ------- getSpecificMentorData -------------------//
const getSpecificMentorData = async (req, res) => {
  try {
    // console.log('req.params :>> ', req.params);
    const mentor = await MentorsModel.findById(req.params.mentorId);
    // const mentor = await MentorsModel.findById(req.body.mentorId);

    res.status(200).json({
      mentor,
      msg: "Getting specific mentor successful",
    });
  } catch (error) {
    console.log("error getting specific mentor: ", error);
    res.status(400).json({
      msg: "We're sorry, an error occurred during getting mentors data.",
    });
  }
  console.log("req.body- getSpecificMentorData: ", req.body);
};

// ----------- editMentor -------------------//
const editMentor = async (req, res) => {
  // console.log("edit Mentor: req,res: ", req, res);
  console.log("request body:>> ", req.body);
  console.log("req.user- editMentor controller", req.user);
  const hashedPassword = await encryptPassword(req.body.password);
  // const filter = { email: "test@mail.de" };
  const update = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    birthday: req.body.birthday,
    gender: req.body.gender,
    language: req.body.language,
    experience: req.body.experience,
    website: req.body.website,
    fee: req.body.fee,
    couching_medium: req.body.couching_medium,
    skills: req.body.skills,
    password: hashedPassword,
    user_type: req.body.user_type,
    register_Date: req.body.register_Date,
    about: req.body.about,
    avatar_picture: req.body?.avatar_picture,
  };

  try {
    // const updateMentee = await mongoose.MenteeModel.findOneAndUpdate(id_mentee, )  delete this
    console.log("req.user.id- editMentor controller: ", req.user.id);

    const doc = await MentorsModel.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });

    // const doc = await mongoose.MentorsModel.findByIdAndUpdate(
    //   { _id: req.body.id },
    //   {
    //     first_name: "jason bourne",
    //   }
    // );
    // const doc = await mongoose.MentorsModel.findByIdAndUpdate(
    //   req.body.id,
    //   { first_name: "jason bourne" },
    //   function (err, result) {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.send(result);
    //       // res.status(200).json(result);
    //       res.status(200).json({ msg: "Update Succesfull" });
    //     }
    //   }
    // );
    // await doc.save();

    console.log("doc- editMentor controller: ", doc);
    res.status(200).json({
      msg: "Mentor update successfull",
    });
  } catch (error) {
    console.log("error update mentor: ", error);
    res.status(400).json({
      msg: "Can not update mentor!",
    });
  }
};


// ---------- Delete Mentors Account ----------- starts --//

const deleteAccount = async (req, res) => {
  console.log("req.body- deleteAccount-mentee: ", req.body);
  try {
    const mentor = await MentorsModel.findByIdAndDelete(
      req.body.mentorId
    );
    console.log("Mentor delete account successfully.");
    res.status(200).json({
      msg: "Mentor delete account successfully.",
    });
  } catch (error) {
    console.log("error deleting Mentor account: ", error);
    res.status(400).json({
      msg: "error deleting Mentor: ",
      error,
    });
  }
};
export {
  uploadUserPicture,
  signUp,
  allMentors,
  mentorsSignIn,
  getMentorsProfile,
  getSpecificMentorData,
  editMentor,
  deleteAccount,
};
