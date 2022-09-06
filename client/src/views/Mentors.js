import React, { useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext.js";
import MentorsCard from "../components/MentorsCard.js";
import { getToken } from "../utils/getToken.js";
import useFetch from "../custom_hooks/useFetch.js";

const Mentors = () => {

  const { allMentorsData, getAllMentorsData } = React.useContext(AppContext);
  
  // // ------- Get All Mentors -------------------//
  // const getAllMentorsData = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/api/mentors/allmentors"
  //     );
  //     const result = await response.json();
  //     // console.log("result: ", result);
  //     // setMentorsProfile(result)
  //     setMentorsData(result);
  //     setUserType("mentor");
  //   } catch (error) {
  //     console.log("error getting prifile data: ", error);
  //   }
  // };
  React.useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
    getAllMentorsData &&  getAllMentorsData();
    }
    return () => (didCancel = true);
  }, []);

  console.log("allMentorsData: ", allMentorsData);
  return (
    <>
      {allMentorsData &&
        allMentorsData.map((mentor) => {
          return <MentorsCard key={mentor._id} mentor={mentor} />;
        })}
    </>
  );
};;

export default Mentors;

/* 

{allMentorsData && allMentorsData.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.first_name}</h3>
        )
    })}
    
    */
