import "./MentorsProfilePage.css";

import * as React from "react";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Tooltip,
} from "@mui/material";

export default function MentorsProfilePage() {
  const [users, setUsers] = React.useState("d");

  // ---- Hndle Avatar Picture ---- starts ----
  const handleSubmitPictureClick = async (e) => {
    // e.preventDefault();
    // console.log("selectedImage: ", selectedImage);
    // if (!selectedImage) {
    //   setSnackBarAlert("Please select a picture first!");
    //   handleClick();
    // } else {
    //   const formData = new FormData();
    //   formData.append("image", selectedImage);
    //   console.log("formData: ", formData);

    //   const requestOptions = {
    //     method: "Post",
    //     body: formData,
    //   };

    //   try {
    //     const response = await fetch(
    //       "http://localhost:5001/api/users/mentors/imageupload",
    //       requestOptions
    //     );
    //     const result = await response.json();
    //     console.log("result: ", result);

    //     setNewUser({
    //       ...newUser,
    //       avatarPicture: result.imageUrl,
    //     });
    //     // setNewUser({ ...newUser, avatarPicture: result.imageUrl });
    //   } catch (error) {
    //     console.log("error: ", error);
    //   }
    // }
  }; // ---- Avatar Picture ---- ends ---- //


  // ---- get Mentors ---- starts ----
 
  const getAllMentors = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/users/mentors/allmentors"
      );
      const result = await response.json();
      setUsers(result);
      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // ---- Avatar Picture ---- ends ---- //

  React.useEffect(() => {
    getAllMentors();
  }, []);


  console.log("users: ", users);

  return (
    <Box component="div" sx={{ mt: 0 }}>
      {/* ------------ Avatar Picture ---------- */}
      <div className="avatar-picture-con" type="file">
        <div className="avatar-picture-box">
          {users.avatarPicture && (
            <img src={users.avatarPicture} alt="avatar" width="300" />
          )}
          {!users.avatarPicture && (
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
      >
        {users &&
          users.map((user) => {
            return (
              <Paper elevation={4}>
                <span>
                  {Object.keys(user.first_name)}: {user.last_name}
                </span>
              </Paper>
            );
          })}
      </Box>
    </Box>
  );
}
