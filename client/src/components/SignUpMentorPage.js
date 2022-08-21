import "./SignUpMentorPage.css";

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
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SignUpMentorPage() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [typedSkill, setTypedSkill] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(Boolean);
  const [isPwValid, setIsPwValid] = React.useState(Boolean);

  const [gender, setGender] = React.useState("");
  const [language, setLanguage] = React.useState([]);
  const [couchingMedium, setCouchingMedium] = React.useState([]);

  const [fee, setFee] = React.useState(Number);
  const [volunteer, setVolunteer] = React.useState("");
  const [availableSkills, setAvailableSkills] =
    React.useState(predefinedSkills);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const [newUser, setNewUser] = React.useState({});

  const [termsAgr, setTermsAgr] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackBarAlert, setSnackBarAlert] = React.useState("");

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
  const { handlePwInputFocus, onBlur, focused } = React.useContext(AppContext);

  // -------- Handle Gender  -------
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // -------- Handle Language  -------
  const handleLanguageOnChange = (e, value) => {
    setLanguage(value.filter((item) => Object.values(item)));
    // setLanguage(Object.values(value));
    // setLanguage(value.map((obj)=> obj.name));
    // value.map((obj) => setLanguage(obj.name));

    // setLanguage(
    //   value.map(({ title }) => {
    //     return title;
    //   })
    // );
  };

  // -------- Handle Volunteer  -------
  const handleSelectVolunteerClick = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    // setVolunteer(value);
    if (checked) {
      setVolunteer(value);
      setFee(0);
    } else {
      setVolunteer("");
    }
  };
  // ---- Handle Couching Medium -------
  let couchMd = ["Presence", "Video", "Audio"];
  const handleCouchingMediumClick = (button) => {
    if (couchingMedium.includes(button)) {
      setCouchingMedium(couchingMedium.filter((item) => item !== button));
    } else {
      setCouchingMedium([...couchingMedium, button]);
    }
  };

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
    e.preventDefault();
    if (!selectedImage) {
      setSnackBarAlert("Please select a picture first!");
      handleClick();
    } else {
      const formData = new FormData();
      formData.append("image", selectedImage);
      console.log("formData: ", formData);

      const requestOptions = {
        method: "Post",
        body: formData,
      };

      try {
        const response = await fetch(
          "http://localhost:5001/api/users/mentors/imageupload",
          requestOptions
        );
        const result = await response.json();
        console.log("result: ", result);

        setNewUser({
          ...newUser,
          avatar_Picture: result.imageUrl,
        });
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }; // ---- Avatar Picture ---- ends ---- //

  // ---- Send Form Handle ------
  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const first_name = data.get("firstName").trim();
    const last_name = data.get("lastName").trim();
    const birthday = data.get("birthday").trim();
    const experience = data.get("experience").trim();
    const website = data.get("mentor-website").trim();
    const email = data.get("email").trim();
    const pw1 = data.get("password-1").trim();
    const pw2 = data.get("password-2").trim();
    setNewUser({
      ...newUser,
      first_name: first_name,
      last_name: last_name,
      birthday: data.get("birthday").trim(),
      gender: gender,
      language: language.map((obj) => obj.title),
      experience: experience,
      website: website,
      fee: fee,
      couching_medium: couchingMedium,
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
    // let urlencoded = new URLSearchParams();
    // let urlencoded= {

    // }

    // urlencoded.append("first_name", first_name);
    // urlencoded.append("last_name", last_name);
    // urlencoded.append("birthday", birthday);
    // urlencoded.append("gender", gender);
    // urlencoded.append(
    //   "language",
    //   language.map((obj) => obj.title)
    // );
    // urlencoded.append("experience", experience);
    // urlencoded.append("website", website);
    // urlencoded.append("fee", fee);
    // urlencoded.append("couching_medium", couchingMedium);
    // urlencoded.append("email", email);
    // urlencoded.append("skills", selectedSkills);
    // urlencoded.append("password", pw1);
    // urlencoded.append(
    //   "avatar_Picture",
    //   newUser.avatar_Picture
    //     ? newUser.avatar_Picture
    //     : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    // );

  console.log("newUser", newUser);
    
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/mentors/signup",
        requestOptions
      );
      const results = await response.json();
      console.log("results: ", results);

      if (results.msg === "user allready exists") {
        setSnackBarAlert("user allready exists");
        handleClick();
      }
    } catch (error) {
      console.log("error fetching", error.msg);
    }
  };

  // console.log("selectedSkills: ", selectedSkills);
  // console.log("typedSkill: ", typedSkill);
  // console.log("couchingMedium: ", couchingMedium);
  // console.log("isEmailValid: ", isEmailValid);
  // console.log("isPwValid: ", isPwValid);
  // console.log('volunteer', volunteer)
  // console.log("fee: ", fee);
  // console.log("language", language);
  // console.log("selectedImage :>> ", selectedImage);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          Sign up
        </Typography>
        <Typography component="h1" variant="h5">
          Mentor
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
              {newUser.avatar_Picture && (
                <img src={newUser.avatar_Picture} alt="avatar" width="300" />
              )}
              {!newUser.avatar_Picture && (
                <span>Please chouse a profile image (optional)</span>
              )}
            </div>
            <div className="image-events-con">
              {/* <input type="file" onChange={handleAttachFileOnchange} /> */}
              <input
                type="file"
                id="file"
                onChange={handleAttachFileOnchange}
                ref={inputFile}
                style={{ display: "none" }}
              />
              {/* <button onClick={onButtonSelectPictureClick}>Open file upload window</button> */}
              <button onClick={handleSubmitPictureClick}>Upload Picture</button>
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
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
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
                onChange={handleLanguageOnChange}
                multiple
                id="language"
                options={languages}
                name="language"
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                // style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Language"
                    placeholder="Language"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                type="number"
                fullWidth
                id="experience"
                label="Experience"
                name="experience"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                type="text"
                fullWidth
                id="mentor-website"
                label="Website"
                name="mentor-website"
                autoComplete="website"
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip disableFocusListener title="Please choise your fee">
                <IconButton>
                  <InfoIcon size="10px" />
                </IconButton>
              </Tooltip>
              <TextField
                style={{ width: "5rem" }}
                size="small"
                required
                type=""
                placeholder=""
                id="fee"
                label="Fee"
                disabled={volunteer !== ""}
                name="fee"
                autoComplete="off"
                // value={fee}
                value={volunteer !== "" ? volunteer : fee}
                onChange={(e) => setFee(e.target.value)}
              />
              <span style={{ padding: "0 0.5rem " }}>,00 EUR</span>
              <span style={{ padding: "0 1rem " }}>or</span>
              <FormControlLabel
                control={<Checkbox />}
                label="Volunteer"
                value="Volunteer"
                onClick={(e) => handleSelectVolunteerClick(e)}
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
                          couchingMedium.includes(button)
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
