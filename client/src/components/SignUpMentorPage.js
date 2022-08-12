import "./SignUpMentorPage.css";

import * as React from "react";

import { IconButton, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppContext } from "../contexts/appContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Checkbox as CheckboxBtn } from "react-btn-checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export default function SignUpMentorPage() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedCouchingMedium, setSelectedCouchingMedium] = React.useState(
    []
  );
  const [typedSkill, setTypedSkill] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(Boolean);
  const [isPwValid, setIsPwValid] = React.useState(Boolean);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [birthday, setBirthday] = React.useState(Number);
  const [gender, setGender] = React.useState([]);
  const [language, setLanguage] = React.useState([]);
  const [experience, setExperience] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [fee, setFee] = React.useState("");
  const [couchingMd, setCouchingMd] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [termsAgr, setTermsAgr] = React.useState(false);

  const { handlePwInputFocus, onBlur } = React.useContext(AppContext);

  // ---- Handle Skills  -------
  let availableSkills = [
    "React.js",
    "Java",
    "Material UI",
    "Bootstrap",
    "Python",
    "JavaScript",
    "C#",
    "PHP",
    "C/C++",
    "R",
    "TypeScript",
    "Swift",
    "Objective-C",
    "jQuary",
    "Express",
    "Angular",
    "Vue.js",
    "ASP.NET Core",
    "Flask",
    "ASP.NET",
    "Django",
  ].sort();

  const handleSkillsClick = (button) => {
    if (selectedSkills.includes(button)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== button));
      setTypedSkill("");
    } else {
      setSelectedSkills([...selectedSkills, button]);
      setTypedSkill("");
    }
  };
  const handleSkillsEnter = (e) => {
    console.log("e: ", e);
    e.preventDefault();
    if (e.key === "Enter" && typedSkill) {
      handleSkillsClick(typedSkill);
    }
  };

  // ---- Handle Couching Medium -------
  let couchingMedium = ["Presence", "Video", "Audio"];
  const handleCouchingMediumClick = (button) => {
    if (selectedCouchingMedium.includes(button)) {
      setSelectedCouchingMedium(
        selectedCouchingMedium.filter((item) => item !== button)
      );
    } else {
      setSelectedCouchingMedium([...selectedCouchingMedium, button]);
    }
  };

  // ---- Send Form Handle ------
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password-1"),
    //   password2: data.get("password-2"),
    // });
    const email = data.get("email").trim();
    const pw1 = data.get("password-1").trim();
    const pw2 = data.get("password-2").trim();
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
      setPassword(pw1);
    }
    /* ---- Password Check ---- ends*/

    console.log("pw1: ", pw1);
  };

  console.log("selectedSkills: ", selectedSkills);
  console.log("typedSkill: ", typedSkill);
  console.log("selectedCouchingMedium: ", selectedCouchingMedium);
  console.log("isEmailValid: ", isEmailValid);
  console.log("isPwValid: ", isPwValid);

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
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
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
                required
                fullWidth
                id="birthday"
                label="Birthday"
                name="birthday"
                autoComplete="birthday"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="gender"
                label="Gender"
                name="gender"
                autoComplete="gender"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="language"
                label="Language"
                name="language"
                autoComplete="language"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
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
                // fullWidth
                type="number"
                id="fee"
                label="Fee"
                name="fee"
                autoComplete="off"
              />
              <span style={{ padding: "0 0.5rem " }}>,00 EUR</span>
              <span style={{ padding: "0 1rem " }}>or</span>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Volunteer"
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
                  {couchingMedium.map((button, i) => {
                    return (
                      <Button
                        key={i}
                        size="small"
                        id={i}
                        className={
                          selectedCouchingMedium.includes(button)
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
                        key={i}
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
                <div className="type-skills-input-con">
                  <TextField
                    style={{ margin: "0 0 5px 10px" }}
                    size="small"
                    // fullWidth
                    id="skills"
                    label="Type your Skills"
                    name="skills"
                    value={typedSkill}
                    onKeyUp={handleSkillsEnter}
                    onChange={(e) => setTypedSkill(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleSkillsClick(typedSkill)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                // color="error"
                error={!isEmailValid}
                size="small"
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
              <Link href="login-page" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
