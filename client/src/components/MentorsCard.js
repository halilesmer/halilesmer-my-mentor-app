import { Box, height } from "@mui/system";
import React, { useEffect, useState } from "react";

import { Paper } from "@mui/material";
import useFetch from "../custom_hooks/useFetch.js";

const MentorsCard = ({ mentorsData }) => {
  console.log("mentorsData: ", mentorsData);
  return (
    <Paper
      elevation={10}
      className="mentor-cards-con"
      style={{
        border: "solid 1px orange",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="mentor-cards-header"
        style={{ width: "100%", height: "20px" }}
      >
        Header
      </div>
      <Box className="mentor-card-body" style={{ display: "flex" }}>
        <Box className="mentor-cards-img">
          <img
            className="mentor-img"
            src="https://dummyimage.com/100x100/000/fff.jpg"
            alt="mentor-avatar"
            style={{ borderRadius: "50%" }}
          />
        </Box>

        <Paper className="mentor-card-texts-con">
          <p
            style={{
              color: "#c9811c",
              "font-size": "20px",
              "text-transform": "uppercase",
              "margin-top": "12px",
            }}
          >
            {mentorsData.first_name} {mentorsData.last_name}
          </p>
          <p>
            {" "}
            {mentorsData.skills.map((skill) => (
              <span>{skill}, </span>
            ))}
          </p>
          <p>
            {mentorsData.couching_medium.map((medium) => (
              <span>{medium}, </span>
            ))}
          </p>
          <p>
            {mentorsData.language.map((lang) => (
              <span>{lang}, </span>
            ))}
          </p>
        </Paper>
      </Box>
      <div className="mentor-cards-footer" style={{ width: "100%" }}>
        footer
      </div>
    </Paper>
  );
};

export default MentorsCard;

/* 

{mentorsData && mentorsData.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.first_name}</h3>
        )
    })}
    
    */
