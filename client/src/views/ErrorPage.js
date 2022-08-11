import { Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

// import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorMsg }) => {
  // const navigate = useNavigate();

  return (
    <div className="error-con" style={{ margin: "5rem auto", width: "100%" }}>
      <Typography align="center">{errorMsg}</Typography>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
