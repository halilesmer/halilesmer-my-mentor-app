import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ height, width, textAlign, lineHeight }) => {
  return (
    <Box
      className="circularProgress"
      style={{
        height: height,
        width: width,
        textAlign: textAlign,
        lineHeight: lineHeight,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loading;
/* 
        height: "80%",
        width: "100%",
        textAlign: "center",
        lineHeight: "20",
 */
