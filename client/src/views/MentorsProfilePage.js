import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip } from "@mui/material";

import { AppContext } from "../contexts/appContext";
import { getToken } from "../utils/getToken";

export default function MentorsProfilePage() {
  // const { userLogIn, setUserLogIn } = React.useContext(AppContext);
  const [mentorsProfile, setMentorsProfile] = React.useState(null);
const [error, setError] = React.useState(null);

  const getProfile = async () => {
    const token = getToken();
    // const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/mentors/mentorsprofile/",
          requestOptions
        );
        const result = await response.json();
        console.log("result: ", result);
        setMentorsProfile({
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          id: result.id,
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

  const handleSubmitPictureClick = (e) => {};

  console.log("mentorsProfile: ", mentorsProfile);

  return (
    <>
      {mentorsProfile && (
        <Box component="div" sx={{ mt: 0 }}>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con" type="file">
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
              <Button onClick={handleSubmitPictureClick}>Upload Picture</Button>
            </div>
          </div>
          <Box
            className="user-info-con"
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

          {/* <Paper elevation={4}>
            <h3>{mentorsProfile.last_name}</h3>
          </Paper> */}
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
