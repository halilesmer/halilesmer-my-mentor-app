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

const Mentors = () => {
  const { allMentorsData, getAllMentorsData, loader, setLoader } =
    React.useContext(AppContext);
  const [expanded, setExpanded] = React.useState(false);
  const [filteredMentors, setFilteredMentors] = useState(allMentorsData);

  const [inputValue, setInputValue] = useState({
    gender: "",
    fee: "",
  });

  useEffect(() => {
    if (allMentorsData) setFilteredMentors(allMentorsData);
  }, [allMentorsData]);

  // ------- Handle Accordion ------- starts//
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? true : false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  // ------- Filter  ------- starts //
  const fetchSetFilter = async () => {
    setLoader(true);
    // adjust filter obj befor sending ---- starts//
    let filterObj = {};
    for (const key in inputValue) {
      if (inputValue[key] !== "All" && inputValue[key] !== "") {
        filterObj[key] = inputValue[key];
      }
    }
    console.log("filterObj", filterObj);
    // adjust filter obj befor sending ---- starts//

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(filterObj),
      // body: JSON.stringify(inputValue),
      // redirect: "follow",
    };

    try {
      // `https://server-halilesmer.vercel.app/api/filter/filtergender/${gender}/${fee}`,
      const response = await fetch(
        `https://server-halilesmer.vercel.app/api/filter/filter-mentors`,
        requestOptions
      );
      const resultFilter = await response.json();
      console.log("data of fetchSetFilter: ", resultFilter);
      setFilteredMentors(resultFilter);
    } catch (error) {
      console.log("error, getting filter gender failed: ", error);
    } finally {
      setLoader(false);
    }
  };
  // ------- Filter Gender ------- ends //

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getAllMentorsData && getAllMentorsData();
      allMentorsData && setFilteredMentors(allMentorsData);
    }
    return () => (didCancel = true);
    // eslint-disable-next-line
  }, []);

  // ------- Apply Filter  ------- starts//
  const applyFilter = async (e) => {
    await fetchSetFilter();
    setExpanded(false);
  };

  // console.log("gender: ", gender);
  // console.log("allMentorsData: ", allMentorsData && allMentorsData);
  // console.log("token: ", token);
  console.log("inputValue: ", inputValue.length >0);

  // console.log("filteredMentors: ", filteredMentors);

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
        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange(true)}
          sx={{ minHeight: "10px", width: "95%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ minHeight: "10px", height: "25px", background: "#c4c6c7" }}
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
                  // defaultValue=""
                  value={inputValue.gender ? inputValue.gender : "All"}
                  label="Gender"
                  onChange={handleInputChange}
                >
                  <MenuItem value="All">
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
                  value={inputValue.fee ? inputValue.fee : "All"}
                  // defaultValue={inputValue.fee}
                  label="Fee"
                  // onChange={handleGenderChange}
                  // onChange={(e) => setFee(e.target.value)}
                  onChange={handleInputChange}
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="0">Volunteer</MenuItem>{" "}
                 
                  <MenuItem value={Number.parseInt("1", 10)}>Fee</MenuItem>{" "}
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
        <div className="mentors-card-con" style={{ marginTop: "4rem" }}>
          {filteredMentors &&
            filteredMentors.map((mentor) => {
              return <MentorsCard key={mentor._id} mentor={mentor} />;
            })}
        </div>
      )}
      {filteredMentors && filteredMentors.length < 1 && (
        <div
          style={{
            border: "9px dashed rgb(79 154 203)",
            borderRadius: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            marginTop: "35vh",
          }}
        >
          No result found
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
