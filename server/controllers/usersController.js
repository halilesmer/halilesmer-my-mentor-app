import { v2 as cloudinary } from "cloudinary";
import usersModel from "../models/usersModel.js";
// import userModel from "../models/usersModel.js";
// import bcrypt from "bcrypt";

//REVIEW[epic=demo, seq=12] 12. Define upload function
const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "suricatas-spike",
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

export { uploadUserPicture,};
