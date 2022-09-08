import MenteesModel from "../models/menteesModel.js";
import MentorsModel from "../models/mentorsModel.js";

const filterGender = async (req, res) => {
  console.log("req.body in filterGender: ", req.body);
  console.log("req.params in filterGender: ", req.params);
  // console.log("req.user- filterGender Controller", req.user);
  try {
    const filterByGender = await MentorsModel.find({gender: req.params.gender, },{skills: req.params.skills});
    res.status(200).json(filterByGender);
  } catch (error) {
    console.log("error: get data by gender in filterGender failed!!!: ", error);
  }
};
export { filterGender, };
