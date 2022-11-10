import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

import { AppContext } from "../contexts/appContext.js";
import DialogAlert from "../components/DialogAlert";
import SnackbarMui from "../components/SnackbarMui";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export default function MentorsProfilePage() {
  const {
    mentorsProfile,
    getMentorsProfile,
    handleOpenDialog,
    setDialogTxt1,
    setOpenSnackBar,
    snackBarText,
    setSnackBarText,
  } = React.useContext(AppContext);
  const token = getToken();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("useEffect-MentorsProfilePage");
    let didCancel = false;
    if (!didCancel) {
      getMentorsProfile();
      // getAllMentorsData && getAllMentorsData();
    }
    return () => (didCancel = true);
    // eslint-disable-next-line
  }, []);
  // ------- Delete Mentors Account ------- starts //
  const deleteMentorsAccount = async (commentId) => {
    const deleteOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ menteeId: mentorsProfile.id }),
    };
    try {
      const response = await fetch(
        "https://server-halilesmer.vercel.app/api/mentors/delete-account/",
        deleteOptions
      );
      localStorage.removeItem("token");
      setOpenSnackBar(true);
      setSnackBarText("Your account hase been deleted!");
      console.log("response-deleteMenteesAccount: ", response);
      navigate("/");
    } catch (error) {
      console.log("error deleting Mentors Account: ", error);
    }
  };

  // ------- Delete Mentors Account -------  ends //

  const handleDeleteClick = () => {
    handleOpenDialog();
    setDialogTxt1("Are you sure you want to delete your account?");
  };

  console.log("mentorsProfile: ", mentorsProfile && mentorsProfile);

  return (
    <>
      {mentorsProfile && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
          <Typography variant="h5" component="h5" textAlign="center" mb={1}>
            User Profile
          </Typography>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con">
            <div className="avatar-picture-box">
              {mentorsProfile.avatar_picture ? (
                <img
                  src={mentorsProfile?.avatar_picture}
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
              {mentorsProfile.first_name} {mentorsProfile.last_name} <br />{" "}
              (Mentor)
            </Typography>

            {/* {mentorsProfile.likes ? (
              mentorsProfile.likes.length > 0 && (
                <div className="mentor-follower-con">
                 You have <strong>
                    {mentorsProfile.likes.length}
                  </strong>{" "}
                  follower.
                </div>
              )
            ) : (
              <div className="mentor-follower-con">
                You don't have any followers yet
              </div>
            )}
            {!mentorsProfile && (
              <div className="mentor-follower-con">
                You don't have any followers yet
              </div>
            )} */}

            {mentorsProfile.likes.length > 0 ? (
              <div className="mentor-follower-con">
                You have <strong>{mentorsProfile.likes.length}</strong>{" "}
                follower.
              </div>
            ) : (
              <div className="mentor-follower-con">
                You don't have any followers yet
              </div>
            )}
            {/* {!mentorsProfile && (
              <div className="mentor-follower-con">
                You don't have any followers yet
              </div>
            )} */}

            <Paper elevation={4}>
              <span>
                Birthday: {formatDateDdMmYyyy(mentorsProfile.birthday)}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {mentorsProfile.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Languages:{" "}
                {mentorsProfile.language.map((lng, i) => (
                  <span key={i}>{lng}, </span>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>Experience in Years: {mentorsProfile.experience}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Website: {mentorsProfile.website}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Fee for one houer:{" "}
                {mentorsProfile.fee === 0
                  ? "Volunteer"
                  : mentorsProfile.fee + " €"}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Couching Medium:{" "}
                {mentorsProfile.couching_medium.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Skills:
                {mentorsProfile.skills.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>About: {mentorsProfile.about}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Email: {mentorsProfile.email}</span>
            </Paper>

            <Paper elevation={4}>
              <span>User Type:</span>{" "}
              <span style={{ textTransform: "capitalize" }}>
                {mentorsProfile.user_type}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Register Date:{" "}
                {formatDateDdMmYyyy(mentorsProfile.register_Date)}
              </span>
            </Paper>
            <Button
              href="/mentors/edit-mentor"
              className="edit-profile-btn"
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              className="delete-profile-btn"
              variant="contained"
              color="error"
              fullWidth
              style={{ borderRadius: "50px" }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      )}
      <DialogAlert dangerFunction={deleteMentorsAccount} />
      <SnackbarMui snackBarText={snackBarText} />
    </>
  );
}
