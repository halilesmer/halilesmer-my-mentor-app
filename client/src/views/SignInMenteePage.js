import * as React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppContext } from "../contexts/appContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { nodeEnv } from "../utils/nodeEnv";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function SignInMenteePage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("");
  const env = nodeEnv.env;
  const [isFieldFilled, setIsFieldFilled] = React.useState(true);
  const [isPasswordTrue, setIsPasswordTrue] = React.useState(true);

  const { setIsUserLoggedIn, userLogIn, setUserLogIn, setUserType } =
    React.useContext(AppContext);

  // console.log("password2: ", password2);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordTrue(true);
    setIsFieldFilled(true);

    const data = new FormData(e.currentTarget);
    const password = data.get("password1").trim();
    const email = data.get("email").trim();

    if (!password || !email) {
      console.log("password: ", password);
      return setIsFieldFilled(false);
    } else {
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };
    try {
      const response = await fetch(`${env}/mentees/signin`, requestOptions);
      const result = await response.json();
      console.log("result, sign in mentee: ", result);
      // ---- dialog alert if no user ---- starts //
      if (result.msg === "User not found.") {
        setOpenDialog(true);
        setDialogText("User not found. Please try again.");
      } else if (result.msg === "Password is incorrect!") {
        setIsPasswordTrue(false);
      }
      // ---- dialog alert if no user ---- ends //

      const { token, user } = result;
      if (token) {
        localStorage.setItem("token", token);
        // setIsUserLoggedIn(true);
        setUserLogIn(user);
        setIsUserLoggedIn(true);
        setUserType("mentee");
        navigate("/mentees/profile");
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
        <Container
          className="sign-in-mentee-page-con"
          component="main"
          maxWidth="xs"
        >
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
              Mentee
            </Typography>
            <Box
              component="form"
              className="sign-in-mentee-form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                size="small"
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
                size="small"
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
              />

              {!isFieldFilled && (
                <Typography mt={2} color="red" textAlign="center">
                  Please fill out all required fields.
                </Typography>
              )}

              {!isPasswordTrue && (
                <Typography mt={2} color="red" textAlign="center">
                  Password is incorrect! <br /> Please try again.
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/mentees/signup" variant="body2">
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
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
