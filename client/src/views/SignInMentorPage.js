import * as React from "react";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material/";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppContext } from "../contexts/appContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();
export default function SignInMentorPage() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const navigate = useNavigate();

  const { setIsUserLoggedIn, userLogIn, setUserLogIn, userType, setUserType } =
    React.useContext(AppContext);

  // const [password2, setPassword2] = React.useState("");
  // console.log("password2: ", password2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pw1 = data.get("password1").trim();
    // const pw2 = data.get("password2").trim();
    const email = data.get("email").trim();

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", pw1);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "https://server-halilesmer.vercel.app/api/mentors/signin/",
        requestOptions
      );
      const result = await response.json();
      // ---- dialog alert if no user ---- starts //
      if (result.msg === "User not found.") {
        setOpenDialog(true);
      }
      // ---- dialog alert if no user ---- ends //
      
      const { token, user } = result;
      if (token) {
        localStorage.setItem("token", token);
        // setIsUserLoggedIn(true);
        setUserLogIn(user);
        setIsUserLoggedIn(true);
        setUserType("mentor");
        navigate("/mentors/profile");
        console.log("login succesfull: ", result);
      }
    } catch (error) {
      console.log("error during signIn: ", error);
    }
  };

   const handleClose = () => {
     setOpenDialog(false);
   };

  console.log("userLogIn: ", userLogIn);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography component="h1" variant="h5">
              Mentor
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                // value={userLogIn.password2 ? userLogIn.password2 : ""}
                // onChange={handleValueChange}
              />
              {/* <FormControlLabel
              // control={<Checkbox value="remember" color="primary" />}
              // label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  <Link href="/mentors/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are not logged in. Please login and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
