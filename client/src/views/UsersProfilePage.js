import "./usersProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../contexts/appContext";
import DialogAlert from "../components/DialogAlert";
import SnackbarMui from "../components/SnackbarMui";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import { nodeEnv } from "../utils/nodeEnv";

export default function UsersProfilePage() {
  const {
    userData,
    getMenteeData,
    getMentorsProfile,
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
  const { userType } = useParams();

  React.useEffect(() => {
    userType === "mentees"
      ? getMenteeData()
      : getMentorsProfile();
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
      body: JSON.stringify({ menteeId: userData.id }),
    };
    try {
      const response = await fetch(
        `${env}/${userType}/delete-account/`,
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
  console.log("userData: ", userData && userData);
  // console.log("env: ", env);
  // console.log('userType', loggerType)

  return (
    <>
      {userData && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
          <Typography variant="h5" component="h5" textAlign="center" mb={1}>
            User Profile
          </Typography>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con">
            <div className="avatar-picture-box">
              {userData.avatar_picture ? (
                <img src={userData?.avatar_picture} alt="avatar" width="300" />
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
              {userData.first_name} {userData.last_name} <br />
              {userType === "mentees" ? "(Mentee)" : "(Mentor)"}
            </Typography>

            {userType === "mentors" &&
              (userData.likes.length > 0 ? (
                <div className="mentor-follower-con">
                  You have <strong>{userData.likes.length}</strong> follower.
                </div>
              ) : (
                <div className="mentor-follower-con">
                  You don't have any followers yet
                </div>
              ))}

            {userType === "mentors" && (
              <Paper elevation={4}>
                <span>
                  Fee for one houer:{" "}
                  {userData.fee === 0 ? "Volunteer" : userData.fee + " €"}
                </span>{" "}
              </Paper>
            )}

            <Paper elevation={4}>
              <span>Birthday: {formatDateDdMmYyyy(userData.birthday)}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {userData.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Languages:
                {userData?.language?.map((item, i) => (
                  <li className="profile-info-box-list" key={i}>
                    {item}{" "}
                  </li>
                ))}
              </span>
            </Paper>

            {userType === "mentors" && (
              <Paper elevation={4}>
                <span>Experience in Years: {userData.experience}</span>
              </Paper>
            )}

            <Paper elevation={4}>
              <span>
                Couching Medium:
                {userData.couching_medium.map((item, i) => (
                  <li className="profile-info-box-list" key={i}>
                    {item}{" "}
                  </li>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                {userType === "mentees" ? "Interests:" : "Skills:"}
                {userData.skills.map((skill, i) => (
                  <li className="profile-info-box-list" key={i}>
                    {skill}{" "}
                  </li>
                ))}{" "}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>About: {userData.about}</span>
            </Paper>
            {userType === "mentors" && (
              <Paper elevation={4}>
                <span>Website: {userData?.website}</span>
              </Paper>
            )}

            <Paper elevation={4}>
              <span>Email: {userData.email}</span>
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
                {userData.user_type}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Register Date: {formatDateDdMmYyyy(userData.createdAt)}
              </span>
            </Paper>

            <Button
              href={`/${userType}/edit-mentee`}
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
