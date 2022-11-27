import React, { useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext.js";
import Loading from "../components/Loading.js";
import MentorsCard from "../components/MentorsCard.js";
import { Typography } from "@mui/material";
import { getToken } from "../utils/getToken.js";
import { nodeEnv } from "../utils/nodeEnv";

const FavoriteMentorsPage = () => {
  const { getMentorsProfile, mentorsProfile, likes, menteesData } =
    React.useContext(AppContext);
  const [filteredMentors, setFilteredMentors] = useState();
  const env = nodeEnv.env;
  const [loader, setLoader] = useState(true);

  const getLikedMentors = async () => {
    console.log(
      "mentorsProfile.likes: ",
      mentorsProfile && mentorsProfile.likes
    );

    const token = getToken();
    if (token) {
      try {
        const body = {
          mentorId: mentorsProfile.likes,
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
        setLoader(false);
      } catch (error) {
        console.log("error: ", error);
      } finally {
      }
    }
  };

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getMentorsProfile();
    }
    return () => (didCancel = true);
    // eslint-disable-next-line
  }, [menteesData]);

  useEffect(() => {
    mentorsProfile && getLikedMentors();
    // eslint-disable-next-line
  }, [mentorsProfile]);

  return (
    <>
      {loader ? (
        <Loading height="70vh" />
      ) : (
        <div
          className="favorite-mentors-card-con"
          style={{ marginTop: "1rem" }}
        >
          <Typography variant="h5" component="h5" textAlign="center" mb={1}>
            My Favorites
          </Typography>
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
          No Favorite Mentors Yet!
        </div>
      )}
    </>
  );
};

export default FavoriteMentorsPage;
