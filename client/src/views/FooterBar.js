import React from "react";
import { shouldSkipGeneratingVar } from "@mui/material";

const styleFooter = {
  position: 'fixed',
  bottom: 0,
  width: "100%",
  borderTop: 'solid #9eff00 1px',
  background: '#1976d2',
  textAlign:'center',
  boxShadow: '0px 2px 10px 4px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
};
const FooterBar = () => {
  return <footer style={styleFooter} className="footer-bar"></footer>;
};

export default FooterBar;
