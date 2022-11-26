import React, { useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext.js";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Loading from "../components/Loading.js";
import MentorsCard from "../components/MentorsCard.js";
import Typography from "@mui/material/Typography";
import { getToken } from "../utils/getToken.js";
import { nodeEnv } from "../utils/nodeEnv";

const FavoriteMentorsPage = () => {
  const { loader, setLoader, getMentorsProfile, mentorsProfile } =
    React.useContext(AppContext);
  const [filteredMentors, setFilteredMentors] = useState();
  const env = nodeEnv.env;

  const likes = [];

  const getLikedMentors = async () => {
    // setLoader(true);
    const token = getToken();

    if (token) {
      mentorsProfile &&
        Object.entries(mentorsProfile).forEach(([key, value]) => {
          key === "likes" && likes.push(value);
        });
      const obj = likes.length > 0 && Object.assign({}, likes);
      try {
        const body = {
          mentorId: [
            "63038402f4076284079263d5",
            "630d1323e136e55c4e5c4c83",
            "63196e2094446d8b9b22f7cc",
          ],
        };
        const requestOptions = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        };
        const response = await fetch(
          `${env}/mentors/likedmentors`,
          requestOptions
        );
        const result = await response.json();
        setFilteredMentors(result);

        console.log("result", result);
        // setText(commentsData);
      } catch (error) {
        console.log("error: ", error);
      }
    
    }
  };
  // ------- Filter Gender ------- ends //

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getLikedMentors();
      getMentorsProfile();
    }
    return () => (didCancel = true);
    // eslint-disable-next-line
  }, []);

  // console.log("gender: ", gender);
  // console.log("allMentorsData: ", allMentorsData && allMentorsData);
  // console.log("token: ", token);
  console.log("mentorsProfile: ", mentorsProfile);
  console.log("filteredMentors: ", filteredMentors);
  // console.log("obj: ", obj);

  return (
    <>
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

export default FavoriteMentorsPage;
