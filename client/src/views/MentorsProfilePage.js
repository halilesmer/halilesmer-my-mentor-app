import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip } from "@mui/material";

import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";

export default function MentorsProfilePage() {
  // const { userLogIn, setUserLogIn } = React.useContext(AppContext);
  const [mentorsProfile, setMentorsProfile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const getProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/mentors/mentorsprofile",
          requestOptions
        );
        const result = await response.json();
        console.log("result: ", result);
        setMentorsProfile({
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          id: result.id,
          birthday: result.birthday,
          gender: result.gender,
          language: result.language,
          experience: result.experience,
          website: result.website,
          fee: result.fee,
          couching_medium: result.couching_medium,
          skills: result.skills,
          password: "",
          user_type: result.user_type,
          register_Date: result.register_Date,
          avatar_picture: result.avatar_picture,
        });
        // setMentorsProfile(result)
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    getProfile();
  }, []);



  console.log("mentorsProfile: ", mentorsProfile);

  return (
    <>
      {mentorsProfile && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
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
              <span>First Name: {mentorsProfile.first_name}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Last Name: {mentorsProfile.last_name}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Birthday: {formatDateDdMmYyyy(mentorsProfile.birthday)}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {mentorsProfile.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Languages: {mentorsProfile.language}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Experience in Years: {mentorsProfile.experience}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Website: {mentorsProfile.website}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Fee for one houer: {mentorsProfile.fee}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Couching Medium: {mentorsProfile.couching_medium}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Skills: {mentorsProfile.skills}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Email: {mentorsProfile.email}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Password: {mentorsProfile.password}</span>
            </Paper>
            <Paper elevation={4}>
              <span>{mentorsProfile.user_type}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Register Date: {formatDateDdMmYyyy(mentorsProfile.register_Date)}
              </span>
            </Paper>
            <Button href='/mentors/edit-mentor' className="edit-profile-btn" variant="contained" fullWidth>
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
