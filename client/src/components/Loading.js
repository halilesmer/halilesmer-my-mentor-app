import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import React from "react";
import { Vortex } from "react-loader-spinner";

const Loading = ({ height, width, textAlign, lineHeight }) => {
  return (
    <Box
      className="circularProgress"
      style={{
        display: "flex", justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
        textAlign: textAlign,
        lineHeight: lineHeight,
      }}
    >
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
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
