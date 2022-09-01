import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip } from "@mui/material";

import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import { useParams } from "react-router-dom";

export default function MentorsDetailsPage() {
  // const { userLogIn, setUserLogIn } = React.useContext(AppContext);
  const [mentor, setMentor] = React.useState(null);
  // const { mentor && mentor } = mentor;
  const [error, setError] = React.useState(null);
  const token = getToken();
  const { mentorId } = useParams();

  // console.log("mentorId: ", mentorId);

  const getMentorsProfile = async () => {
    // const mentorsId = { mentorsId: mentorId };

    if (token) {
      // const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${token}`, {
      //   "Content-Type": "application/json",
      // });
      

      // myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: {
        //   mentorId: "6304ddef48c5f4b1ec2b65af",
        // },

        body: JSON.stringify({
          mentorId: mentorId,
        }),
      };
      try {
        const response = await fetch(
          // `http://localhost:5001/api/mentors/getonementor/${mentorId}`,
          `http://localhost:5001/api/mentors/getonementor`,

          requestOptions
        );
        const result = await response.json();
        console.log("result.mentor: ", result.mentor);
        setMentor(result.mentor);
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    getMentorsProfile();
  }, []);

  // console.log("mentor: ", mentor && mentor.mentor.first_name);
  console.log("token: ");
  console.log("mentor: ", mentor);

  return (
    <>
      {mentor && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con">
            <div className="avatar-picture-box">
              {mentor.avatar_picture ? (
                <img src={mentor?.avatar_picture} alt="avatar" width="300" />
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
              <span>First Name: {mentor.first_name}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Last Name: {mentor.last_name}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Birthday: {formatDateDdMmYyyy(mentor.birthday)}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {mentor.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Languages: {mentor.language}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Experience in Years: {mentor.experience}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Website: {mentor.website}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Fee for one houer: {mentor.fee}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Couching Medium: {mentor.couching_medium}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Skills:
                {mentor.skills.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
              </span>
            </Paper>

            <Paper elevation={4}>
              <span>
                Register Date: {formatDateDdMmYyyy(mentor.register_Date)}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>About:<br/> {mentor?.about}</span>
            </Paper>
            <Button
              href="/mentors/edit-mentor"
              className="edit-profile-btn"
              variant="contained"
              fullWidth
            >
              Chat
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

/*  {mentor &&
          mentor.map((user) => {
            return (
              <Paper elevation={4}>
                <span>
                  {user.last_name}
                </span>
              </Paper>
            );
          })} */
