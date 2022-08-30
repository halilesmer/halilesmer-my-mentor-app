import "./MentorsCard.css";

import { Card, CardMedia, IconButton, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/system";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { AppContext } from "../contexts/appContext";

const MentorsCard = ({ mentorsData }) => {
  const { handleLikeClick, userLogIn, setUserLogIn, menteesData, getProfile } =
  useContext(AppContext);


  // console.log("mentorsData: ", mentorsData);
  // console.log("menteesLikes: ", menteesData && menteesData);
  return (
    <>
      {mentorsData &&
        mentorsData.map((mentor) => {
          return (
            <Paper
              key={mentorsData._id}
              elevation={10}
              className="mentor-card-con"
            >
              <div
                className="mentor-cards-header"
                style={{ width: "100%", height: "20px" }}
              >
                Header
              </div>
              <Box className="mentor-card-body">
                <Box className="mentor-cards-img-con">
                  {mentor.avatar_picture ? (
                    <img
                      width="100px"
                      className="mentor-img"
                      src={mentor.avatar_picture}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="mentor-img"
                      width="100px"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      alt="avatar"
                    />
                  )}{" "}
                  {/* <img
                    className="mentor-img"
                    src={
                      mentorsData.avatar_picture && mentorsData.avatar_picture
                    }
                    alt="mentor-avatar"
                    style={{ borderRadius: "50%" }}
                  /> */}
                  {/* <CardMedia
                    className="mentor-img"
                    component="img"
                    height="194"
                    image={mentorsData?.avatar_picture}
                    alt="Paella dish"
                  /> */}
                </Box>

                <Paper className="mentor-card-texts-con">
                  <p
                    style={{
                      color: "#c9811c",
                      fontSize: "20px",
                      textTransform: "uppercase",
                      marginTop: "12px",
                    }}
                  >
                    {mentor.first_name} {mentor.last_name}
                  </p>
                  <p>
                    {" "}
                    {mentor.skills.map((skill) => (
                      <span>{skill}, </span>
                    ))}
                  </p>
                  <p>
                    {mentor.couching_medium.map((medium) => (
                      <span>{medium}, </span>
                    ))}
                  </p>
                  <p>
                    {mentor.language.map((lang) => (
                      <span>{lang}, </span>
                    ))}
                  </p>
                </Paper>
              </Box>
              <div className="mentor-cards-footer" style={{ width: "100%" }}>
                <div className="mentor-cards-like-con">
                  <IconButton
                    aria-label="Like Button"
                    onClick={() => handleLikeClick(mentor._id)}
                  >
                    <ThumbUpOffAltIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </Paper>
          );
        })}
    </>
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
