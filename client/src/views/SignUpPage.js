import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginRegisterBtn from "../components/LoginRegisterBtn";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="register-page" style={{ textAlign: "center" }}>
      <div
        className="_register-page__mentor-con"
        style={{ margin: "1rem auto 3rem auto" }}
      >
        <p>
          If you want to be a <strong>mentor,</strong> please click here!
        </p>
        <Link to="/mentors/signup">
          <LoginRegisterBtn text="Sign Up" />
        </Link>
      </div>
      <div className="_register-page__mentee-con">
        <p>
          If you want to be a <strong>mentee,</strong> please click here!
        </p>
        <Link to="/mentees/signup/">
          <LoginRegisterBtn text="Sign Up" />
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
