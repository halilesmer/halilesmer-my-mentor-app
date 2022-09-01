import MenteesModel from "../models/menteesModel.js";
import MentorsModel from "../models/mentorsModel.js";

const postLikes = async (req, res) => {
    console.log('req.user>>', req.user)
    console.log('req.body>>', req.body)
  //   ----- Mentee likes -------- starts ---
  try {
//    Rouls code
    //   const mentee = await MenteesModel.findByIdAndUpdate(
    //     req.user.id,
    //     { $push: { likes: req.body.mentorId }},
    //     { new: true, overwrite: false
    //    }
    //   );
    //   const mentor = await MentorsModel.findByIdAndUpdate(
    //     req.body.mentorId,
    //     { $push: { likes: req.user.id } },
    //     { new: true, overwrite: false }
    //   );
   
    const mentee = await MenteesModel.findById(req.user.id);
    const mentor = await MentorsModel.findById(req.body.mentorId);


      if (mentee.likes.includes(req.body.mentorId)) {
        mentee.likes.pull(req.body.mentorId);
        if (res.headersSent !== true) {
          res.status(200).json({
            mentee,
            msg: "Mentee like update successfull",
          });
         
        }
      } else {
        mentee.likes.push(req.body.mentorId);
        //    res.status(200).json({
        //      mentee,
        //      msg: "Mentee like update successfull",
        //    });
        if (res.headersSent !== true) {
           res.status(200).json({
             mentee,
             msg: "Mentee like update successfull",
           });
        }
      }

      if (mentor.likes.includes(req.user.id)) {
      mentor.likes.pull(req.user.id);
    //   res.status(200).json({
    //     mentor,
    //     msg: "Mentee deleted mentor like successfull (in MentorModel)",
    //   });
      if (res.headersSent !== true) {
        res.status(200).json({
          mentor,
          msg: "Mentee deleted mentor like successfull (in MentorModel)",
        });
      }
      console.log("Mentee ID deleted from mentors likes");
    //   return;
    } else {
      mentor.likes.push(req.user.id);
    //   res.status(200).json({
    //     mentor,
    //     msg: "Mentee liked mentor successfull (in MentorModel)",
    //   });
     if (res.headersSent !== true) {
       res.status(200).json({
         mentor,
         msg: "Mentee liked mentor successfull (in MentorModel)",
       });
     }
    }

      await mentee.save();
      await mentor.save();
    

  
    console.log("mentee-postLikes: ", mentee);
    // return;


  
  } catch (error) {
    console.log("error update mentee like: ", error);
    res.status(400).json({
      msg: "Can not update mentee likes!",
    });
  }


  //   ----- Mentee likes -------- ends ---

  //   ----- Mentor likes -------- starts ---
  console.log("request body- postLikes:>> ", req.body);
  console.log("req.body.mentor ID- postLikes", req.body.mentorId);
  console.log("req.user.id- postLikes: ", req.user.id);

}

const getLikes = (req, res) => {
  console.log("req, res in getLikes: ", req, res);
  console.log("req.user", req.user);

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
    avatar_picture: req.user?.avatar_picture,
  });
};
export { getLikes, postLikes };

/* 
only mentee like works 

const postLikes = async (req, res) => {


  //   ----- Mentee likes -------- starts ---
  try {

    const mentee = await MenteesModel.findById(req.user.id);
    // const mentor = await MentorsModel.findById(req.body.mentorId);
    // console.log("mentor: ", mentor);

    if (mentee.likes.includes(req.body.mentorId)) {
      mentee.likes.pull(req.body.mentorId);
      console.log("Mentor ID deleted from mentees likes");
    //   return;
    } else {
      mentee.likes.push(req.body.mentorId);
      console.log("Mentor ID added to mentees likes ");

    }
    await mentee.save();
    res.status(200).json({
      mentee,
      msg: "Mentee liked mentor successfull",
    });
    console.log("mentee-postLikes: ", mentee);
    // return;

} catch (error) {
    console.log("error update mentee like: ", error);
    res.status(400).json({
        msg: "Can not update mentee likes!",
    });
}
//   ----- Mentee likes -------- ends ---

  //   ----- Mentor likes -------- starts ---
  console.log("request body- postLikes:>> ", req.body);
  console.log("req.body.mentor ID- postLikes", req.body.mentorId);
  console.log("req.user.id- postLikes: ", req.user.id);

//   try {
//     const mentor = await MentorsModel.findById(req.body.mentorId);

//     if (mentor.likes.includes(req.user.id)) {
//       mentor.likes.pull(req.user.id);
//       res.status(200).json({
//       mentor,
//       msg: "Mentee deleted mentor like successfull (in MentorModel)",
//     });
//     console.log("Mentee ID deleted from mentors likes");
//     return;
// } else {
//     mentor.likes.push(req.user.id);
//     res.status(200).json({
//       mentor,
//       msg: "Mentee liked mentor successfull (in MentorModel)",
//     });
//     console.log("Mentee ID added to mentors likes ");
//     return;
// }
// console.log("mentor-postLikes: ", mentor);

// } catch (error) {
//     console.log("error update mentor like: ", error);
//     res.status(400).json({
//         msg: "Can not update mentor likes!",
//     });
// }
//     await mentor.save();

//   ----- Mentor likes -------- ends ---
};

// const postLikesMentor = async (req, res) => {
  

//   //   ----- Mentor likes -------- starts ---
//   console.log("request body- postLikes:>> ", req.body);
//   console.log("req.body.mentor ID- postLikes", req.body.mentorId);
//   console.log("req.user.id- postLikes: ", req.user.id);

//   try {
//     const mentor = await MentorsModel.findById(req.body.mentorId);

//     if (mentor.likes.includes(req.user.id)) {
//       mentor.likes.pull(req.user.id);
//       console.log("Mentee ID deleted from mentors likes");
//     } else {
//       mentor.likes.push(req.user.id);
//       console.log("Mentee ID added to mentors likes ");
//     }
//     await mentor.save();

//     res.status(200).json({
//       mentor,
//       msg: "Mentee liked mentor successfull (in MentorModel)",
//     });
//     console.log("mentor-postLikes: ", mentor);
//     // return;
//   } catch (error) {
//     console.log("error update mentor like: ", error);
//     res.status(400).json({
//       msg: "Can not update mentor likes!",
//     });
//   }
//   //   ----- Mentor likes -------- ends ---
// };
*/



// What Roul did! only insert data but not deleting


//  const mentee = await MenteesModel.findByIdAndUpdate(
//       req.user.id,
//       { $push: { likes: req.body.mentorId }},
//       { new: true, overwrite: false
//      }
//     );
//     const mentor = await MentorsModel.findByIdAndUpdate(
//       req.body.mentorId,
//       { $push: { likes: req.user.id } },
//       { new: true, overwrite: false }




