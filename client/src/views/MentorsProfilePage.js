import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";

import {AppContext} from "../contexts/appContext.js";
import { formatDateDdMmYyyy } from "../utils/formatData.js";

export default function MentorsProfilePage() {
  const { mentorsProfile, getMentorsProfile } = React.useContext(AppContext);

  React.useEffect(() => {
    getMentorsProfile();
  }, []);

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
              Mentor
            </Typography>

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
                  <span key={i}>{lng.title}, </span>
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
              <span>Fee for one houer: {mentorsProfile.fee} €</span>
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
              <span>Email: {mentorsProfile.email}</span>
            </Paper>

            <Paper elevation={4}>
              <span>User Type: {mentorsProfile.user_type}</span>
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
          </Box>
        </Box>
      )}
    </>
  );
}

/*  {mentorsProfile &&
          mentorsProfile.map((user) => {
            return (
              <Paper elevation={4}>
                <span>
                  {user.last_name}
                </span>
              </Paper>
            );
          })} */
