import React, { useContext } from 'react'

import { AppContext } from '../contexts/appContext'

const Mentors = () => {
  const {mentorsData} = useContext(AppContext);
  console.log("mentorsData: ", mentorsData && mentorsData);
  
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