import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import React from "react";

const LoginRegisterBtn = ({ classes, text, onClick, color = "green" }) => {
  return (
    <Button
      className={classes}
      variant="bold"
      size="medium"
      startIcon={
        <Icon>
          <PersonAddAlt1Icon sx={{ width: "20px" }} />
        </Icon>
      }
      sx={{ fontWeight: "bold", border: `4px solid black`, color: { color } }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default LoginRegisterBtn;
