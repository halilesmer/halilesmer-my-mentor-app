import "./signsEditsUser.css";

import * as React from "react";

import {
  Alert,
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { formatDataYyMmDd, formatDateDdMmYyyy } from "../utils/formatData.js";
import { languages, predefinedSkills } from "../data.js/inputData.js";

import { AppContext } from "../contexts/appContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorPage from "../views/ErrorPage";
import FormData from "form-data";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { emailCheck } from "../utils/validations.js";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function EditMentee() {
  const { handlePwInputFocus, onBlur } = React.useContext(AppContext);
  const [editedUserData, setEditedUserData] = React.useState(null);
  const [preview, setPreview] = React.useState();

  const [error, setError] = React.useState(null);

  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [typedSkill, setTypedSkill] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isPwValid, setIsPwValid] = React.useState(true);

  const [couchingMedium, setCouchingMedium] = React.useState([]);

  const [volunteer, setVolunteer] = React.useState(false);
  const [availableSkills, setAvailableSkills] =
    React.useState(predefinedSkills);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // const [editedUserData, setEditedUserData] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [snackBarAlert, setSnackBarAlert] = React.useState("");
  const [spinner, setSpinner] = React.useState(true);
  const token = getToken();
  const navigate = useNavigate();
  const inputFile = React.useRef();

  // -------- Handle  Close   -------
  const handleSnackbarClick = () => {
    setOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // -------- Onbutton Select Picture  -------
  const onButtonSelectPictureClick = () => {
    inputFile.current.click();
  };

  // -------- Remove Selected Image  -------
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  // -------- Handle Input Value   ends -------
  const handleInputValueChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };
  // -------- Handle Input Value   ends -------

  // -------- Handle Language  -------
  const handleLanguageOnChange = (e, value) => {
    console.log("value: ", value);
    // const languageArray = value.map((obj) => {
    //   return obj.title ;
    // });
    setEditedUserData({
      ...editedUserData,
      language: value,
    });
  };

  // ---- Handle Couching Medium  / starts -------
  let couchMd = ["Presence", "Video", "Audio"];
  const handleCouchingMediumClick = (button) => {
    if (couchingMedium.includes(button)) {
      setCouchingMedium(couchingMedium.filter((item) => item !== button));
    } else {
      setCouchingMedium([...couchingMedium, button]);
    }
  };

  React.useEffect(() => {
    setEditedUserData({ ...editedUserData, couching_medium: couchingMedium });
  }, [couchingMedium]);
  // ---- Handle Couching Medium  / ends -------

  // ---- Handle Skills  starts -------
  const handleSkillsClick = (button) => {
    if (button === "") {
      return null;
    }
    if (selectedSkills.includes(button)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== button));
      setTypedSkill("");
    } else {
      setSelectedSkills([...selectedSkills, button]);
      // if the new skills are not available in skills button group, they will be added/ showing
      if (!availableSkills.includes(button)) {
        setAvailableSkills([...availableSkills, button]);
      }
      setTypedSkill("");
    }
  };

  const handleSkillsEnter = (e) => {
    e.preventDefault();

    if (e.key === "Enter" && typedSkill) {
      handleSkillsClick(typedSkill);
    }
  };

  React.useEffect(() => {
    setEditedUserData({ ...editedUserData, skills: selectedSkills });
  }, [selectedSkills]);
  // ---- Handle Skills  ends -------

  // ----   Handle ------
  const handleSelectFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // ---- Hndle Avatar Picture ---- starts ----
  const handleSubmitPictureClick = async (e) => {
   
    const avatarPicture =
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
    if (!selectedImage) {
      return avatarPicture;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    console.log("formData: ", formData);

    const requestOptions = {
      method: "Post",
      body: formData,
    };

    try {
      setSpinner(true);
      const response = await fetch(
        "http://localhost:5001/api/mentees/imageupload",
        requestOptions
      );
      const result = await response.json();

      setEditedUserData({
        ...editedUserData,
        avatar_picture: result.imageUrl,
      });
      setSpinner(false);
      console.log("result- handleSubmitPictureClick: ", result);
      return result.imageUrl;
    } catch (error) {
      console.log("error, Picture upload failed: ", error);
      setSpinner(false);
    }
  }; // ---- Avatar Picture ---- ends ---- //

  // ---- Send Form Handle ------
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    /* ---- Email Check ---- starts*/
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(editedUserData.email)) {
      console.log("valid email :>> ");
      setIsEmailValid(true);
    } else {
      console.log("invalid email");
      setIsEmailValid(false);
    }

    const checkEmail = emailCheck(editedUserData.email);
    if (checkEmail) {
      console.log("valid email :>> ");
      setIsEmailValid(true);
    } else {
      console.log("invalid email");
      setIsEmailValid(false);

      return false;
    }
    /* ---- Email Check ---- ends*/

    /* ---- Password Check ---- starts*/
    if (editedUserData.password !== password2) {
      console.log(
        "Your first Password is not similar with 2nd password. Please enter same password in both fields."
      );
      setIsPwValid(false);
      return false;
    } else if (editedUserData.password.length < 5) {
      console.log("Password validation is at least 6 character");
      setIsPwValid(false);
      return false;
    } else {
      setEditedUserData({
        ...editedUserData,
        password: password1,
      });
    }
    /* ---- Password Check ---- ends*/

    const img = await handleSubmitPictureClick();

    if (img) {
      const userData = {
        ...editedUserData,
        avatar_picture: img,
      };
      let requestOptions = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      };

      try {
        const response = await fetch(
          "http://localhost:5001/api/mentees/editmentee",
          requestOptions
        );
        const results = await response.json();
        console.log("results- handleEditSubmit: ", results);
        navigate("/mentees/profile");
      } catch (error) {
        console.log("error Submit edited mentee", error.msg);
      }
    }
  };

  // ------ Get profile data  ----------- starts--
  const getMenteesProfile = async () => {
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
        console.log("result - getMenteesProfile: ", result);
        const profileData = {
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          id: result.id,
          birthday: result.birthday,
          gender: result.gender,
          language: result.language,
          experience: result.experience,
          couching_medium: result.couching_medium,
          skills: result.skills,
          about: result?.about,
          password: "",
          user_type: result.user_type,
          register_Date: result.register_Date,
          avatar_picture: result.avatar_picture,
        };
        // setMtrsCurrData(profileData);
        setEditedUserData(profileData);
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    //  getMenteeData();
    getMenteesProfile();
    // setEditedUserData(menteesData && menteesData);
  }, []);
  // ------ Get profile data  ----------- ends--


  console.log("selectedImage :>> ", selectedImage);
  console.log("editedUserData", editedUserData);
  // console.log("password1: ", password1);
  // console.log("password2: ", password2);

  //   console.log("test1: ", test2);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {editedUserData === null ||
        editedUserData === undefined ||
        editedUserData === "" ? (
          <ErrorPage error="Loading Profile page..." />
        ) : (
          <Box
            className="sign-up-mentor-con"
            sx={{
              width: "80%",
              margin: "8px auto 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit
            </Typography>
            <Typography component="h1" variant="h5">
              Mentee
            </Typography>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleSnackBarClose}
              message="Note archived"
              action={action}
              style={{
                width: "fitContent",
                height: "5rem",
                maxWidth: "70%",
                bottom: "45vh",
                margin: "auto",
                left: "unset",
                right: "unset",
                border: "dotted red 2px",
                borderRadius: "5px",
                background: "rgb(255, 244, 229)",
              }}
            >
              <Alert
                onClose={handleSnackBarClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                {snackBarAlert}
              </Alert>
            </Snackbar>
            <Box
              component="form"
              noValidate
              onSubmit={handleEditSubmit}
              sx={{ mt: 3 }}
            >
              <div className="avatar-picture-con" type="file">
                <div
                  className="avatar-picture-box"
                  onClick={onButtonSelectPictureClick}
                >
                  {/* <img src={URL.createObjectURL(selectedImage)} alt="avatar" /> */}
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : editedUserData.avatar_picture
                        ? editedUserData.avatar_picture
                        : ""
                    }
                    alt="avatar"
                  />

                  {!editedUserData.avatar_picture && !selectedImage && (
                    <span>Please choose a profile image (optional)</span>
                  )}
                </div>
                <div className="image-events-con">
                  {/* <input type="file" onChange={handleSelectFileChange} /> */}
                  <input
                    accept="image/*"
                    type="file"
                    id="file"
                    onChange={handleSelectFileChange}
                    ref={inputFile}
                    style={{ display: "none" }}
                  />{" "}
                  {selectedImage && (
                    <Button
                      size="small"
                      onClick={removeSelectedImage}
                      className="remove-image-btn"
                    >
                      Remove This Image
                    </Button>
                  )}
                </div>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="first_name"
                    label="Your first name"
                    required
                    fullWidth
                    autoComplete="off"
                    id="first_name"
                    // label="First Name
                    // autoFocus
                    value={
                      editedUserData.first_name ? editedUserData.first_name : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    required
                    fullWidth
                    label="Your last name"
                    autoComplete="off"
                    id="last_name"
                    name="last_name"
                    value={
                      editedUserData.last_name ? editedUserData.last_name : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    type="date"
                    required
                    fullWidth
                    autoComplete="off"
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    value={
                      editedUserData.birthday
                        ? formatDataYyMmDd(editedUserData.birthday)
                        : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      name="gender"
                      // value={gender}
                      label="Gender"
                      value={editedUserData.gender ? editedUserData.gender : ""}
                      onChange={handleInputValueChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    multiple
                    options={languages.map((lgn) => lgn.title)}
                    isOptionEqualToValue={(option, v) => {
                      return option === v;
                    }}
                    // value={
                    //   editedUserData.language}
                    value={
                      editedUserData.language ? editedUserData.language : []
                    }
                    onChange={handleLanguageOnChange}
                    id="language"
                    name="language"
                    // disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
                        placeholder="Language"
                        // defaultValue="The Godfather"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} className="couchingMedium-con">
                  <div>Select Your Couching Medium:</div>
                  <div
                    className=""
                    style={{
                      width: "100%",
                      border: "solid 1px #d1d1d1",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "95%",
                        border: "solid 1px #d1d1d1",
                        borderRadius: "4px",
                        margin: "4px auto 4px auto",
                      }}
                    >
                      {couchMd.map((button, i) => {
                        return (
                          <Button
                            key={i}
                            size="small"
                            id={`chouching` + i}
                            className={
                              editedUserData &&
                              editedUserData?.couching_medium?.includes(button)
                                ? "checkBtnClicked"
                                : "checkBtnUnclicked"
                            }
                            // styles={styles.checkBtn}
                            variant="contained"
                            onClick={() => handleCouchingMediumClick(button)}
                          >
                            {button}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} className="skillsInput">
                  <div>Topics you want to get help with:</div>
                  <div
                    className=""
                    style={{
                      width: "100%",
                      border: "solid 1px #d1d1d1",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "95%",
                        border: "solid 1px #d1d1d1",
                        borderRadius: "4px",
                        margin: "4px auto 4px auto",
                      }}
                    >
                      {availableSkills.map((button, i) => {
                        return (
                          <Button
                            key={`couching` + i}
                            size="small"
                            id={i}
                            className={
                              editedUserData &&
                              editedUserData?.skills?.includes(button)
                                ? "checkBtnClicked"
                                : "checkBtnUnclicked"
                            }
                            // styles={styles.checkBtn}
                            variant="contained"
                            onClick={() => handleSkillsClick(button)}
                          >
                            {button}
                          </Button>
                        );
                      })}
                    </div>
                    <p style={{ margin: "5px" }}>or type it here:</p>
                    <div
                      className="type-skills-input-con"
                      style={{ width: "100%" }}
                    >
                      <TextField
                        style={{
                          margin: "0 auto 5px auto",
                          width: "95%",
                          display: "flex",
                        }}
                        size="small"
                        // fullWidth
                        id="skills"
                        label="Type your Skills"
                        name="skills"
                        value={typedSkill}
                        onKeyUp={handleSkillsEnter}
                        onChange={(e) => setTypedSkill(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() => handleSkillsClick(typedSkill)}
                              >
                                Add
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="about"
                    multiline
                    maxRows={20}
                    minRows={3}
                    label="Tell Me Something Interesting About Yourself"
                    fullWidth
                    autoComplete="off"
                    id="about"
                    // label="First Name
                    // autoFocus
                    value={editedUserData.about ? editedUserData.about : ""}
                    onChange={handleInputValueChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    // color="error"
                    error={!isEmailValid}
                    size="small"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={editedUserData.email ? editedUserData.email : ""}
                    onChange={handleInputValueChange}
                    // onFocus={handlePwInputFocus}
                    // onBlur={onBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!isPwValid}
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password-1"
                    autoComplete="new-password"
                    value={
                      editedUserData.password ? editedUserData.password : ""
                    }
                    onChange={handleInputValueChange}
                    // value={password1}
                    // onChange={(e) => setPassword1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!isPwValid}
                    size="small"
                    required
                    fullWidth
                    name="password-2"
                    label="Confirm Password"
                    type="password"
                    id="password-2"
                    autoComplete="new-password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    // onFocus={handlePwInputFocus}
                    // onBlur={onBlur}
                  />
                </Grid>
              </Grid>
              <div
                className="btn-con"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  href="/mentees/profile"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 3, mb: 2, width: "30px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                >
                  Save
                </Button>
              </div>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
