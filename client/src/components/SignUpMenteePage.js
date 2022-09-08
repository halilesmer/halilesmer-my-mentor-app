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
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import FormData from "form-data";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SignUpMenteePage() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [typedSkill, setTypedSkill] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(Boolean);
  const [isPwValid, setIsPwValid] = React.useState(Boolean);

  const [availableSkills, setAvailableSkills] =
    React.useState(predefinedSkills);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const [newUser, setNewUser] = React.useState({});

  const [termsAgr, setTermsAgr] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackBarAlert, setSnackBarAlert] = React.useState("");
  const navigate = useNavigate();
  const inputFile = React.useRef();

  // -------- Handle  Close   -------
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
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
  const { handlePwInputFocus, onBlur, focused } = React.useContext(AppContext);



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
  }; // ---- Handle Skills  ends -------

  //  ------- Handle Terms --------
  const handleTermsChange = (e) => {
    const checked = e.target.checked;
    checked ? setTermsAgr(true) : setTermsAgr(false);
  };
  // ----   Handle ------
  const handleAttachFileOnchange = (e) => {
    setSelectedImage(e.target.files[0]);
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
      const response = await fetch(
        "http://localhost:5001/api/mentees/imageupload",
        requestOptions
      );
      const result = await response.json();

      setNewUser({
        ...newUser,
        avatar_picture: result.imageUrl,
      });
      console.log("result- handleSubmitPictureClick: ", result);
      return result.imageUrl;
    } catch (error) {
      console.log("error, Picture upload failed: ", error);
    }
  }; // ---- Avatar Picture ---- ends ---- //

  // ---- Send Form Handle ------
  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const first_name = data.get("firstName").trim();
    const last_name = data.get("lastName").trim();
    const birthday = data.get("birthday").trim();
    const email = data.get("email").trim();
    const pw1 = data.get("password-1").trim();
    const pw2 = data.get("password-2").trim();
    setNewUser({
      ...newUser,
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      email: email,
      skills: selectedSkills,
      password: pw1,
    });

    // setFieldsInput({ ...fieldsInput, [e.target.name]: first_name });

    /* ---- Email Check ---- starts*/
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      console.log("valid email :>> ");
      setIsEmailValid(true);
    } else {
      console.log("invalid email");
      setIsEmailValid(false);
    }
    /* ---- Email Check ---- ends*/
    
    /* ---- Password Check ---- starts*/
    if (pw1 !== pw2) {
      console.log(
        "You first Passwords is not similar with 2nd password. Please enter same password in both"
      );
      setIsPwValid(false);
    } else if (pw1.length < 5) {
      console.log("Password validation is at least 6 character");
      setIsPwValid(false);
    } else {
      // setPassword(pw1);
    }
    /* ---- Password Check ---- ends*/

    const img = await handleSubmitPictureClick();

    if (img) {
      const userData = {
        ...newUser,
        avatar_picture: img,
      };


      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          first_name: first_name,
          last_name: last_name,
          birthday: data.get("birthday").trim(),
          email: email,
          skills: selectedSkills,
          password: pw1,
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:5001/api/mentees/signup",
          requestOptions
        );
        const results = await response.json();
        console.log("results handleSignUpFormSubmit: ", results);

        if (results.msg === "user allready exists") {
          setSnackBarAlert("User allready exists");
          handleClick();
        } else {
          navigate("/mentees/signin");
        }
      } catch (error) {
        console.log("error Submit new mentee", error.msg);

      }
    }
  };

  // console.log("selectedSkills: ", selectedSkills);
  // console.log("typedSkill: ", typedSkill);
  // console.log("couchingMedium: ", couchingMedium);
  // console.log("isEmailValid: ", isEmailValid);
  // console.log("isPwValid: ", isPwValid);
  // console.log('volunteer', volunteer)
  // console.log("fee: ", fee);
  console.log("newUser", newUser);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="sign-up-mentor-con"
        sx={{
          width: "80%",
          margin: "0px auto 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography component="h1" variant="h5">
          Mentee
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
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
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {snackBarAlert}
          </Alert>
        </Snackbar>
        <Box
          component="form"
          noValidate
          onSubmit={handleSignUpFormSubmit}
          sx={{ mt: 3 }}
        >
          <div className="avatar-picture-con" type="file">
            <div
              className="avatar-picture-box"
              onClick={onButtonSelectPictureClick}
            >
              <img
                src={selectedImage && URL.createObjectURL(selectedImage)}
                alt={selectedImage && "Thumb"}
                width="300"
              />

              {!selectedImage && (
                <span className="img-warn-txt">
                  Please choose a profile image (optional)
                </span>
              )}
            </div>
            <div className="image-events-con">
              <input
                type="file"
                id="file"
                onChange={handleAttachFileOnchange}
                ref={inputFile}
                style={{ display: "none" }}
              />

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
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                // value={firstName}
                // onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                type="text"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                type="date"
                required
                fullWidth
                id="birthday"
                label="Birthday"
                name="birthday"
                autoComplete="birthday"
              />
            </Grid>

            <Grid item xs={12} className="skillsInput">
              <div>Select Your Skills:</div>
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
                          selectedSkills.includes(button)
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
                    label="Type your interests"
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
                onFocus={handlePwInputFocus}
                onBlur={onBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!isPwValid}
                size="small"
                required
                fullWidth
                name="password-1"
                label="Password"
                type="password"
                id="password-1"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                name="password-2"
                label="Confirm Password"
                type="password"
                id="password-2"
                autoComplete="new-password"
                onFocus={handlePwInputFocus}
                onBlur={onBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the terms and conditions."
                onClick={(e) => handleTermsChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login-page">
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
