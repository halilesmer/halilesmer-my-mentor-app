import { Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const styleMentorMenteesBox = {
  border: "solid black 2px",
  borderRadius: "20px",
  width: "70%",
  maxWidth: "17rem",
  minHeight: "9rem",
  maxHeight: "17rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",
  margin: "2rem auto 2rem auto",
};
const Home = () => {
  return (
    <div className="home">
      <Typography variant="h5" component="p" align="center" style={{fontSize:'2vh'}}>
        We move the world forward by making it better, one person at a time,
        through coaching and mentoring. Trust, integrity, and respect are very
        important to us. Our coaches are trained professionals ready to assist
        you in your growth.
      </Typography>

      {/* Click for Searching a Mentor */}

      <Typography
        style={styleMentorMenteesBox}
        className="mentor-mentee-con"
        variant="body1"
        component="div"
      >
        <p> Hire a Coach</p>
        <Link to="mentors/" className="link">
          <Button
            variant="outlined"
            startIcon={<ReadMoreIcon />}
            style={{ width: "10rem", margin: "auto" }}
          >
            More Info
          </Button>
        </Link>
      </Typography>

      {/* Click for Register as Mentor */}
      <Typography
        style={styleMentorMenteesBox}
        className="mentor-mentee-con"
        variant="body1"
        component="div"
      >
        <p> Become a Coach</p>
        <Link to="register-mentor/" className="link">
          <Button
            style={{ width: "10rem", margin: "auto" }}
            variant="outlined"
            startIcon={<ReadMoreIcon />}
          >
            More Info
          </Button>
        </Link>
      </Typography>
    </div>
  );
};

export default Home;
