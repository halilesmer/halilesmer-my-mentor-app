import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AppContext } from "../contexts/appContext.js";
import { ClickAwayListener } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MentorsCard from "../components/MentorsCard.js";
import Typography from "@mui/material/Typography";

const Mentors = () => {
  const { allMentorsData, getAllMentorsData } = React.useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getAllMentorsData && getAllMentorsData();
    }
    return () => (didCancel = true);
  }, []);
  
 const handleChange = (panel) => (event, isExpanded) => {
  console.log("isExpanded: ", isExpanded);
   setExpanded(isExpanded ? true : false);
 };
    // console.log("allMentorsData: ", allMentorsData);
    console.log("expanded: ", expanded);
  return (
    <>
      <div>
        <ClickAwayListener onClickAway={handleChange(true)}>
        <Accordion expanded={expanded} onChange={handleChange(true)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        </ClickAwayListener>
      </div>
      {allMentorsData &&
        allMentorsData.map((mentor) => {
          return <MentorsCard key={mentor._id} mentor={mentor} />;
        })}
    </>
  );
};

export default Mentors;

/* 

{allMentorsData && allMentorsData.map(mentor => {
      console.log("mentor: ", mentor);
        return(
            <h3>{mentor.first_name}</h3>
        )
    })}
    
    */
