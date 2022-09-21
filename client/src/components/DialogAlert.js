import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../contexts/appContext";

const DialogAlert = ({ dangerFunction }) => {
  const { openDialog, setOpenDialog, handleOpenDialog, testOpen } =
    useContext(AppContext);

  const [display, setDisplay] = React.useState("block");

  // ------- Transition for Delete Confirming Alert-------
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleClose = (e) => {
    setOpenDialog(false);
  };

  console.log("openDialog: ", openDialog);

  return (
    <Dialog
      sx={{ display: { display } }}
      open={openDialog}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-delete-account"
    >
      <DialogTitle style={{ textAlign: "center" }}>
        Are you sure you want to delete your account?
      </DialogTitle>

      <DialogActions style={{ justifyContent: "space-evenly" }}>
        <Button
          onClick={handleClose}
          // href="/mentees/profile"
          // type="submit"
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
