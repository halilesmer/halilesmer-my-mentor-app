import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginRegisterBtn from "../components/LoginRegisterBtn";
import React from "react";

const SignInPage = () => {
  return (
    <div className="register-page" style={{ textAlign: "center" }}>
      <div
        className="_register-page__mentor-con"
        style={{ margin: "1rem auto 3rem auto" }}
      >
        <p>
          Sing in as <strong>mentor,</strong> please click here!
        </p>
        <Link to="/mentors/signin">
          <LoginRegisterBtn text="Register" />
        </Link>
      </div>
      <div className="_register-page__mentee-con">
        <p>
          Sing in as <strong>mentee,</strong> please click here!
        </p>
        <Link to="/mentees/signin/">
          <LoginRegisterBtn text="Register" />
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;