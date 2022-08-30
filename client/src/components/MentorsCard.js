import "./MentorsCard.css";

import { Card, CardMedia, IconButton, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/system";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AppContext } from "../contexts/appContext";

const MentorsCard = ({ mentor }) => {
  const { handleLikeClick, userLogIn, likes, menteesData, getMenteeData } =
    useContext(AppContext);

  const [likedIconColor, setLikedIconColor] = useState(null);

  // const menteesLikedId = ["6304ddef48c5f4b1ec2b6af"].includes(
  //   "6304ddef48c5f4b1ec2b65af"
  // );

  useEffect(() => {
    setLikedIconColor(null)
     menteesData && menteesData.likes.filter((id) => id.includes(mentor._id) && setLikedIconColor(true));
    // if (menteesLikedId && menteesLikedId.length > 0) {
    //   setLikedIconColor(true);
    // }
  }, [menteesData]);
 

  //   const getLikes =
  //     mentor &&
  //     mentor.map((mntr) => {
  //       return menteesData && menteesData.likes.map((id) => mntr._id === id);
  //     });

  /* menteesData && menteesData.likes.filter(mntrId => {
      return mntrId.includes(mntr) */
  console.log("likedIconColor: ", likedIconColor);
   console.log("likes: ", likes);

  console.log("menteesData: ", menteesData && menteesData);
  return (
    <>
      <Paper key={mentor._id} elevation={10} className="mentor-card-con">
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
                      mentor.avatar_picture && mentor.avatar_picture
                    }
                    alt="mentor-avatar"
                    style={{ borderRadius: "50%" }}
                  /> */}
            {/* <CardMedia
                    className="mentor-img"
                    component="img"
                    height="194"
                    image={mentor?.avatar_picture}
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
              {mentor.skills.map((skill, i) => (
                <span key={i}>{skill}, </span>
              ))}
            </p>
            <p>
              {mentor.couching_medium.map((medium, i) => (
                <span key={i}>{medium}, </span>
              ))}
            </p>
            <p>
              {mentor.language.map((lang, i) => (
                <span key={i}>{lang}, </span>
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
              {likedIconColor ? (
                <ThumbUpAltIcon fontSize="small" />
              ) : (
                <ThumbUpOffAltIcon fontSize="small" />
              )}
            </IconButton>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default MentorsCard;

/* 

{mentor && mentor.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.first_name}</h3>
        )
    })}
    
    */
