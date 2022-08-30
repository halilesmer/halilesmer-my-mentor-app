import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip } from "@mui/material";

import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import { AppContext } from "../contexts/appContext";

export default function MenteesProfilePage() {
  const { userLogIn, setUserLogIn, menteesData, getMenteeData } =
    React.useContext(AppContext);

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getMenteeData();
  }, []);

  console.log("menteesData: ", menteesData && menteesData);

  return (
    <>
      {menteesData && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
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
                <span>Please chouse a profile image (optional)</span>
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
            <Paper elevation={4}>
              <span>First Name: {menteesData.first_name}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Last Name: {menteesData.last_name}</span>
            </Paper>
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
              <span>Skills: {menteesData.skills}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Email: {menteesData.email}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Password: {menteesData.password}</span>
            </Paper>
            <Paper elevation={4}>
              <span>{menteesData.user_type}</span>
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
