import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppContext } from "../contexts/appContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
export default function LoginPage() {
  const navigate = useNavigate();
  // const [password2, setPassword2] = React.useState('')
  
  const { isUserLoggedIn, setIsUserLoggedIn, userLogIn, setUserLogIn } =
    React.useContext(AppContext);
  
  // const [password2, setPassword2] = React.useState("");
  // console.log("password2: ", password2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pw1 = data.get("password1").trim();
    const pw2 = data.get("password2").trim();
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
      const response = await fetch(
        "http://localhost:5001/api/mentors/signin/",
        requestOptions
      );
      const result = await response.json();
      const { token, user } = result;
      if (token) {
        localStorage.setItem("token", token);
        setIsUserLoggedIn(true);
        setUserLogIn(user);
        navigate('')
        console.log("login succesfull: ", result);
      }
    } catch (error) {
      console.log("error during signIn: ", error);
    }
  };

  console.log("userLogIn: ", userLogIn);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
