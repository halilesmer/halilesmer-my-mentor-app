import MenteesModel from "../models/menteesModel.js";
import MentorsModel from "../models/mentorsModel.js";
import { request } from "express";

const filterMentors = async (req, res) => {
  console.log("req.body in filterMentors: ", req.body);
  console.log("req.params in filterMentors: ", req.params);
  // console.log("req.user- filterMentors Controller", req.user);
  // let fees = req.params.fee === "Volunteer" ? 0 : req.params.fee;

  // let gender = {};
  // if (req.params.gender !== "false") {
  //   gender = { gender: req.params.gender };
  // }
  // fees = {};
  // if (req.params.fee !== "false") {
  //   fees = { fee: req.params.fee };
  // }

  try {
     const filterMetrs = await MentorsModel.find(req.body);
    //  const filterMetrs = await MentorsModel.find({gender: req.body.gender});

    // const filterByGender = await MentorsModel.find({
    //   $and: [gender, { fee: { $gte: 0 } }],
    // });

    //  const filterByGender = await MentorsModel.find({
    //    gender: req.params.gender,
    //    fees: req.params.fees,
    //  });

    res.status(200).json(filterMetrs);
    console.log('get filters result succeed! :');
  } catch (error) {
    console.log(
      "error: get data by gender in filterMentors failed!!!: ",
      error
    );
  }
};
export { filterMentors };
