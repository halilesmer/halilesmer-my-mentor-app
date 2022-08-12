import "./SignUpMentorPage.css";

import * as React from "react";

import { IconButton, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const theme = createTheme();

export default function SignUpMentorPage() {
  const [checkReact, setCheckReact] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // const CouchingMediumBtn = styled(Button)(({ theme }) => ({
  //   color: theme.palette.getContrastText(purple[500]),
  //   backgroundColor: "#4a424ccf",
  //   margin: "5px",
  //   "&:hover": {
  //     backgroundColor: "#1f5da2",
  //   },
  //   "&:active": {
  //     boxShadow: "none",
  //     // backgroundColor: "#0062cc",
  //     backgroundColor: "#0062cc",
  //     borderColor: "#005cbf",
  //     // color:'green',
  //   },
  //   "&:focus": {
  //     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  //     backgroundColor: "#0062cc",
  //   },
  // }));

  // const styles = {
  //   checkBtn: {
  //     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  //     backgroundColor: "red",
  //     color: "orange",
  //   },

  // };

  let skills = ["React", "Java Script", "Java", "Material UI", "Bootstrap"];
  const hadleSkillsClick = (button) => {
    if (checkReact.includes(button)) {
      setCheckReact(checkReact.filter((item) => item !== button));
    } else {
      setCheckReact([...checkReact, button]);
    }
  };
  console.log("checkReact: ", checkReact);
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="couching-medium"
                label="Couching Medium *"
                name="couching-medium"
              />
            </Grid>

            <Grid item xs={12}>
              <div>Select Your Skills:</div>
              <div style={{ border: "solid 1px #d1d1d1", borderRadius: "4px" }}>
                {skills.map((button, id) => {
                  return (
                    <Button
                      size="small"
                      id={id}
                      className={
                        checkReact.includes(button)
                          ? "checkBtnClicked"
                          : "checkBtn"
                      }
                      // styles={styles.checkBtn}
                      variant="contained"
                      onClick={() => hadleSkillsClick(button)}
                    >
                      {button}
                    </Button>
                  );
                })}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
