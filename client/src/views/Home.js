import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../contexts/appContext";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SnackbarMui from "../components/SnackbarMui";

const styleMentorMenteesBox = {
  // border: "solid black 2px",
  borderRadius: "11px",
  width: "70%",
  maxWidth: "17rem",
  minHeight: "9rem",
  maxHeight: "17rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",
  margin: "2rem auto 2rem auto",

  boxShadow: "0px -1px 183px 28px rgb(0 0 0 / 30%)",
  background: "#ecebeb",
};

const Home = () => {
  const { openSnackBar, snackBarText } = useContext(AppContext);

  console.log("openSnackBar: ", openSnackBar);
      console.log("snackBarText: ", snackBarText);

  return (
    <div className="home">
      <Typography
        variant="h5"
        component="p"
        align="center"
        style={{ fontSize: "2vh" }}
        mt={2}
      >
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
        <Button
          href="/mentors"
          variant="outlined"
          startIcon={<ReadMoreIcon />}
          style={{ width: "10rem", margin: "auto" }}
        >
          More Info
        </Button>
      </Typography>
      {/* Click for Register as Mentor */}
      <Typography
        style={styleMentorMenteesBox}
        className="mentor-mentee-con"
        variant="body1"
        component="div"
      >
        <p> Become a Coach</p>

        <Button
          href="/mentors/signup"
          style={{ width: "10rem", margin: "auto" }}
          variant="outlined"
          startIcon={<ReadMoreIcon />}
        >
          More Info
        </Button>
      </Typography>
      {/* 
      <Button onClick={handleSnackbarOpenClick}>Open</Button>
      <Button onClick={handleSnackBarClose}>Close</Button> */}
      <SnackbarMui snackBarText={snackBarText} />
      {/* <SnackbarMui text={"You are logged out."} /> */}
    </div>
  );
};

export default Home;
