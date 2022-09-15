import "./MentorsCard.css";

import { IconButton, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import LoginRegisterBtn from "./LoginRegisterBtn";
import Slide from "@mui/material/Slide";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MentorsCard = ({ mentor }) => {
  const { handlePostLikeClick, menteesData, decodedToken, getMenteeData } =
    useContext(AppContext);

  const [likedIconColor, setLikedIconColor] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------- Get mentees data --------- starts //
  useEffect(() => {
    getMenteeData();
     // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLikedIconColor(null);
    menteesData &&
      menteesData.likes.filter(
        (id) => id.includes(mentor._id) && setLikedIconColor(true)
      );
       // eslint-disable-next-line
  }, [menteesData]);
  // --------- Get mentees data --------- ends //

  // console.log("menteesData: ", menteesData);
  // console.log("decodedToken: ", decodedToken);
  // console.log("mentor: ", mentor);
  // console.log("decodedToken: ", decodedToken);

  return (
    <>
      <Paper key={mentor._id} elevation={10} className="mentor-card-con">
        <div
          className="mentor-cards-header"
          style={{ width: "100%", height: "10px" }}
        ></div>

        <Link
          onClick={!decodedToken ? handleClickOpen : null}
          to={
            !decodedToken ? "" : `/mentors/details-page/${mentor && mentor._id}`
          }
        >
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
              )}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"You are not logged in."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You need to be a member to see the detailed information of the
            mentors and to write a comment. <br />
            <br />
            If you are not yet a member, we would be very glad to have you as a
            member.
            <br />
          </DialogContentText>
          <br />
          <LoginRegisterBtn href="/signup" text="Sign Up" />
          <br />
          <br />
          <DialogContentText className="redirection-txt">
            <Link to="/mentees/signin">
              <i> Already have an account? Sign in</i>
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
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
