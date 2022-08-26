import React, { useEffect, useState } from "react";

import MentorsCard from "../components/MentorsCard.js";
import { getToken } from "../utils/getToken.js";
import useFetch from "../custom_hooks/useFetch.js";

const Mentors = () => {
  const [mentorsData, setMentorsData] = useState(null);

  // const {mentorsData} = useContext(AppContext);
  const { get } = useFetch("http://localhost:5001");

  // useEffect(() => {
  //   let didCancel = false;
  //  if(!didCancel){
  //     get("/api/users/mentors")
  //      .then((data) => {
  //        console.log(data);
  //        setMentorsData(data);
  //      })
  //      .catch((error) => console.log(error));
  //  }

  //   return () => (didCancel = true);
  // }, []);
  const getProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/mentors/mentorsprofile",
          requestOptions
        );
        const result = await response.json();
        // console.log("result: ", result);
        // setMentorsData({
        //   first_name: result.first_name,
        //   last_name: result.last_name,
        //   email: result.email,
        //   id: result.id,
        //   birthday: result.birthday,
        //   gender: result.gender,
        //   language: result.language,
        //   experience: result.experience,
        //   website: result.website,
        //   fee: result.fee,
        //   couching_medium: result.couching_medium,
        //   skills: result.skills,
        //   password: "",
        //   user_type: result.user_type,
        //   register_Date: result.register_Date,
        //   avatar_picture: result.avatar_picture,
        // });
        // setMentorsProfile(result)
        setMentorsData(result)
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    let didCancel = false;
    if(!didCancel){
      getProfile();
    }
    return () => (didCancel = true);
  }, []);
  return <MentorsCard mentorsData={mentorsData}/>;
};

export default Mentors;

/* 

{mentorsData && mentorsData.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.first_name}</h3>
        )
    })}
    
    */
