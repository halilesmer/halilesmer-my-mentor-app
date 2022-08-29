import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip } from "@mui/material";

import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";

export default function MenteesProfilePage() {
  // const { userLogIn, setUserLogIn } = React.useContext(AppContext);
  const [menteesData, setMenteesData] = React.useState(null);
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
          "http://localhost:5001/api/mentees/menteesprofile",
          requestOptions
        );
        const result = await response.json();
        console.log("result: ", result);
        setMenteesData({
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          birthday: result.birthday,
          gender: result.gender,
          language: result.language,
          couching_medium: result.couching_medium,
          skills: result.skills,
          about: result.about,
          email: result.email,
          password: "",
          user_type: result.user_type,
          avatar_picture: result.avatar_picture,
        });
        // setMenteesData(result)
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    getProfile();
  }, []);



  console.log("menteesData: ", menteesData);

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
            <Button href='/mentees/edit-mentees' className="edit-profile-btn" variant="contained" fullWidth>
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
