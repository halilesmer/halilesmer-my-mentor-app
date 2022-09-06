import "./MentorsCard.css";

import { IconButton, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const MentorsCard = ({ mentor }) => {
  const {
    handlePostLikeClick,

    menteesData,
    decodedToken,
    getMenteeData,
  } = useContext(AppContext);

  const [likedIconColor, setLikedIconColor] = useState(null);

  // --------- Get mentees data --------- starts //
  useEffect(() => {
    getMenteeData();
  }, []);

  useEffect(() => {
    setLikedIconColor(null);
    menteesData &&
      menteesData.likes.filter(
        (id) => id.includes(mentor._id) && setLikedIconColor(true)
      );
  }, [menteesData]);
  // --------- Get mentees data --------- ends //

  console.log("menteesData: ", menteesData);
  // console.log("decodedToken: ", decodedToken);
  // console.log("mentor: ", mentor);

  return (
    <>
      <Paper key={mentor._id} elevation={10} className="mentor-card-con">
        <div
          className="mentor-cards-header"
          style={{ width: "100%", height: "20px" }}
        >
          Header
        </div>
        <Link to={`/mentors/details-page/${mentor && mentor._id}`}>
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
                {mentor.skills.map((skill, i) => {
                  return <span key={i}>{skill}, </span>;
                })}
              </p>
              <p>
                {mentor.couching_medium.map((medium, i) => (
                  <span key={i}>{medium}, </span>
                ))}
              </p>
              <p>
                {mentor.language.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
               
              </p>
            </Paper>
          </Box>
        </Link>
        <div className="mentor-cards-footer" style={{ width: "100%" }}>
          <div className="mentor-cards-like-con">
            {decodedToken && decodedToken.role === "mentee" && (
              <IconButton
                aria-label="Like Button"
                onClick={() => handlePostLikeClick(mentor._id)}
              >
                {likedIconColor ? (
                  <ThumbUpAltIcon fontSize="small" />
                ) : (
                  <ThumbUpOffAltIcon fontSize="small" />
                )}
              </IconButton>
            )}
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
