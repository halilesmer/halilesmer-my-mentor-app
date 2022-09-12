import { Alert, Button, IconButton, Snackbar, } from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../contexts/appContext";

const SnackbarStyle = {
  width: "fitContent",
  height: "5rem",
  maxWidth: "70%",
  bottom: "45vh",
  margin: "auto",
  left: "0",
  right: "0",
  top: "0",
  border: "dotted red 2px",
  borderRadius: "5px",
  background: "rgb(255, 244, 229)",
};


const SnackbarMui = ({text}) => {
  const { openSnackBar, setOpenSnackBar } = useContext(AppContext);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  // const action = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleSnackBarClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleSnackBarClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );
  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={2000}
      onClose={() => handleSnackBarClose()}
      message="Note archived"
      // action={ action}
      style={SnackbarStyle}
    >
      <Alert
        onClose={handleSnackBarClose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMui;
