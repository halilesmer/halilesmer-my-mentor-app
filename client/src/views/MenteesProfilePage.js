import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";

import { AppContext } from "../contexts/appContext";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import { useNavigate } from "react-router-dom";

export default function MenteesProfilePage() {
  const { menteesData, getMenteeData } = React.useContext(AppContext);

  const [error, setError] = React.useState(null);
  const token = getToken();
  const navigate = useNavigate();
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
      body: JSON.stringify({ menteeId: menteesData.id }),
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/mentees/delete-account/",
        deleteOptions
      );
      console.log("response-deleteMenteesAccount: ", response);
      navigate("/");
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
              {menteesData.first_name} {menteesData.last_name} <br /> Mentee
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
              <span>Experience in Years: {menteesData.experience}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Website: {menteesData.website}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Fee for one houer: {menteesData.fee}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Couching Medium: {menteesData.couching_medium}</span>
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
              <span>Email: {menteesData.email}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Password: {menteesData.password}</span>
            </Paper>
            <Paper elevation={4}>
              <span>User Type: {menteesData.user_type}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Register Date: {formatDateDdMmYyyy(menteesData.register_Date)}
              </span>
            </Paper>
            <Button
              href="/mentees/edit-mentees"
              className="edit-profile-btn"
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
            <Button
              onClick={deleteMenteesAccount}
              // href="/mentees/edit-mentees"
              className="edit-profile-btn"
              variant="contained"
              color="error"
              fullWidth
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

/*  {menteesData &&
          menteesData.map((user) => {
            return (
              <Paper elevation={4}>
                <span>
                  {user.last_name}
                </span>
              </Paper>
            );
          })} */
