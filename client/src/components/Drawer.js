import * as React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { AppContext } from "../contexts/appContext";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function Drawer({ drawerKey, setDrawerKey }) {
  const { handleLogoutClick } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const navigateTo = useNavigate();
    const token = localStorage.getItem("token");
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //  setState({ ...state, [anchor]: open });
    setDrawerKey(open);
  };
  // const logout = (e) => {
  //   setLoading(true);
  //   // signOut(auth)
  //   //   .then(() => {
  //   //     // Sign-out successful.
  //   //     navigateTo("/");
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     // An error happened.
  //   //     console.log("sign out error: ", error);
  //   //   });
  // };

  let activeStyle = {
    textDecoration: "underline",
  };
  let noActive = {
    textDecoration: "none",
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* ----------------- Mentors  Page Link  --------------------- */}

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FlutterDashIcon />
            </ListItemIcon>

            <NavLink
              to="mentors/"
              style={({ isActive }) => (isActive ? activeStyle : noActive)}
            >
              <ListItemText primary="Mentors" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
    {token &&  <List onClick={handleLogoutClick}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>}
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <SwipeableDrawer
            anchor={"top"}
            open={drawerKey}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list("top")}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}
