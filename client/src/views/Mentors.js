import { Button, ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AppContext } from "../contexts/appContext.js";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MentorsCard from "../components/MentorsCard.js";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const Mentors = () => {
  const { allMentorsData, getAllMentorsData } = React.useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [gender, setGender] = useState("");

  // ------- Get allMentorsData ------- starts//
  React.useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getAllMentorsData && getAllMentorsData();
    }
    return () => (didCancel = true);
  }, []);
  // ------- Get allMentorsData ------- ends//

  // ------- Handle Accordion ------- starts//
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    console.log("isExpanded: ", isExpanded);
    setExpanded(isExpanded ? true : false);
  };

  // ------- Handle Gender Select  ------- starts//
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    // setGender(event.nativeEvent.target.text);
 

  };
  console.log("gender: ", gender);
  // console.log("allMentorsData: ", allMentorsData);
  return (
    <>
      <div>
        <Accordion expanded={expanded} onChange={handleAccordionChange(true)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FilterAltIcon />
            <Typography> Filter</Typography>
            <CloseIcon onClick={handleAccordionChange(true)} />
            <Button variant="outlined" color="primary" size="small">
              Apply
            </Button>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            {/* --- Select Gender ---- starts //  */}
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {/* --- Select Gender ---- ends //  */}
          </AccordionDetails>
        </Accordion>
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
