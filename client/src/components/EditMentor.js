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
import FormControlLabel from "@mui/material/FormControlLabel";
import FormData from "form-data";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { emailCheck } from "../utils/validations.js";
import { getToken } from "../utils/getToken";

const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function EditMentor() {
  const [test2, setTest2] = React.useState([]);

  const [mtrsCurrData, setMtrsCurrData] = React.useState({});
  const [editedUserData, setEditedUserData] = React.useState({});

  const handleInputValueChange = (e) => {
    console.log("e: ", e.target.value);
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };
  const [error, setError] = React.useState(null);

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

  // const [editedUserData, setEditedUserData] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [snackBarAlert, setSnackBarAlert] = React.useState("");
  const [spinner, setSpinner] = React.useState(true);
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
  // const handleGenderChange = (e) => {
  //   setGender(e.target.value);
  // };

  // -------- Handle Language  -------
  const handleLanguageOnChange = (e, value) => {    
    const languageArray= value.map((obj) => obj.title);
setEditedUserData({
  ...editedUserData, language: languageArray
})

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
        setSpinner(true);
        const response = await fetch(
          "http://localhost:5001/api/mentors/imageupload",
          requestOptions
        );
        const result = await response.json();
        console.log("result: ", result);

        setEditedUserData({
          ...editedUserData,
          avatar_picture: result.imageUrl,
        });
        setSpinner(false);
      } catch (error) {
        console.log("error: ", error);
        setSpinner(false);
      }
    }
  }; // ---- Avatar Picture ---- ends ---- //

  // ---- Send Form Handle ------
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    // const first_name = data.get("firstName").trim();
    // const last_name = data.get("lastName").trim();
    // const birthday = data.get("birthday").trim();
    // const experience = data.get("experience").trim();
    // const website = data.get("mentor-website").trim();
    // const email = data.get("email").trim();
    // const pw1 = data.get("password-1").trim();
    // const pw2 = data.get("password-2").trim();
    // setEditedUserData({
    //   ...editedUserData,
    //   first_name: first_name,
    //   last_name: last_name,
    //   birthday: data.get("birthday").trim(),
    //   gender: gender,
    //   language: language.map((obj) => obj.title),
    //   experience: experience,
    //   website: website,
    //   fee: fee,
    //   couching_medium: couchingMedium,
    //   email: email,
    //   skills: selectedSkills,
    //   password: pw1,
    // });

    // setFieldsInput({ ...fieldsInput, [e.target.name]: first_name });

    /* ---- Email Check ---- starts*/
    const checkEmail = emailCheck(editedUserData.email);
    if (checkEmail) {
      console.log("valid email :>> ");
      setIsEmailValid(true);
    } else {
      console.log("invalid email");
      setIsEmailValid(false);
    }

    /* ---- Email Check ---- ends*/
    /* ---- Password Check ---- starts*/

    // if (pw1 !== pw2) {
    //   console.log(
    //     "You first Passwords is not similar with 2nd password. Please enter same password in both"
    //   );
    //   setIsPwValid(false);
    // } else if (pw1.length < 5) {
    //   console.log("Password validation is at least 6 character");
    //   setIsPwValid(false);
    // } else {
    // }
    /* ---- Password Check ---- ends*/

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/mentors/signup",
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

  // ------ Get profile data  ----------- starts--
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
        const profileData = {
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
        };
        setMtrsCurrData(profileData);
        setEditedUserData(profileData);

        // set new state for autocomplete input
        const lang = [];
        result.language.map((lng) => {
         return lang.push({ title: lng });
        });
        setTest2(lang);

        // setMtrsCurrData(result)
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  React.useEffect(() => {
    getProfile();
  }, []);
  // ------ Get profile data  ----------- ends--



  // console.log("selectedSkills: ", selectedSkills);
  // console.log("typedSkill: ", typedSkill);
  // console.log("couchingMedium: ", couchingMedium);
  // console.log("isEmailValid: ", isEmailValid);
  // console.log("isPwValid: ", isPwValid);
  // console.log('volunteer', volunteer)
  // console.log("fee: ", fee);
  console.log("language", language);
  // console.log("selectedImage :>> ", selectedImage);
  console.log("editedUserData", editedUserData);
  console.log("test2: ", test2);

  //   console.log("test1: ", test2);
  const obj = [
    {
      title: "Afar",
      nativeTitle: "Afaraf",
    },
    {
      title: "Afrikaans",
      nativeTitle: "Afrikaans",
    },
  ];
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {mtrsCurrData === null ||
        mtrsCurrData === undefined ||
        mtrsCurrData === "" ? (
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
              onSubmit={handleEditSubmit}
              sx={{ mt: 3 }}
            >
              <div className="avatar-picture-con" type="file">
                <div
                  className="avatar-picture-box"
                  onClick={onButtonSelectPictureClick}
                >
                  {mtrsCurrData.avatar_picture && (
                    <img
                      src={mtrsCurrData.avatar_picture}
                      alt="avatar"
                      width="300"
                    />
                  )}
                  {!mtrsCurrData.avatar_picture && (
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
                  <button onClick={handleSubmitPictureClick}>
                    Upload Picture
                  </button>
                </div>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    // autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    // label="First Name"
                    // defaultValue={mtrsCurrData.first_name}
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
                    id="last_name"
                    name="last_name"
                    value={editedUserData.last_name ? editedUserData.last_name : ""}
                    onChange={handleInputValueChange}
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
                    value={
                      editedUserData.birthday
                        ? formatDataYyMmDd(mtrsCurrData.birthday)
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
                      value={editedUserData.gender ? editedUserData.gender : ""}
                      label="Gender"
                      // onChange={handleGenderChange}
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
                    options={languages}
                    // value={test2 !== null ? test2 : language}
                    onChange={handleLanguageOnChange}
                    // autoSelect={true}
                    defaultValue={[languages[13], languages[12], languages[11]]}
                    // defaultValue={[obj[0], obj[1], ]}

                    id="language"
                    // defaultValue={editedUserData && editedUserData.language.map(
                    //   (lng) => {
                    //     return { title: lng };
                    //   }
                    // )}
                    // value={test2.length >0 && test2}
                    name="language"
                    // disableCloseOnSelect
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
                        // defaultValue="The Godfather"
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
                    label="Year of Experience"
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
              </Grid>
              <div
                className="btn-con"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
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
