import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../contexts/appContext";

const DialogAlert = ({ dangerFunction }) => {
  const { openDialog, setOpenDialog, dialogTxt1 } = useContext(AppContext);

  const handleClose = (e) => {
    setOpenDialog(false);
  };

  // console.log("openDialog: ", openDialog);

  return (
    <Dialog
      open={openDialog}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-delete-account"
    >
      <DialogTitle style={{ textAlign: "center" }}>{dialogTxt1}</DialogTitle>

      <DialogActions style={{ justifyContent: "space-evenly" }}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="inherit"
          sx={{ mt: 3, mb: 2, width: "30px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={dangerFunction}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="error"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
