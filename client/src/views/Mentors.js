import React, { useEffect, useState } from 'react'

import useFetch from "../custom_hooks/useFetch.js";

const Mentors = () => {
  const [mentorsData, setMentorsData] = useState(null);

  // const {mentorsData} = useContext(AppContext);
  console.log("mentorsData: ", mentorsData && mentorsData);
  const { get } = useFetch("http://localhost:5001");

  useEffect(() => {
    let didCancel = false;
   if(!didCancel){
      get("/api/users/mentors")
       .then((data) => {
         console.log(data);
         setMentorsData(data);
       })
       .catch((error) => console.log(error));
   }

    return () => (didCancel = true);
  }, []);
  return (
    <div>
      {mentorsData &&
        mentorsData.map((mentor) => {
          return <h3>{mentor.firstname}</h3>;
        })}{" "}
    </div>
  );
  
}

export default Mentors

/* 

{mentorsData && mentorsData.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.firstname}</h3>
        )
    })}
    
    */