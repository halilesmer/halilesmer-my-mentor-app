import MenteesModel from "../models/menteesModel.js";
import MentorsModel from "../models/mentorsModel.js";
import { request } from "express";

const filterGender = async (req, res) => {
  console.log("req.body in filterGender: ", req.body);
  console.log("req.params in filterGender: ", req.params);
  // console.log("req.user- filterGender Controller", req.user);

  let gender ={};
if(req.params.gender !== 'false'){
gender = {gender: req.params.gender};
}


  
  try {
    // $and: [{ gender: gender }, { fee: { $gte: 0 } }],
   const filterByGender = await MentorsModel.find(gender);
    
 
    res.status(200).json(filterByGender);
  } catch (error) {
    console.log("error: get data by gender in filterGender failed!!!: ", error);
  }
};
export { filterGender, };
