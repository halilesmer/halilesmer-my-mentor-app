import "./MentorsProfilePage.css";

import * as React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../contexts/appContext";
import SnackbarMui from "../components/SnackbarMui";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";

export default function MenteesProfilePage() {
  const { menteesData, getMenteeData, setOpenSnackBar } =
    React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  console.log("open: ", open);
  const [display, setDisplay] = React.useState("block");
  const [error, setError] = React.useState(null);
 


  const token = getToken();
  const navigate = useNavigate();

  // ------- Transition for Delete Confirming Alert-------
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = (e) => {
    setOpen(false);
    setDisplay("none");
  };

  const handleOpen = (e) => {
    setDisplay("block");
    setOpen(!open);
    // setOpen(prev => !prev );
  };

  React.useEffect(() => {
    getMenteeData();
  }, []);

  // ------- Delete Mentees Account ------- starts //
  const deleteMenteesAccount = async (commentId) => {
    const deleteOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ menteeId: menteesData._id }),
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/mentees/delete-account/",
        deleteOptions
      );
      console.log("response-deleteMenteesAccount: ", response);
      localStorage.removeItem("token");
      navigate("/");
      setOpenSnackBar(true);
      
    } catch (error) {
      console.log("error deleting Mentees Account: ", error);
    }
  };
  // ------- Delete Mentees Account -------  ends //


  console.log("menteesData: ", menteesData && menteesData);

  return (
    <>
      {menteesData && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
          <Typography variant="h5" component="h5" textAlign="center" mb={1}>
            User Profile
          </Typography>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con">
            <div className="avatar-picture-box">
              {menteesData.avatar_picture ? (
                <img
                  src={menteesData?.avatar_picture}
                  alt="avatar"
                  width="300"
                />
              ) : (
                <span>Please choose a profile image (optional)</span>
              )}
            </div>
            <div className="image-events-con">
              {/* <input type="file" onChange={handleAttachFileOnchange} /> */}
              <input type="file" id="file" style={{ display: "none" }} />
              {/* <button onClick={onButtonSelectPictureClick}>Open file upload window</button> */}
            </div>
            <Box
              className=""
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 128,
                  // height: 128,
                },
              }}
            ></Box>
          </div>

          <Box className="profile-info-box">
            <Typography variant="h5" component="h5" textAlign="center" mb={3}>
              {menteesData.first_name} {menteesData.last_name} <br /> (Mentee)
            </Typography>
            <Paper elevation={4}>
              <span>Birthday: {formatDateDdMmYyyy(menteesData.birthday)}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {menteesData.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Languages: {menteesData.language}</span>
            </Paper>

            <Paper elevation={4}>
              <span>
                Couching Medium:{" "}
                {menteesData.couching_medium.map((item, i) => (
                  <span key={i}>{item}, </span>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Interests:
                {menteesData.skills.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}{" "}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>About: {menteesData.about}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Email: {menteesData.email}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Password: ***</span>
            </Paper>
            <Paper elevation={4}>
              <span>User Type:</span>{" "}
              <span
                className="user-type"
                style={{ textTransform: "capitalize" }}
              >
                {menteesData.user_type}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Register Date: {formatDateDdMmYyyy(menteesData.createdAt)}
              </span>
            </Paper>
            <Dialog
              sx={{ display: { display } }}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-delete-account"
            >
              <DialogTitle style={{ textAlign: "center" }}>
                Are you sure you want to delete your account?
              </DialogTitle>

              <DialogActions style={{    justifyContent: 'space-evenly'}}>
                <Button
                  onClick={handleClose}
                  // href="/mentees/profile"
                  // type="submit"
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 3, mb: 2, width: "30px" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteMenteesAccount}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              href="/mentee/edit-mentee"
              className="edit-profile-btn"
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
            <Button
              // onClick={deleteMenteesAccount}
              onClick={handleOpen}
              style={{ borderRadius: "50px" }}
              className="delete-profile-btn"
              variant="contained"
              color="error"
              fullWidth
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      )}
      <SnackbarMui text={"Editing succeed!"} />
    </>
  );
}
