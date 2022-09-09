import MenteesModel from "../models/menteesModel.js";
import MentorsModel from "../models/mentorsModel.js";
import { request } from "express";

const filterGender = async (req, res) => {
  console.log("req.body in filterGender: ", req.body);
  console.log("req.params in filterGender: ", req.params);
  // console.log("req.user- filterGender Controller", req.user);
let fees = req.params.fee === "Volunteer" ? 0 : req.params.fee;

  let gender ={};
if(req.params.gender !== 'false'){
gender = {gender: req.params.gender};
}
  fees = {};
 if (req.params.fee !== "false") {
   fees = { fee: req.params.fee };
 }

  
  try {
    // $and: [{ gender: gender }, { fee: { $gte: 0 } }],
    const filterByGender = await MentorsModel.find({
     $and: [gender , { fee: { $gte: 0 } }],
   });
  //  const filterByGender = await MentorsModel.find({
  //    gender: req.params.gender,
  //    fees: req.params.fees,
  //  });
    
 
    res.status(200).json(filterByGender);
  } catch (error) {
    console.log("error: get data by gender in filterGender failed!!!: ", error);
  }
};
export { filterGender, };
