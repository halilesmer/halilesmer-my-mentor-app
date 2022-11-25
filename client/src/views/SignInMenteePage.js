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
import {nodeEnv} from "../configs/configs";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function SignInMenteePage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("");
  const env = nodeEnv.env;

  const { setIsUserLoggedIn, userLogIn, setUserLogIn, setUserType } =
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
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(userLogIn),
    };
    try {
      const response = await fetch(`${env}/mentees/signin`, requestOptions);
      const result = await response.json();
      console.log("result, sign in mentee: ", result);
      // ---- dialog alert if no user ---- starts //
      if (result.msg === "User not found.") {
        setOpenDialog(true);
        setDialogText("User not found. Please try again.");
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
              Mentee
            </Typography>
            <Box
              component="form"
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
              <TextField
                size="small"
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
