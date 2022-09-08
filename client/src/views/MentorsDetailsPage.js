import "./MentorsProfilePage.css";

import * as React from "react";

import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";

import { AppContext } from "../contexts/appContext";
import Comments from "../components/Comments.js";
import { formatDateDdMmYyyy } from "../utils/formatData.js";
import { getToken } from "../utils/getToken.js";
import { useParams } from "react-router-dom";

export default function MentorsDetailsPage() {
  const { userLogIn, setUserLogIn, setUserType } = React.useContext(AppContext);
  const [mentor, setMentor] = React.useState(null);
  // const { mentor && mentor } = mentor;
  const [error, setError] = React.useState(null);
  const token = getToken();
  const { mentorId } = useParams();

  const getMentorsProfile = async () => {

    if (token) {
   
      const requestOptions = {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   mentorId: mentorId,
        // }),
      };
      try {
        const response = await fetch(
          `http://localhost:5001/api/mentors/getonementor/${mentorId}`,
          requestOptions
        );
        const result = await response.json();
        setMentor(result.mentor);
        setUserType("mentor");
      } catch (error) {
        setError(true);
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    getMentorsProfile();
  }, []);

  // console.log("mentor: ", mentor && mentor.mentor.first_name);
  // console.log("token: ");
  // console.log("mentor: ", mentor);

  return (
    <>
      {mentor && (
        <Box className="user-info-con" component="div" sx={{ mt: 0 }}>
          {/* ------------ Avatar Picture ---------- */}
          <div className="avatar-picture-con">
            <div className="avatar-picture-box" style={{ cursor: "unset" }}>
              {mentor.avatar_picture ? (
                <img src={mentor?.avatar_picture} alt="avatar" width="300" />
              ) : (
                <img
                  width="300px"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  alt="avatar"
                />
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
              {mentor.first_name} {mentor.last_name}<br/> (Mentor)
            </Typography>

            <Paper elevation={4}>
              <span>Birthday: {formatDateDdMmYyyy(mentor.birthday)}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Gender: {mentor.gender}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Languages:
                {mentor.language.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
              </span>
            </Paper>
            <Paper elevation={4}>
              <span>Experience in Years: {mentor.experience}</span>
            </Paper>
            <Paper elevation={4}>
              <span>Website: {mentor.website}</span>
            </Paper>
            <Paper elevation={4}>
              {/* <span>Fee for one houer: {mentor.fee} €</span> */}
              <span>Fee for one houer: {mentor.fee === 0 ? 'Volunteer' : (mentor.fee + " €")}</span>
            </Paper>
            <Paper elevation={4}>
              <span>
                Couching Medium:
                {mentor.couching_medium.map((skill, i) => (
                  <span key={i}>{skill}, </span>
                ))}
              </span>
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
              <span>
                About:
                <br /> {mentor?.about}
              </span>
            </Paper>
          </Box>
        </Box>
      )}
      {/* --------- Chat Component ---------- */}
      <Comments mentorsId={mentorId}/>
  
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
