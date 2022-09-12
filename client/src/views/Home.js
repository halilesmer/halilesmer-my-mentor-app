import { Alert, Button, IconButton, Snackbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../contexts/appContext";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

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
  //  const [snackBarAlert, setSnackBarAlert] = React.useState("");
const {openSnackBar, setOpenSnackBar} = useContext(AppContext);
   
  // -------- Handle  Close   -------
  const handleSnackbarOpenClick = () => {
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



  
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

      <Button onClick={handleSnackbarOpenClick}>Open</Button>
      <Button onClick={handleSnackBarClose}>Close</Button>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message="Note archived"
        action={action}
        style={{
          width: "fitContent",
          height: "5rem",
          maxWidth: "70%",
          bottom: "45vh",
          margin: "auto",
          left: "0",
          right: "0",
          top: "0",
          border: "dotted red 2px",
          borderRadius: "5px",
          background: "rgb(255, 244, 229)",
        }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          You are logged out.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
