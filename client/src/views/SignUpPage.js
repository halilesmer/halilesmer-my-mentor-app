import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginRegisterBtn from "../components/LoginRegisterBtn";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="register-page" style={{ textAlign: "center" }}>
    <h2>Sign Up</h2>
      <div
        className="_register-page__mentor-con"
        style={{ margin: "1rem auto 3rem auto" }}
      >
        <p>
          If you want to be a <strong>mentee,</strong> please
          <Link to="/mentees/signup/">
            <i>
              <strong> click here!</strong>
            </i>
          </Link>
        </p>

        <LoginRegisterBtn href="/mentees/signup" text="Sign Up" />
      </div>
      <div className="_register-page__mentee-con">
        <p>
          If you want to be a <strong>mentor,</strong> please{" "}
          <Link to="/mentors/signup/">
            <i>
              <strong>click here!</strong>
            </i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
