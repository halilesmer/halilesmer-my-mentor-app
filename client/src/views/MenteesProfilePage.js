import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

import { AppContext } from "../contexts/appContext";
import DialogAlert from "../components/DialogAlert";
import SnackbarMui from "../components/SnackbarMui";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import {nodeEnv} from "../utils/nodeEnv";
import { useNavigate } from "react-router-dom";

export default function MenteesProfilePage() {
  const {
    menteesData,
    getMenteeData,
    setOpenSnackBar,
    setSnackBarText,
    snackBarText,
    handleOpenDialog,
    setDialogTxt1,
  } = React.useContext(AppContext);

  const [error, setError] = React.useState(null);
  const token = getToken();
  const navigate = useNavigate();
  const env = nodeEnv.env;

  React.useEffect(() => {
    getMenteeData();
    // eslint-disable-next-line
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
        `${env}/mentees/delete-account/`,
        deleteOptions
      );
      console.log("response-deleteMenteesAccount: ", response);
      localStorage.removeItem("token");
      navigate("/");
      setOpenSnackBar(true);
      setSnackBarText("Your account hase been deleted!");
    } catch (error) {
      console.log("error deleting Mentees Account: ", error);
    }
  };
  // ------- Delete Mentees Account -------  ends //

  const handleDeleteClick = () => {
    handleOpenDialog();
    setDialogTxt1("Are you sure you want to delete your account?");
  };
  // console.log("menteesData: ", menteesData && menteesData);
  // console.log("env: ", env);

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

            <Button
              href="/mentee/edit-mentee"
              className="edit-profile-btn"
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              style={{ borderRadius: "50px" }}
              className="delete-profile-btn"
              variant="contained"
              color="error"
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      )}
      <DialogAlert dangerFunction={deleteMenteesAccount} />
      <SnackbarMui snackBarText={snackBarText} />
    </>
  );
}
