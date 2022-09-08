import { Link } from "react-router-dom";
import LoginRegisterBtn from "../components/LoginRegisterBtn";
import React from "react";

const SignInPage = () => {
  return (
    <div className="register-page" style={{ textAlign: "center" }}>
      <h2>Sign In</h2>

      <div
        className="_register-page__mentor-con"
        style={{ margin: "1rem auto 3rem auto" }}
      >
        <p>
          Sing in as <strong>mentee,</strong> please{" "}
          <Link to="/mentees/signin">
            {" "}
            <i>
              <strong>click here!</strong>
            </i>
          </Link>
        </p>
        {/* 
          <LoginRegisterBtn text="Sign In" />
        </Link> */}

        <LoginRegisterBtn href="/mentees/signin/" text="Sign In" />
      </div>
      <div className="_register-page__mentee-con">
        <p>
          Sing in as <strong>mentor,</strong> please
          <Link to="/mentors/signin">
            {" "}
            <i>
              <strong>click here!</strong>
            </i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
