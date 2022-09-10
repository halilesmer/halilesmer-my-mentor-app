import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AppContext } from "../contexts/appContext.js";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Loading from "../components/Loading.js";
import MentorsCard from "../components/MentorsCard.js";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { getToken } from "../utils/getToken.js";

const Mentors = () => {
  const { allMentorsData, getAllMentorsData, loader, setLoader } =
    React.useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [gender, setGender] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(allMentorsData);

  const [fee, setFee] = useState("");
  const [filterObj, setFilterObj] = useState(null);

  useEffect(() => {
    if (allMentorsData) setFilteredMentors(allMentorsData);
  }, [allMentorsData]);
  const token = getToken();

  // ------- Get allMentorsData ------- starts//
  // React.useEffect(() => {
  //   let didCancel = false;
  //   if (!didCancel) {
  //     getAllMentorsData && getAllMentorsData();

  //   }
  //   return () => (didCancel = true);
  // }, []);
  // ------- Get allMentorsData ------- ends//

  // ------- Handle Accordion ------- starts//
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    console.log("isExpanded: ", isExpanded);
    setExpanded(isExpanded ? true : false);
  };
  // ------- Filter Gender ------- starts //
  const fetchSetFilter = async () => {
    setLoader(true);
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // body: JSON.stringify(filterObj)
      },
    };

    try {
      const response = await fetch(
        `http://localhost:5001/api/filter/filtergender/${gender}/${fee}`,
        fetchOption
      );
      const resultFilter = await response.json();
      console.log("data of fetchSetFilter: ", resultFilter);
      setFilteredMentors(resultFilter);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("error, getting filter gender failed: ", error);
    }
  };
  // ------- Filter Gender ------- ends //

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getAllMentorsData && getAllMentorsData();
      allMentorsData && setFilteredMentors(allMentorsData);
    }
    console.log("allMentorsData: ", allMentorsData && allMentorsData);
    return () => (didCancel = true);
  }, []);

  // ------- Apply Filter  ------- starts//
  const applyFilter = async (e) => {
    await fetchSetFilter();
    setExpanded(false);
  };

  // console.log("gender: ", gender);
  console.log("allMentorsData: ", allMentorsData && allMentorsData);
  // console.log("token: ", token);
  console.log("fee: ", fee);
  console.log("filteredMentors: ", filteredMentors);

  return (
    <>
      <div
        className="accordion-con"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          position: "fixed",
          left: "0",
        }}
      >
        <Accordion expanded={expanded} onChange={handleAccordionChange(true)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ minHeight: "10px", background: "#c4c6c7" }}
          >
            <FilterAltIcon style={{ width: "30px" }}></FilterAltIcon>

            <Typography sx={{ width: "50px" }}> Filter</Typography>
            {filteredMentors && (
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "calc(100% - (80px + 1em))",
                }}
              >
                {" "}
                ({filteredMentors.length}) Results
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {/* --- Select Gender ---- starts //  */}
            <div
              className="filter-inputs-con"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "0.5rem",
              }}
            >
              <FormControl sx={{ minWidth: "6rem" }} size="small">
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={gender}
                  label="Gender"
                  // onChange={handleGenderChange}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={false}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {/* --- Select Gender ---- ends //  */}
              {/* --- Select Fee ---- starts //  */}
              <FormControl sx={{ minWidth: "4rem" }} size="small">
                <InputLabel id="fee">Fee</InputLabel>
                <Select
                  labelId="fee"
                  id="fee"
                  name="fee"
                  value={fee}
                  label="Fee"
                  // onChange={handleGenderChange}
                  onChange={(e) => setFee(e.target.value)}
                >
                  <MenuItem value={false}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                  <MenuItem value={"Fee"}>Fee</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* --- Select Fee ---- ends //  */}
          </AccordionDetails>
          <hr style={{ width: "90%", marginTop: 0 }}></hr>
          <div
            className="accordion-btn-con"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "0.2rem",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={applyFilter}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setExpanded(false)}
            >
              Close
            </Button>
          </div>
        </Accordion>
      </div>
      {loader ? (
        <Loading height="70vh" />
      ) : (
        <div className="mentors-card-con" style={{marginTop:'4rem'}}>
          {filteredMentors &&
            filteredMentors.map((mentor) => {
              return <MentorsCard key={mentor._id} mentor={mentor} />;
            })}
        </div>
      )}
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
